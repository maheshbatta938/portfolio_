import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { chatComponents } from "../data/components/index.js";
import type { PortfolioData } from "../types/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Topics supplied when a question matches nothing — the things people actually ask about. */
const DEFAULT_TOPICS = ["Work Experience", "Projects", "Skills"];

/** How many matched topics to include. More than this and the model starts summarising instead of answering. */
const MAX_TOPICS = 3;

function escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

class ContextService {
    private dataPath: string;
    private portfolioData: PortfolioData | null;
    private keywordPatterns: Map<string, RegExp>;

    constructor() {
        this.dataPath = path.join(__dirname, "../data/portfolio.json");
        this.portfolioData = null;
        this.keywordPatterns = new Map();
        this.loadData();
    }

    loadData(): void {
        try {
            const content = fs.readFileSync(this.dataPath, "utf8");
            this.portfolioData = JSON.parse(content) as PortfolioData;
        } catch (error) {
            console.error("Failed to load portfolio.json in ContextService:", error);
            this.portfolioData = null;
        }
    }

    /**
     * Whole-word matcher for a keyword, compiled once and reused.
     *
     * Substring matching was scoring "ai" inside "email" and "role" inside
     * "controller", which pulled the wrong topic into context on perfectly
     * ordinary questions.
     */
    private matcher(keyword: string): RegExp {
        let pattern = this.keywordPatterns.get(keyword);
        if (!pattern) {
            pattern = new RegExp(`\\b${escapeRegex(keyword)}\\b`, "i");
            this.keywordPatterns.set(keyword, pattern);
        }
        return pattern;
    }

    /** Identity facts worth having on hand no matter what was asked. */
    private profileCard(data: PortfolioData): string {
        return `### Who he is:
- Name: Mahesh Batta
- Current focus: ${data.profile.careerGoal}
- Based in: ${data.profile.location}
- Graduating: ${data.profile.graduatedYear}
- Email: ${data.contact.email}
- LinkedIn: ${data.contact.linkedin}
- GitHub: ${data.contact.github}
- In one line: A software developer who builds web applications, backend services and AI-assisted features. He has shipped production work during internships — Angular migrations, REST APIs and database integration — and has solved 400+ data structures and algorithms problems.`;
    }

    /**
     * Scores every topic against the question and returns the strongest few,
     * always led by the profile card so short answers never lack the basics.
     */
    retrieveContext(query: string): string {
        if (!this.portfolioData) return "";

        const data = this.portfolioData;

        const scored = chatComponents
            .filter(comp => comp.contextKeywords && comp.contextKeywords.length > 0)
            .map(comp => {
                let score = 0;
                for (const keyword of comp.contextKeywords ?? []) {
                    if (this.matcher(keyword).test(query)) {
                        // A multi-word hit ("data structure") is far more
                        // telling than a single common word ("work").
                        score += keyword.includes(" ") ? 3 : 1;
                    }
                }
                return { name: comp.name, score, format: () => comp.formatContext(data) };
            });

        let matched = scored.filter(item => item.score > 0).sort((a, b) => b.score - a.score);

        if (matched.length === 0) {
            matched = scored.filter(item => DEFAULT_TOPICS.includes(item.name));
        }

        const sections = matched
            .slice(0, MAX_TOPICS)
            .map(item => `### ${item.name}:\n${item.format()}`)
            .join("\n\n");

        return `${this.profileCard(data)}\n\n${sections}`;
    }
}

export const contextService = new ContextService();
