import { eventSchemas } from "../src/api/v1/validation/eventSchemas";

describe("Event Validation Schema", () => {
    it("should fail when name is missing", () => {
        const input: Record<string, unknown> = {
            date: "2026-12-25T09:00:00.000Z",
            capacity: 100,
        };
        const { error } = eventSchemas.create.body.validate(input);
        expect(error).toBeDefined();
        expect(error?.details[0].message).toBe('"name" is required');
    });

    it("should fail when name is less than 3 characters", () => {
        const input: Record<string, unknown> = {
            name: "AB",
            date: "2026-12-25T09:00:00.000Z",
            capacity: 100,
        };
        const { error } = eventSchemas.create.body.validate(input);
        expect(error).toBeDefined();
        expect(error?.details[0].message).toBe(
            '"name" length must be at least 3 characters long'
        );
    });

    it("should fail when capacity is less than 5", () => {
        const input: Record<string, unknown> = {
            name: "Test Event",
            date: "2026-12-25T09:00:00.000Z",
            capacity: 4,
        };
        const { error } = eventSchemas.create.body.validate(input);
        expect(error).toBeDefined();
        expect(error?.details[0].message).toBe(
            '"capacity" must be greater than or equal to 5'
        );
    });

    it("should fail when status is invalid", () => {
        const input: Record<string, unknown> = {
            name: "Test Event",
            date: "2026-12-25T09:00:00.000Z",
            capacity: 100,
            status: "pending",
        };
        const { error } = eventSchemas.create.body.validate(input);
        expect(error).toBeDefined();
        expect(error?.details[0].message).toBe(
            '"status" must be one of [active, cancelled, completed]'
        );
    });

    it("should pass with valid event data and apply defaults", () => {
        const input: Record<string, unknown> = {
            name: "Tech Conference",
            date: "2026-12-25T09:00:00.000Z",
            capacity: 100,
        };
        const { error, value } = eventSchemas.create.body.validate(input);
        expect(error).toBeUndefined();
        expect(value.status).toBe("active");
        expect(value.category).toBe("general");
        expect(value.registrationCount).toBe(0);
    });
});