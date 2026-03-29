import { Request, Response, NextFunction } from "express";
import * as eventService from "../services/eventService";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { Event } from "../models/eventModel";

/**
 * Handles creating a new event.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, date, capacity, registrationCount, status, category } =
            req.body;

        const now: string = new Date().toISOString();

        const eventData: Partial<Event> = {
            name,
            date,
            capacity,
            registrationCount,
            status,
            category,
            createdAt: new Date(now),
            updatedAt: new Date(now),
        };

        const id: string = await eventService.createEvent(eventData);
        const event: Event | null = await eventService.getEventById(id);



        res.status(HTTP_STATUS.CREATED).json({
            message: "Event created",
            data: event,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles retrieving all events.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getAllEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const events: Event[] = await eventService.getAllEvents();
        res.status(HTTP_STATUS.OK).json({
            message: "Events retrieved",
            count: events.length,
            data: events,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles retrieving a single event by ID.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getEventById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params["id"] as string;
        const event = await eventService.getEventById(id);

        if (!event) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Event not found",
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Event retrieved",
            data: event,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles updating an event.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const updateEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params["id"] as string;
        const event: Event | null = await eventService.getEventById(id);


        if (!event) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Event not found",
            });
            return;
        }

        await eventService.updateEvent(id, {
            ...req.body,
            updatedAt: new Date(),
        });

        const updatedEvent: Event | null = await eventService.getEventById(id);
        res.status(HTTP_STATUS.OK).json({
            message: "Event updated",
            data: updatedEvent,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles deleting an event.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const deleteEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params["id"] as string;
         const event: Event | null = await eventService.getEventById(id);
        if (!event) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Event not found",
            });
            return;
        }

        await eventService.deleteEvent(id);
        res.status(HTTP_STATUS.OK).json({
            message: "Event deleted",
        });
    } catch (error: unknown) {
        next(error);
    }
};