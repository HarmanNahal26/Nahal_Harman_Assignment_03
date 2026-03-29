import { Router, Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Represents the response structure for a health check endpoint
 */
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

const router: Router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Check API health status
 *     tags: [Health]
 *     responses:
 *       '200':
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 uptime:
 *                   type: number
 *                   example: 123.45
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-15T10:30:00Z"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 */

router.get("/health", (req: Request, res: Response) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    };

    res.status(HTTP_STATUS.OK).json(healthData);
});

export default router;