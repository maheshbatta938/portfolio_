import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface Props {
    children: ReactNode;
    fallbackTitle?: string;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="glass rounded-[22px] border border-hairline p-6 m-4 text-center flex flex-col items-center justify-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-danger-soft text-danger">
                        <AlertTriangle className="h-5 w-5" />
                    </span>
                    <h3 className="font-heading text-[16px] font-semibold text-text-primary">
                        {this.props.fallbackTitle || "Something went wrong"}
                    </h3>
                    <p className="text-[13px] text-text-secondary max-w-[320px] leading-relaxed">
                        An unexpected error occurred while rendering this component.
                    </p>
                    <button
                        type="button"
                        onClick={this.handleReset}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[12px] font-semibold text-on-accent transition-all hover:bg-accent-hover"
                    >
                        <RotateCcw className="h-3.5 w-3.5" /> Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
