import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

/* ===========================
        Middlewares
=========================== */
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());

/* ===========================
        Routes
=========================== */
app.use("/api/chat", chatRoutes);

/* ===========================
        Health Check
=========================== */
app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Portfolio AI Backend is Running 🚀"
    });
});

/* ===========================
        Start Server
=========================== */
app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
});
