import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the system prompt only once when the server starts
const systemPrompt = fs.readFileSync(
    path.join(__dirname, "systemPrompt.txt"),
    "utf8"
);

/**
 * Builds the prompt for the LLM.
 *
 * @param {string} retrievedContext
 * @param {string} userQuestion
 * @returns {{systemInstruction:string,userPrompt:string}}
 */
export function buildPrompt(
    retrievedContext = "",
    userQuestion = ""
) {
    const context = retrievedContext?.trim() || "No relevant information found.";

    const question = userQuestion?.trim() || "";

    const userPrompt = `
<RETRIEVED_KNOWLEDGE>

${context}

</RETRIEVED_KNOWLEDGE>

<USER_QUESTION>

${question}

</USER_QUESTION>

<INSTRUCTIONS>

Answer using the retrieved knowledge.

If multiple knowledge chunks contain similar information, merge them into a single coherent response.

Never copy the knowledge verbatim.

Rewrite naturally.

Never mention:
- retrieved context
- knowledge base
- documents
- embeddings
- vector database
- search results

If the answer is not available, politely explain what topics you can answer questions about (e.g. experience, projects, skills, education, contact info) and suggest contacting Mahesh directly at maheshbatta539@gmail.com.

Respond in Markdown.

</INSTRUCTIONS>
`;

    return {
        systemInstruction: systemPrompt,
        userPrompt
    };
}