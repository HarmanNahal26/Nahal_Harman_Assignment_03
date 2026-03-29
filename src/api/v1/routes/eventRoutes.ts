import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import * as eventController from "../controllers/eventController";
import { eventSchemas } from "../validation/eventSchemas";

const router: Router = express.Router();

// Create event - validates body
router.post(
    "/",
    validateRequest(eventSchemas.create),
    eventController.createEvent
);

// Get all events
router.get("/", eventController.getAllEvents);

// Get event by ID - validates params
router.get(
    "/:id",
    validateRequest(eventSchemas.getById),
    eventController.getEventById
);

// Update event - validates params and body
router.put(
    "/:id",
    validateRequest(eventSchemas.update),
    eventController.updateEvent
);

// Delete event
router.delete("/:id", eventController.deleteEvent);
// Delete event - validates params
router.delete(
    "/:id",
    validateRequest(eventSchemas.delete),
    eventController.deleteEvent
);

export default router; 