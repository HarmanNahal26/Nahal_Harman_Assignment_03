import { Event } from "../models/eventModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const EVENTS_COLLECTION = "events";

/**
 * Creates a new event.
 * @param {Partial<Event>} eventData - Event data to create.
 * @returns {Promise<string>} - The ID of the newly created event.
 * @throws {Error} Throws an error if creation fails.
 */
export const createEvent = async (
    eventData: Partial<Event>
): Promise<string> => {
    try {
        const id = await generateEventId();
        await firestoreRepository.createDocument<Event>(EVENTS_COLLECTION, eventData, id);
        return id;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create event: ${errorMessage}`);
    }
};

/**
 * Retrieves all events.
 * @returns {Promise<Event[]>} - Array of all events (empty if none exist).
 * @throws {Error} Throws an error if Firestore query fails.
 */
export const getAllEvents = async (): Promise<Event[]> => {
    try {
        const snapshot = await firestoreRepository.getDocuments(EVENTS_COLLECTION);

        if (!snapshot || snapshot.empty) {
            console.warn(`No events found in collection: ${EVENTS_COLLECTION}`);
            return [];
        }

        return snapshot.docs.map((doc) => {
            const data = doc.data() as any;
            return {
                id: doc.id,
                ...data,
                date: data.date?.toDate?.()?.toISOString() ?? data.date,
                createdAt: data.createdAt?.toDate?.()?.toISOString() ?? data.createdAt,
                updatedAt: data.updatedAt?.toDate?.()?.toISOString() ?? data.updatedAt,
            } as Event;
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error(`Failed to get events: ${errorMessage}`);
        throw new Error(`Failed to get events: ${errorMessage}`);
    }
};

/**
 * Retrieves a single event by ID.
 * @param {string} id - The event ID.
 * @returns {Promise<Event | null>} - Event object or null if not found.
 */
export const getEventById = async (id: string): Promise<Event | null> => {
    try {
        const doc = await firestoreRepository.getDocumentById(EVENTS_COLLECTION, id);
        if (!doc || !doc.exists) {
            console.warn(`Event not found with ID: ${id}`);
            return null;
        }
        const data = doc.data() as any;
        return {
            id: doc.id,
            ...data,
            date: data.date?.toDate?.()?.toISOString() ?? data.date,
            createdAt: data.createdAt?.toDate?.()?.toISOString() ?? data.createdAt,
            updatedAt: data.updatedAt?.toDate?.()?.toISOString() ?? data.updatedAt,
        } as Event;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get event ${id}: ${errorMessage}`);
    }
};

/**
 * Updates an existing event by ID.
 * @param {string} id - The event ID.
 * @param {Partial<Event>} eventData - Updated event data.
 * @returns {Promise<void>}
 * @throws {Error} Throws an error if update fails.
 */
export const updateEvent = async (id: string, eventData: Partial<Event>): Promise<void> => {
    try {
        await firestoreRepository.updateDocument<Event>(EVENTS_COLLECTION, id, eventData);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update event ${id}: ${errorMessage}`);
    }
};

/**
 * Deletes an event by ID.
 * @param {string} id - The event ID.
 * @returns {Promise<void>}
 * @throws {Error} Throws an error if deletion fails.
 */
export const deleteEvent = async (id: string): Promise<void> => {
    try {
        await firestoreRepository.deleteDocument(EVENTS_COLLECTION, id);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete event ${id}: ${errorMessage}`);
    }
};

/**
 * Generates a sequential event ID like evt_000001.
 * @returns {Promise<string>} - Generated event ID.
 */
const generateEventId = async (): Promise<string> => {
    const snapshot = await firestoreRepository.getDocuments(EVENTS_COLLECTION);
    const count = snapshot?.size ?? 0;
    return `evt_${String(count + 1).padStart(6, "0")}`;
};