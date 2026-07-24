import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

/* ===========================
        Middlewares
=========================== */

app.use(cors());

app.use(express.json());

/* ===========================
        Routes
=========================== */

app.use("/api/chat", chatRoutes);

/* ===========================
        Health Check
=========================== */

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "Portfolio AI Backend is Running 🚀"

    });

});

/* ===========================
        Start Server
=========================== */

app.listen(PORT, () => {

    console.log(` Server running on http://localhost:${PORT}`);

});