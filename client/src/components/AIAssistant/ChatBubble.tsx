import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Check, Copy, WifiOff, Zap } from "lucide-react";
import type { ChatMessage } from "../../types";
import { useTypewriter } from "../../hooks/useTypewriter";

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
    const [copied, setCopied] = useState(false);
    const isBot = message.sender === "bot";

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

    const handleCopy = () => {
        const container = document.createElement("div");
        container.innerHTML = renderMarkdown(message.text);
        navigator.clipboard
            .writeText((container.innerText || container.textContent || "").trim())
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => undefined);
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
            <div className="glass rounded-2xl rounded-bl-md px-4 py-3 pr-9 text-[13.5px] leading-[1.6] text-text-primary">
                <div className="bot-markdown" dangerouslySetInnerHTML={{ __html: html }} />
                {isTyping && <span className="type-caret" aria-hidden="true" />}

                {!isTyping && (
                    <button
                        type="button"
                        onClick={handleCopy}
                        title="Copy answer"
                        aria-label="Copy answer"
                        className={`absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-lg opacity-0 transition-all duration-300 focus-visible:opacity-100 group-hover:opacity-100 ${
                            copied ? "text-accent" : "text-text-tertiary hover:bg-glass-faint hover:text-text-primary"
                        }`}
                    >
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </button>
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
