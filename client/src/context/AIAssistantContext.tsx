import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface AIAssistantContextValue {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

const AIAssistantContext = createContext<AIAssistantContextValue | undefined>(undefined);

export function AIAssistantProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen(prev => !prev), []);

    const value = useMemo(() => ({ isOpen, open, close, toggle }), [isOpen, open, close, toggle]);

    return <AIAssistantContext.Provider value={value}>{children}</AIAssistantContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- small context module, hook + provider live together intentionally
export function useAIAssistant(): AIAssistantContextValue {
    const ctx = useContext(AIAssistantContext);
    if (!ctx) throw new Error("useAIAssistant must be used within an AIAssistantProvider");
    return ctx;
}
