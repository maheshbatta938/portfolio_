import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const assets = [
    ["src/data/portfolio.json", "dist/data/portfolio.json"],
    ["src/data/systemPrompt.txt", "dist/data/systemPrompt.txt"]
];

for (const [from, to] of assets) {
    const src = path.join(root, from);
    const dest = path.join(root, to);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
}

console.log("Copied non-TS data assets into dist/");
