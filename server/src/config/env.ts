import dotenv from "dotenv";

dotenv.config();

export const env = {
    port: Number(process.env.PORT) || 3005,
    geminiApiKey: process.env.GEMINI_API_KEY || "",
    corsOrigin: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(",").map(origin => origin.trim())
        : true
};
