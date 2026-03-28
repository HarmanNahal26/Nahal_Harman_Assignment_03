import { Event } from "../models/eventModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const EVENTS_COLLECTION: string = "events";

/**
 * Creates a new event.
 * @param {Partial<Event>} eventData - The event data to create.
 * @returns {Promise<string>} - The ID of the newly created event.
 */
export const createEvent = async (
    eventData: Partial<Event>
): Promise<string> => {
    try {
        const id: string = await generateEventId();
        await firestoreRepository.createDocument<Event>(
            EVENTS_COLLECTION,
            eventData,
            id
        );
        return id;
    } catch (error: unknown) {
        const errorMessage: string =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create event: ${errorMessage}`);
    }
};

/**
 * Retrieves all events.
 * @returns {Promise<Event[]>} - Array of all events.
 */
export const getAllEvents = async (): Promise<Event[]> => {
    try {
        const snapshot = await firestoreRepository.getDocuments(
            EVENTS_COLLECTION
        );
                       return snapshot.docs.map((doc) => {
            const data = doc.data() as any;
            return {
                id: doc.id,
                ...data,
                date: data.date?.toDate?.()?.toISOString() ?? data.date,
                createdAt: data.createdAt?.toDate?.()?.toISOString() ?? data.createdAt,
                updatedAt: data.updatedAt?.toDate?.()?.toISOString() ?? data.updatedAt,
            } as unknown as Event;
        });
    } catch (error: unknown) {
        const errorMessage: string =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get events: ${errorMessage}`);
    }
};

/**
 * Retrieves a single event by ID.
 * @param {string} id - The event ID.
 * @returns {Promise<Event | null>} - The event or null if not found.
 */
export const getEventById = async (id: string): Promise<Event | null> => {
    try {
        const doc = await firestoreRepository.getDocumentById(
            EVENTS_COLLECTION,
            id
        );
         if (!doc) return null;
        const data = doc.data() as any;
        return {
            id: doc.id,
            ...data,
            date: data.date?.toDate?.()?.toISOString() ?? data.date,
            createdAt: data.createdAt?.toDate?.()?.toISOString() ?? data.createdAt,
            updatedAt: data.updatedAt?.toDate?.()?.toISOString() ?? data.updatedAt,
        } as unknown as Event;
    } catch (error: unknown) {
        const errorMessage: string =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get event ${id}: ${errorMessage}`);
    }
};

/**
 * Updates an existing event.
 * @param {string} id - The event ID.
 * @param {Partial<Event>} eventData - The updated event data.
 * @returns {Promise<void>}
 */
export const updateEvent = async (
    id: string,
    eventData: Partial<Event>
): Promise<void> => {
    try {
        await firestoreRepository.updateDocument<Event>(
            EVENTS_COLLECTION,
            id,
            eventData
        );
    } catch (error: unknown) {
        const errorMessage: string =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update event ${id}: ${errorMessage}`);
    }
};

/**
 * Deletes an event.
 * @param {string} id - The event ID.
 * @returns {Promise<void>}
 */
export const deleteEvent = async (id: string): Promise<void> => {
    try {
        await firestoreRepository.deleteDocument(EVENTS_COLLECTION, id);
    } catch (error: unknown) {
        const errorMessage: string =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete event ${id}: ${errorMessage}`);
    }
};

/**
 * Generates a sequential event ID in format evt_000001
 */
const generateEventId = async (): Promise<string> => {
    const snapshot = await firestoreRepository.getDocuments(EVENTS_COLLECTION);
     const count: number = snapshot.size + 1;
    return `evt_${String(count).padStart(6, "0")}`;
};