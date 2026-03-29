import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path"; 
import cors from "cors";
import { getHelmetConfig } from "./config/helmetConfig";
import { getCorsOptions } from "./config/corsConfig";
import setupSwagger from "./config/swagger";
import healthRoutes from "./api/v1/routes/healthRoutes";
import eventRoutes from "./api/v1/routes/eventRoutes";

// Load environment variables BEFORE your internal imports!
dotenv.config();

// Initialize Express application
const app: Express = express();

// Security middleware
app.use(getHelmetConfig());
app.use(cors(getCorsOptions()));

// Middleware
app.use(express.json());

// Serve Redocly docs at /docs
app.use("/docs", express.static(path.join(__dirname, "../docs"))); // <-- Add this

// Routes
app.use("/api/v1", healthRoutes);
app.use("/api/v1/events", eventRoutes);

// Setup Swagger
setupSwagger(app);

export default app;