import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { AIAssistantProvider } from "./context/AIAssistantContext";

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Root element #root was not found in index.html");
}

createRoot(rootElement).render(
    <StrictMode>
        <ThemeProvider>
            <ToastProvider>
                <AIAssistantProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </AIAssistantProvider>
            </ToastProvider>
        </ThemeProvider>
    </StrictMode>
);
