import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ArrowUpRight, Check, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { contact, CONTACT_FORM_ENDPOINT } from "../../data/contact";
import { useToast } from "../../context/ToastContext";
import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import { tint } from "../../lib/tints";

type SubmitState = "idle" | "sending";

const fieldClass =
    "peer w-full rounded-xl border border-glass-border bg-glass-faint px-4 pb-2.5 pt-6 text-[14.5px] text-text-primary outline-none transition-colors duration-300 placeholder-shown:pt-4 placeholder-shown:pb-4 focus:border-accent-border";

const labelClass =
    "pointer-events-none absolute left-4 top-2 text-[10.5px] font-medium uppercase tracking-[0.12em] text-text-tertiary opacity-100 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[13.5px] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10.5px] peer-focus:uppercase peer-focus:tracking-[0.12em] peer-focus:text-accent";

export default function Contact() {
    const { showToast } = useToast();
    const [submitState, setSubmitState] = useState<SubmitState>("idle");
    const [copied, setCopied] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

    const handleChange = (field: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleCopyEmail = () => {
        navigator.clipboard
            .writeText(contact.email)
            .then(() => {
                setCopied(true);
                showToast("Email copied to clipboard");
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => undefined);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
            showToast("Please fill out every field.");
            return;
        }

        setSubmitState("sending");
        try {
            const response = await fetch(CONTACT_FORM_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                showToast("Message sent successfully");
                setForm({ name: "", email: "", subject: "", message: "" });
            } else {
                showToast("Failed to send. Please try again.");
            }
        } catch (error) {
            console.error("Email sending error:", error);
            showToast("Network error. Please try again later.");
        } finally {
            setSubmitState("idle");
        }
    };

    const infoRows = [
        {
            icon: copied ? Check : Mail,
            label: "Email",
            value: contact.email,
            onClick: handleCopyEmail,
            hint: copied ? "Copied" : "Click to copy",
            tint: "indigo" as const
        },
        { icon: Phone, label: "Phone", value: contact.phone, tint: "cyan" as const },
        { icon: MapPin, label: "Location", value: contact.location, tint: "green" as const },
        {
            icon: CheckCircle2,
            label: "Status",
            value: "Available for professional roles",
            tint: "magenta" as const
        }
    ];

    return (
        <Section id="contact" fx="glow" intensity="bold" grain>
            <SectionHeading
                index="07"
                eyebrow="Contact"
                title="Let’s build something worth shipping."
                serifWords={["shipping"]}
                description="Open to Software Engineer, Full Stack, and Backend Developer roles — and to interesting conversations either way."
            />

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                {/* ---------------- Details ---------------- */}
                <div className="flex flex-col gap-5">
                    <div className="glass overflow-hidden rounded-[26px] transition-shadow duration-300 hover:shadow-lg">
                        {infoRows.map(row => {
                            const body = (
                                <>
                                    <span className="icon-chip h-10 w-10 rounded-xl">
                                        <row.icon className="h-4 w-4" />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="eyebrow block text-text-tertiary">{row.label}</span>
                                        <span className="mt-1 block truncate text-[14.5px] font-medium text-text-primary">
                                            {row.value}
                                        </span>
                                    </span>
                                    {row.hint && (
                                        <span className="flex-shrink-0 text-[11px] font-medium text-accent">
                                            {row.hint}
                                        </span>
                                    )}
                                </>
                            );

                            // "group" so each row's icon-chip picks up colour
                            // on hover, same as every other icon-chip on the page.
                            const rowClass = "group flex w-full items-center gap-4 border-b border-hairline p-5 text-left last:border-b-0";

                            return row.onClick ? (
                                <button
                                    key={row.label}
                                    id="emailCard"
                                    type="button"
                                    onClick={row.onClick}
                                    style={tint(row.tint)}
                                    className={`${rowClass} transition-colors duration-300 hover:bg-glass-faint`}
                                >
                                    {body}
                                </button>
                            ) : (
                                <div key={row.label} style={tint(row.tint)} className={rowClass}>
                                    {body}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <a
                            href={`mailto:${contact.email}`}
                            className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 font-heading text-[13.5px] font-semibold text-on-accent transition-colors duration-300 hover:bg-accent-hover"
                        >
                            <Mail className="h-4 w-4" /> Email me
                        </a>
                        <a
                            href={contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass group flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3.5 font-heading text-[13.5px] font-semibold text-text-primary transition-colors duration-300 hover:text-accent"
                        >
                            LinkedIn
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>
                </div>

                {/* ---------------- Form ---------------- */}
                <form
                    onSubmit={handleSubmit}
                    className="glass flex flex-col gap-2.5 rounded-[26px] p-5 transition-shadow duration-300 focus-within:shadow-lg md:p-6"
                >
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="relative">
                            <input
                                id="formName"
                                value={form.name}
                                onChange={handleChange("name")}
                                required
                                minLength={3}
                                placeholder=" "
                                className={fieldClass}
                            />
                            <label htmlFor="formName" className={labelClass}>
                                Your name
                            </label>
                        </div>

                        <div className="relative">
                            <input
                                id="formEmail"
                                type="email"
                                value={form.email}
                                onChange={handleChange("email")}
                                required
                                placeholder=" "
                                className={fieldClass}
                            />
                            <label htmlFor="formEmail" className={labelClass}>
                                Email address
                            </label>
                        </div>
                    </div>

                    <div className="relative">
                        <input
                            id="formSubject"
                            value={form.subject}
                            onChange={handleChange("subject")}
                            required
                            minLength={3}
                            placeholder=" "
                            className={fieldClass}
                        />
                        <label htmlFor="formSubject" className={labelClass}>
                            Subject
                        </label>
                    </div>

                    <div className="relative">
                        <textarea
                            id="formMessage"
                            value={form.message}
                            onChange={handleChange("message")}
                            required
                            minLength={5}
                            rows={4}
                            placeholder=" "
                            className={`${fieldClass} resize-none`}
                        />
                        <label
                            htmlFor="formMessage"
                            className="pointer-events-none absolute left-4 top-2 text-[10.5px] font-medium uppercase tracking-[0.12em] text-text-tertiary transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[13.5px] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[10.5px] peer-focus:uppercase peer-focus:tracking-[0.12em] peer-focus:text-accent"
                        >
                            Write your message
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={submitState === "sending"}
                        className="mt-0.5 flex w-full items-center justify-center gap-2.5 rounded-xl bg-accent py-3.5 font-heading text-[14px] font-semibold text-on-accent transition-all duration-300 hover:bg-accent-hover disabled:pointer-events-none disabled:opacity-60"
                    >
                        {submitState === "sending" ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" /> Sending
                            </>
                        ) : (
                            <>
                                Send message <Send className="h-4 w-4" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </Section>
    );
}
