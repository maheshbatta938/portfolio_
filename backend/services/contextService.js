import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { chatComponents } from "../data/components/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ContextService {
    constructor() {
        this.dataPath = path.join(__dirname, "../data/portfolio.json");
        this.portfolioData = null;
        this.loadData();
    }

    loadData() {
        try {
            const content = fs.readFileSync(this.dataPath, "utf8");
            this.portfolioData = JSON.parse(content);
        } catch (error) {
            console.error("Failed to load portfolio.json in ContextService:", error);
            this.portfolioData = {};
        }
    }

    /**
     * Scores and extracts the most relevant sections of the portfolio matching the query.
     * @param {string} query - The user message.
     * @returns {string} The dynamic context block.
     */
    retrieveContext(query) {
        if (!this.portfolioData) return "";

        const text = query.toLowerCase();

        // Score each component based on context keywords hits
        const scored = chatComponents
            .filter(comp => comp.contextKeywords && comp.contextKeywords.length > 0)
            .map(comp => {
                let score = 0;
                comp.contextKeywords.forEach(keyword => {
                    if (text.includes(keyword)) {
                        score += 1;
                    }
                });
                return {
                    name: comp.name,
                    score: score,
                    format: () => comp.formatContext(this.portfolioData)
                };
            });

        // Filter and sort sections with score > 0
        const matched = scored
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score);

        // If no matches, return a default overview context
        if (matched.length === 0) {
            return `General Overview: Mahesh Batta is a Software Developer.
- Location: ${this.portfolioData.profile.location}
- Graduation Year: ${this.portfolioData.profile.graduatedYear}
- Email: ${this.portfolioData.contact.email}
- Phone: ${this.portfolioData.contact.phone}
- GitHub: ${this.portfolioData.contact.github}
- LinkedIn: ${this.portfolioData.contact.linkedin}
- Career Goal: ${this.portfolioData.profile.careerGoal}
- Brief Profile: Mahesh Batta is a Software Developer passionate about building modern web applications, backend systems and AI-powered solutions. He has practical experience in enterprise software development through internships where he contributed to production applications, Angular migrations, backend APIs and database integration. He has solved over 400+ Data Structures and Algorithms problems.`;
        }

        // Build the dynamic text context from top matches (limit to top 3)
        let contextText = "";
        matched.slice(0, 3).forEach(item => {
            contextText += `\n### ${item.name} Context:\n${item.format()}\n`;
        });

        return contextText;
    }
}

export const contextService = new ContextService();

