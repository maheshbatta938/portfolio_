import { ArrowUpRight, Mail } from "lucide-react";
import { contact } from "../../data/contact";
import { profile } from "../../data/profile";
import { navItems } from "../Navigation/navItems";

const LeetCodeIcon = () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
        <path d="M16.102 17.93l-2.69 2.6c-.773.75-2.076.75-2.85 0l-5.31-5.125a2.07 2.07 0 0 1 0-2.837l2.68-2.587c.315-.3.824-.3 1.139 0s.315.79 0 1.1l-2.08 2.007a.828.828 0 0 0 0 1.135l5.308 5.13c.315.3.824.3 1.139 0l2.08-2.008c.315-.3.824-.3 1.139 0s.315.79 0 1.1zM22 10.513c0-.43-.36-.78-.81-.78h-8.082a.83.83 0 0 0-.586.228L9.843 12.55c-.315-.3-.315-.79 0-1.1c.315-.3.824-.3 1.139 0l2.69-2.587a2.07 2.07 0 0 1 2.85 0l5.31 5.125c.773.75.773 1.97 0 2.837l-2.68 2.587c-.315.3-.824.3-1.139 0a.78.78 0 0 1 0-1.1l2.08-2.007c.315-.3.315-.79 0-1.1l-5.308-5.13a.83.83 0 0 0-1.139 0l-2.08 2.008c-.315.3-.824.3-1.139 0s-.315-.79 0-1.1z" />
    </svg>
);

const GfgIcon = () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
        <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.13-.353h7.418a4.26 4.26 0 0 1-.368 1.008zm-11.99-.654a3.793 3.793 0 0 1-2.134 2.078 4.51 4.51 0 0 1-3.117.016 3.7 3.7 0 0 1-1.104-.695 2.652 2.652 0 0 1-.564-.745 4.221 4.221 0 0 1-.368-1.006H9.59c-.038.12-.08.238-.13.352zm14.501-1.758a3.849 3.849 0 0 0-.082-.475l-9.634-.008a3.932 3.932 0 0 1 1.143-2.348c.363-.35.79-.625 1.26-.809a3.97 3.97 0 0 1 4.484.957l1.521-1.49a5.7 5.7 0 0 0-1.922-1.357 6.283 6.283 0 0 0-2.544-.49 6.283 6.283 0 0 0-2.544.49A5.7 5.7 0 0 0 1.34 7.73l1.52 1.49a4.166 4.166 0 0 1 4.484-.958c.47.184.898.46 1.26.81.368.36.66.792.859 1.268.146.344.242.708.285 1.08l-9.635.008A4.714 4.714 0 0 0 0 12.457a6.493 6.493 0 0 0 .345 2.127 4.927 4.927 0 0 0 1.08 1.783c.528.56 1.17 1 1.88 1.293a6.454 6.454 0 0 0 2.504.457c.824.005 1.64-.15 2.404-.457a5.986 5.986 0 0 0 1.964-1.277 6.116 6.116 0 0 0 1.686-3.076h.273a6.13 6.13 0 0 0 1.686 3.077 5.99 5.99 0 0 0 1.964 1.276 6.345 6.345 0 0 0 2.405.457 6.45 6.45 0 0 0 2.502-.457 5.42 5.42 0 0 0 1.882-1.293 4.928 4.928 0 0 0 1.08-1.783A6.52 6.52 0 0 0 24 12.457a4.757 4.757 0 0 0-.039-.554z" />
    </svg>
);

const socials = [
    { href: contact.linkedin, label: "LinkedIn", icon: <i className="fa-brands fa-linkedin-in" aria-hidden="true" /> },
    { href: contact.github, label: "GitHub", icon: <i className="fa-brands fa-github" aria-hidden="true" /> },
    { href: contact.leetcode, label: "LeetCode", icon: <LeetCodeIcon /> },
    { href: contact.geeksforgeeks, label: "GeeksforGeeks", icon: <GfgIcon /> },
    { href: contact.instagram, label: "Instagram", icon: <i className="fa-brands fa-instagram" aria-hidden="true" /> },
    { href: `mailto:${contact.email}`, label: "Email", icon: <Mail className="h-3.5 w-3.5" /> }
];

export default function Footer() {
    return (
        <footer className="relative z-content mt-10 border-t border-hairline">
            <div className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-8 lg:px-14 lg:py-20">
                {/* Oversized sign-off — the last thing anyone reads. */}
                <div className="mb-14 flex flex-col gap-8 border-b border-hairline pb-14 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="eyebrow mb-5 text-text-tertiary">Say hello</p>
                        <a
                            href={`mailto:${contact.email}`}
                            className="group inline-flex items-center gap-3 font-heading text-[clamp(1.8rem,5vw,3.4rem)] font-semibold leading-none tracking-tight transition-colors duration-300 hover:text-accent"
                        >
                            <span className="break-all">{contact.email}</span>
                            <ArrowUpRight className="hidden h-8 w-8 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:block" />
                        </a>
                    </div>

                    <a
                        href={profile.resumeUrl}
                        download="Mahesh_Batta_Resume.pdf"
                        className="glass inline-flex flex-shrink-0 items-center gap-2 self-start rounded-full px-5 py-3 font-heading text-[13px] font-semibold text-text-primary transition-colors duration-300 hover:text-accent md:self-auto"
                    >
                        Download résumé
                    </a>
                </div>

                <div className="flex flex-col gap-10 md:flex-row md:justify-between">
                    <div className="max-w-[320px]">
                        <p className="font-heading text-[17px] font-semibold">{profile.fullName}</p>
                        <p className="mt-2 text-[13.5px] leading-relaxed text-text-secondary">
                            {profile.tagline} · {profile.location}
                        </p>
                    </div>

                    <nav aria-label="Footer" className="flex flex-col gap-2.5">
                        <p className="eyebrow mb-1 text-text-tertiary">Sections</p>
                        {navItems.map(item => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className="link-underline w-fit text-[13.5px] text-text-secondary transition-colors hover:text-text-primary"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex flex-col gap-2.5">
                        <p className="eyebrow mb-1 text-text-tertiary">Elsewhere</p>
                        <div className="flex flex-wrap gap-2">
                            {socials.map(social => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                                    rel="noopener noreferrer"
                                    title={social.label}
                                    aria-label={social.label}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-glass-faint text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-border hover:text-accent"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-14 flex flex-col gap-2 border-t border-hairline pt-8 text-[11.5px] text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
                    <p>&copy; {new Date().getFullYear()} {profile.fullName}. All rights reserved.</p>
                    <p className="font-mono">Built with React, TypeScript &amp; Tailwind</p>
                </div>
            </div>
        </footer>
    );
}
