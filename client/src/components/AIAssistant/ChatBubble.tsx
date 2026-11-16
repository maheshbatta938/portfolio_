import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Check, Copy, ThumbsUp, Volume2, VolumeX, WifiOff, Zap } from "lucide-react";
import type { ChatMessage } from "../../types";
import { useTypewriter } from "../../hooks/useTypewriter";
import { useToast } from "../../context/ToastContext";

function renderMarkdown(text: string): string {
    const rawHtml = marked.parse(text, { async: false, breaks: true }) as string;
    return DOMPurify.sanitize(rawHtml, { ADD_ATTR: ["target", "rel"] });
}

interface ChatBubbleProps {
    message: ChatMessage;
    /** Reveal this reply progressively — set only for one that just arrived. */
    typeOut?: boolean;
}

export default function ChatBubble({ message, typeOut = false }: ChatBubbleProps) {
    const { showToast } = useToast();
    const [copied, setCopied] = useState(false);
    const [liked, setLiked] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const isBot = message.sender === "bot";

    // Stop speech if unmounting
    useEffect(() => {
        return () => {
            if (typeof window !== "undefined" && "speechSynthesis" in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const { visible, isTyping } = useTypewriter(message.text, isBot && typeOut);
    // Re-parsed at each reveal step; word-boundary slicing keeps it valid.
    const html = useMemo(() => (isBot ? renderMarkdown(visible) : ""), [isBot, visible]);

    if (!isBot) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="bubble-user max-w-[85%] self-end whitespace-pre-wrap break-words rounded-2xl rounded-br-md px-3.5 py-2.5 text-[13.5px] font-medium leading-[1.55]"
            >
                {message.text}
            </motion.div>
        );
    }

    const cleanPlainText = (text: string) => {
        const container = document.createElement("div");
        container.innerHTML = renderMarkdown(text);
        return (container.innerText || container.textContent || "").trim();
    };

    const handleCopy = () => {
        const plain = cleanPlainText(message.text);
        navigator.clipboard
            .writeText(plain)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => undefined);
    };

    const handleSpeak = () => {
        if (!("speechSynthesis" in window)) {
            showToast("Speech synthesis not supported in this browser.");
            return;
        }

        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        window.speechSynthesis.cancel();
        const plain = cleanPlainText(message.text);
        const utterance = new SpeechSynthesisUtterance(plain);
        utterance.rate = 1.05;
        utterance.pitch = 1.0;

        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
    };

    const handleLike = () => {
        if (!liked) {
            setLiked(true);
            showToast("Thanks for the feedback!");
        } else {
            setLiked(false);
        }
    };

    // A canned or failed answer must never pass for a real one.
    const notice =
        message.origin === "error"
            ? { icon: WifiOff, label: "Connection issue" }
            : message.origin === "fallback"
              ? { icon: Zap, label: "Offline answer" }
              : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="group relative max-w-[92%] self-start"
        >
            <div className="glass rounded-2xl rounded-bl-md px-4 py-3 pr-12 text-[13.5px] leading-[1.6] text-text-primary">
                <div className="bot-markdown" dangerouslySetInnerHTML={{ __html: html }} />
                {isTyping && <span className="type-caret" aria-hidden="true" />}

                {!isTyping && (
                    <div className="absolute right-2 top-2 flex items-center gap-0.5 opacity-0 transition-all duration-300 focus-within:opacity-100 group-hover:opacity-100">
                        <button
                            type="button"
                            onClick={handleSpeak}
                            title={isSpeaking ? "Stop listening" : "Listen to answer"}
                            aria-label={isSpeaking ? "Stop listening" : "Listen to answer"}
                            className={`flex h-6 w-6 items-center justify-center rounded-lg transition-colors ${
                                isSpeaking
                                    ? "text-accent bg-accent-soft animate-pulse"
                                    : "text-text-tertiary hover:bg-glass-faint hover:text-text-primary"
                            }`}
                        >
                            {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                        </button>

                        <button
                            type="button"
                            onClick={handleLike}
                            title="Helpful answer"
                            aria-label="Helpful answer"
                            className={`flex h-6 w-6 items-center justify-center rounded-lg transition-colors ${
                                liked
                                    ? "text-accent"
                                    : "text-text-tertiary hover:bg-glass-faint hover:text-text-primary"
                            }`}
                        >
                            <ThumbsUp className={`h-3 w-3 ${liked ? "fill-current" : ""}`} />
                        </button>

                        <button
                            type="button"
                            onClick={handleCopy}
                            title="Copy answer"
                            aria-label="Copy answer"
                            className={`flex h-6 w-6 items-center justify-center rounded-lg transition-all duration-300 ${
                                copied
                                    ? "text-accent"
                                    : "text-text-tertiary hover:bg-glass-faint hover:text-text-primary"
                            }`}
                        >
                            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </button>
                    </div>
                )}
            </div>

            {notice && !isTyping && (
                <p className="mt-1.5 flex items-center gap-1.5 pl-1 text-[10.5px] font-medium text-text-tertiary">
                    <notice.icon className="h-3 w-3" />
                    {notice.label}
                </p>
            )}
        </motion.div>
    );
}
