import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the system prompt only once when the server starts
const systemPrompt = fs.readFileSync(path.join(__dirname, "systemPrompt.txt"), "utf8");

export interface BuiltPrompt {
    systemInstruction: string;
    userPrompt: string;
}

/**
 * Builds the turn sent to the model.
 *
 * The facts go first and the question last: the model answers the thing it
 * read most recently, so putting the question at the end keeps replies on
 * target instead of drifting into a general summary of everything supplied.
 */
export function buildPrompt(retrievedContext = "", userQuestion = ""): BuiltPrompt {
    const context = retrievedContext?.trim() || "No specific details available for this topic.";
    const question = userQuestion?.trim() || "";

    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const userPrompt = `Today's date is ${today}. Use it to reason about anything time-relative (e.g. a past graduation year means his education is already complete, not in progress).

FACTS ABOUT MAHESH (the only facts you may use):

${context}

---

VISITOR'S QUESTION:

${question}

---

Answer the question above. Match your length to the question — a small question gets a small answer. Use only the facts listed, rewrite them in your own words, and never mention where they came from. If the facts do not cover it, say so and point them to maheshbatta539@gmail.com.`;

    return {
        systemInstruction: systemPrompt,
        userPrompt
    };
}
