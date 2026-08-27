import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Braces, Code2, FolderGit2, GraduationCap, Send, Sparkles, Trash2, X } from "lucide-react";
import { useAIAssistant } from "../../context/AIAssistantContext";
import { useChatHistory } from "../../hooks/useChatHistory";
import { askPortfolioAI } from "../../services/chatService";
import type { ChatMessage } from "../../types";
import ChatBubble from "./ChatBubble";
import { handleIntentAction } from "./intentAction";

const STARTERS = [
    { label: "Current role", hint: "What he ships today", icon: Braces, question: "What is he working on right now?" },
    {
        label: "Best work",
        hint: "The project to look at",
        icon: FolderGit2,
        question: "What is the most impressive thing he has built?"
    },
    {
        label: "Backend depth",
        hint: "APIs, data, scale",
        icon: Code2,
        question: "How strong is he on backend and databases?"
    },
    { label: "Education", hint: "Degree and grades", icon: GraduationCap, question: "What did he study, and where?" }
];

export default function AIAssistant() {
    const { isOpen, close } = useAIAssistant();
    const { messages, addMessage, clearMessages } = useChatHistory();
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [showScrollDown, setShowScrollDown] = useState(false);
    // Only the reply that just landed types itself out; restored history does not.
    const [typingId, setTypingId] = useState<string | null>(null);

    const messagesRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const messageIdCounter = useRef(0);
    const nextMessageId = (prefix: string) => `${prefix}-${(messageIdCounter.current += 1)}`;

    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: globalThis.KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, close]);

    useEffect(() => {
        const container = messagesRef.current;
        if (!container) return;
        container.scrollTop = container.scrollHeight;
    }, [messages, isThinking, isOpen]);

    useEffect(() => {
        const container = messagesRef.current;
        if (!container) return;
        const handleScroll = () => {
            setShowScrollDown(container.scrollHeight - container.clientHeight - container.scrollTop > 140);
        };
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [isOpen]);

    const scrollToBottom = () => {
        messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
    };

    const sendMessage = async (rawText: string) => {
        const text = rawText.trim();
        if (!text || isThinking) return;

        const userMessage: ChatMessage = { id: nextMessageId("user"), sender: "user", text };
        const historyForRequest = messages;
        addMessage(userMessage);
        setInput("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";
        setIsThinking(true);

        const result = await askPortfolioAI(text, historyForRequest);

        const botId = nextMessageId("bot");
        addMessage({
            id: botId,
            sender: "bot",
            text: result.reply,
            origin: result.isError ? "error" : result.isFallback ? "fallback" : "model"
        });
        setTypingId(botId);
        setIsThinking(false);
        handleIntentAction(result.intent);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void sendMessage(input);
        }
    };

    const handleClear = () => {
        if (window.confirm("Clear this conversation?")) {
            clearMessages();
            setTypingId(null);
        }
    };

    const canSend = Boolean(input.trim()) && !isThinking;

    // Rendered straight into <body>. A "fixed" element is only viewport-fixed
    // while no ancestor establishes a containing block — any transform, filter
    // or backdrop-filter up the tree silently re-anchors it to that ancestor,
    // which is what made the panel land at the foot of the document and push
    // the page taller. Portalling puts it beyond the reach of that entirely.
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* No scrim, at any width: this is a widget popover, not a
                        modal, and the page behind it must stay visible and
                        usable. It takes over the exact corner the launcher
                        button vacates (the launcher unmounts while open), so
                        the two visually read as one control changing state —
                        the pattern every chat widget (Intercom, Drift, Crisp)
                        uses. The sharp bottom-right corner is deliberate: it
                        is the one visual thread tying the panel back to the
                        button it grew out of.
                        Position is set via inline style, not a Tailwind
                        utility class, so it cannot be affected by anything
                        else in the stylesheet — this exact "why is it at the
                        bottom of the page" bug has come up more than once,
                        and inline styles are the one thing with nowhere left
                        to hide a competing rule. */}
                    <motion.aside
                        key="assistant-panel"
                        role="dialog"
                        aria-modal="false"
                        aria-label="Mahesh AI"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 360, damping: 30, mass: 0.7 }}
                        style={{
                            position: "fixed",
                            transformOrigin: "bottom right"
                        }}
                        className="glass glass-strong inset-x-4 bottom-[88px] z-panel flex h-[min(74vh,600px)] flex-col overflow-hidden rounded-[24px] rounded-br-[6px] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:left-auto sm:h-[min(620px,calc(100vh-104px))] sm:w-[400px]"
                    >
                        {/* ---------------- Header ---------------- */}
                        <header className="flex flex-shrink-0 items-center justify-between gap-3 border-b border-hairline px-4 py-3.5">
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="relative flex flex-shrink-0">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent-border bg-accent-soft text-accent">
                                        <Sparkles className="h-4 w-4" />
                                    </span>
                                    <span className="soft-pulse absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent" />
                                </span>
                                <span className="min-w-0">
                                    <h4 className="font-heading text-[14.5px] font-semibold leading-tight">Mahesh AI</h4>
                                    <span className="eyebrow block text-[9.5px] text-text-tertiary">
                                        Ask about his work
                                    </span>
                                </span>
                            </div>

                            <div className="flex flex-shrink-0 items-center gap-1">
                                {messages.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={handleClear}
                                        title="Clear conversation"
                                        aria-label="Clear conversation"
                                        className="flex h-8 w-8 items-center justify-center rounded-lg text-text-tertiary transition-colors hover:bg-danger-soft hover:text-danger"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={close}
                                    aria-label="Close assistant"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-text-tertiary transition-colors hover:bg-glass-faint hover:text-text-primary"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </header>

                        {/* ---------------- Transcript ---------------- */}
                        <div className="relative flex min-h-0 flex-1 flex-col">
                            <div
                                ref={messagesRef}
                                aria-live="polite"
                                aria-atomic="false"
                                className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
                            >
                                <div className="bot-markdown glass max-w-[92%] self-start rounded-2xl rounded-bl-md px-4 py-3 text-[13.5px] leading-[1.6] text-text-primary">
                                    <p>
                                        Hi — I&apos;m <strong>Mahesh AI</strong>.
                                    </p>
                                    <p>Ask about his experience, projects, stack or how to reach him.</p>
                                </div>

                                {messages.length === 0 && (
                                    <div className="mt-1 grid gap-2">
                                        {STARTERS.map((item, i) => (
                                            <motion.button
                                                key={item.label}
                                                type="button"
                                                onClick={() => void sendMessage(item.question)}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.12 + i * 0.06, duration: 0.4 }}
                                                className="glass-card sheen group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-left"
                                            >
                                                <span className="icon-chip h-8 w-8 rounded-lg">
                                                    <item.icon className="h-3.5 w-3.5" />
                                                </span>
                                                <span className="min-w-0">
                                                    <span className="block text-[12.5px] font-semibold leading-tight text-text-primary">
                                                        {item.label}
                                                    </span>
                                                    <span className="mt-0.5 block truncate text-[11px] text-text-tertiary">
                                                        {item.hint}
                                                    </span>
                                                </span>
                                            </motion.button>
                                        ))}
                                    </div>
                                )}

                                {messages.map(message => (
                                    <ChatBubble
                                        key={message.id}
                                        message={message}
                                        typeOut={message.id === typingId}
                                    />
                                ))}

                                {isThinking && (
                                    <div className="glass flex items-center gap-2.5 self-start rounded-2xl rounded-bl-md px-4 py-3">
                                        <span className="eyebrow text-[9.5px] text-text-tertiary">Thinking</span>
                                        <span className="flex items-center gap-1">
                                            {[0, 1, 2].map(i => (
                                                <span
                                                    key={i}
                                                    className="h-1 w-1 animate-bounce rounded-full bg-accent"
                                                    style={{ animationDelay: `${i * 0.15}s` }}
                                                />
                                            ))}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={scrollToBottom}
                                aria-label="Scroll to latest"
                                tabIndex={showScrollDown ? 0 : -1}
                                className={`glass glass-strong absolute bottom-3 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full text-text-primary transition-all duration-300 ${showScrollDown
                                        ? "pointer-events-auto translate-y-0 opacity-100"
                                        : "pointer-events-none translate-y-2 opacity-0"
                                    }`}
                            >
                                <ArrowDown className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        {/* ---------------- Composer ---------------- */}
                        <div className="flex-shrink-0 border-t border-hairline px-4 pb-4 pt-3">
                            <div className="flex items-end gap-2 rounded-2xl border border-glass-border bg-glass-faint p-1.5 transition-colors duration-300 focus-within:border-accent-border">
                                <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={e => {
                                        setInput(e.target.value);
                                        e.target.style.height = "auto";
                                        e.target.style.height = `${Math.min(e.target.scrollHeight, 110)}px`;
                                    }}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask about his work…"
                                    rows={1}
                                    aria-label="Message"
                                    className="max-h-[110px] min-h-[34px] flex-1 resize-none bg-transparent px-2.5 py-1.5 text-[13.5px] leading-[1.5] text-text-primary outline-none placeholder:text-text-tertiary"
                                />
                                <button
                                    type="button"
                                    onClick={() => void sendMessage(input)}
                                    aria-label="Send message"
                                    disabled={!canSend}
                                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-on-accent transition-all duration-300 hover:bg-accent-hover disabled:pointer-events-none disabled:opacity-35"
                                >
                                    <Send className="h-3.5 w-3.5" />
                                </button>
                            </div>
                            <p className="mt-2 text-center text-[10px] text-text-tertiary">
                                Answers come from Mahesh&apos;s own portfolio data.
                            </p>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
