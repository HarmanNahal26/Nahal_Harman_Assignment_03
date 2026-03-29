import express, { Express } from "express";

import dotenv from "dotenv";

// Load environment variables BEFORE your internal imports!
dotenv.config();

import cors from "cors";
import { getHelmetConfig } from "./config/helmetConfig";
import { getCorsOptions } from "./config/corsConfig";

import setupSwagger from "./config/swagger";
import healthRoutes from "./api/v1/routes/healthRoutes";
import eventRoutes from "./api/v1/routes/eventRoutes";

// Initialize Express application
const app: Express = express();

// Security middleware
app.use(getHelmetConfig());
app.use(cors(getCorsOptions()));

// Middleware
app.use(express.json());


// Routes
app.use("/api/v1", healthRoutes);
app.use("/api/v1/events", eventRoutes);

// Setup Swagger
setupSwagger(app);

export default app;