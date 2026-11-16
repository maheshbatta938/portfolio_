import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            if (totalHeight <= 0) {
                setProgress(0);
                return;
            }
            const pct = Math.min(100, (scrollY / totalHeight) * 100);
            setProgress(pct);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // initialise
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            aria-hidden="true"
            className="fixed top-0 left-0 z-50 h-[3px] w-full"
            style={{ background: "transparent" }}
        >
            <div
                className="h-full transition-all duration-75 ease-out"
                style={{
                    width: `${progress}%`,
                    background: "var(--accent)",
                }}
            />
        </div>
    );
}
