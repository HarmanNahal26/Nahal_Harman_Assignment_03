import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { HTTP_STATUS } from "../../../constants/httpConstants";

interface RequestSchemas {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
}

interface ValidationOptions {
    stripBody?: boolean;
    stripQuery?: boolean;
    stripParams?: boolean;
}

/**
 * Creates an Express middleware function that validates different parts of the request
 * against separate Joi schemas and strips unknown fields appropriately.
 *
 * @param schemas - Object containing separate schemas for body, params, and query
 * @param options - Validation options for stripping behavior
 * @returns Express middleware function that performs the validation
 */
export const validateRequest = (
    schemas: RequestSchemas,
    options: ValidationOptions = {}
): ((req: Request, res: Response, next: NextFunction) => void) => {
    // stripParams - Usually don't strip params as they're route-defined
    const defaultOptions: ValidationOptions = {
        stripBody: true,
        stripQuery: true,
        stripParams: false,
        ...options,
    };

     return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const errors: string[] = [];

            /**
             * Validates a specific part of the request (body, params, or query) against a Joi schema.
             * Collects validation errors and optionally strips unknown fields from the data.
             */
            const validatePart = (
                schema: ObjectSchema,
                 data: Record<string, unknown>,
                partName: string,
                shouldStrip: boolean
            ): Record<string, unknown> => {
                const { error, value } = schema.validate(data, {
                    abortEarly: false,
                    stripUnknown: shouldStrip,
                });

                if (error) {
                    errors.push(
                        ...error.details.map(
                            (detail) => detail.message
                        )
                    );
                } else if (shouldStrip) {
                    return value;
                }
                return data;
            };

            // Validate each request part if schema is provided
            if (schemas.body) {
                req.body = validatePart(
                    schemas.body,
                    req.body,
                    "Body",
                    defaultOptions.stripBody ?? true
                );
            }

            if (schemas.params) {
                req.params = validatePart(
                    schemas.params,
                    req.params,
                    "Params",
                                    defaultOptions.stripParams ?? false
                ) as Record<string, string>;
            }

            if (schemas.query) {
                req.query = validatePart(
                    schemas.query,
                    req.query,
                    "Query",
                    defaultOptions.stripQuery ?? true
                ) as Record<string, string>;
                    
                
            }

            // If there are any validation errors, return them
            if (errors.length > 0) {
               res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message: `Validation error: ${errors.join(", ")}`,
                });
                return;
            }

            next();
        } catch (error: unknown) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: (error as Error).message,
            });
        }
    };
};