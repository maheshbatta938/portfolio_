import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

interface ToastContextValue {
    showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toast, setToast] = useState<{ id: number; message: string; visible: boolean } | null>(null);

    const showToast = useCallback((message: string) => {
        const id = Date.now();
        setToast({ id, message, visible: false });
        // allow mount before transitioning in
        requestAnimationFrame(() => {
            setToast(current => (current && current.id === id ? { ...current, visible: true } : current));
        });
        setTimeout(() => {
            setToast(current => (current && current.id === id ? { ...current, visible: false } : current));
            setTimeout(() => {
                setToast(current => (current && current.id === id ? null : current));
            }, 400);
        }, 3000);
    }, []);

    const value = useMemo(() => ({ showToast }), [showToast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            {toast && (
                <div
                    role="status"
                    className={`glass glass-strong fixed bottom-8 left-1/2 z-toast flex items-center gap-2.5 rounded-full px-5.5 py-3 text-[13.5px] font-medium text-text-primary transition-all duration-400 ${
                        toast.visible ? "translate-x-[-50%] translate-y-0 opacity-100" : "translate-x-[-50%] translate-y-[100px] opacity-0"
                    }`}
                >
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span>{toast.message}</span>
                </div>
            )}
        </ToastContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components -- small context module, hook + provider live together intentionally
export function useToast(): ToastContextValue {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within a ToastProvider");
    return ctx;
}
