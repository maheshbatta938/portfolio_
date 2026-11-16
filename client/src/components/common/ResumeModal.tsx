import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
    resumeUrl: string;
}

export default function ResumeModal({ isOpen, onClose, resumeUrl }: ResumeModalProps) {
    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, onClose]);

    // Lock body scroll while open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-modal bg-black/60 backdrop-blur-sm flex items-start justify-center px-4 overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="glass glass-strong max-w-4xl w-full mx-auto my-8 h-[90vh] rounded-[24px] overflow-hidden flex flex-col"
                        initial={{ opacity: 0, scale: 0.96, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 16 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-hairline shrink-0">
                            <span className="font-heading text-[15px] font-semibold text-text-primary">
                                Resume Preview
                            </span>
                            <div className="flex items-center gap-2">
                                <a
                                    href={resumeUrl}
                                    download
                                    className="inline-flex items-center gap-2 bg-accent text-on-accent rounded-full px-4 py-2 text-[13px] font-semibold transition-opacity hover:opacity-90"
                                >
                                    <Download className="h-3.5 w-3.5" />
                                    Download PDF
                                </a>
                                <button
                                    onClick={onClose}
                                    aria-label="Close resume preview"
                                    className="h-8 w-8 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-hidden">
                            <iframe
                                src={resumeUrl}
                                className="w-full h-full border-0"
                                title="Resume preview"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
