import type { ReactNode } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ScrollToTopButton from "../components/common/ScrollToTopButton";
import AIAssistant from "../components/AIAssistant/AIAssistant";
import AssistantLauncher from "../components/AIAssistant/AssistantLauncher";

export default function AppShell({ children }: { children: ReactNode }) {
    return (
        <div className="relative min-h-screen bg-bg">
            <a
                href="#overview"
                className="glass sr-only rounded-full px-4 py-2 text-sm font-semibold focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-toast"
            >
                Skip to content
            </a>

            <Header />

            {/* No top padding here: it would sit ABOVE the first section and
                leave a strip of bare canvas under the floating header. Each
                section owns its own backdrop AND its own clearance. */}
            <main className="relative">{children}</main>

            <Footer />

            <AIAssistant />
            <AssistantLauncher />
            <ScrollToTopButton />
        </div>
    );
}
