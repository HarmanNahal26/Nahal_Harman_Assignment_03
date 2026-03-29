import express, { Express } from "express";

import dotenv from "dotenv";

// Load environment variables BEFORE your internal imports!
dotenv.config();

import healthRoutes from "./api/v1/routes/healthRoutes";
import eventRoutes from "./api/v1/routes/eventRoutes";

// Initialize Express application
const app: Express = express();

// Middleware
app.use(express.json());



// Define a route
app.use("/api/v1", healthRoutes);
app.use("/api/v1/events", eventRoutes);

export default app;