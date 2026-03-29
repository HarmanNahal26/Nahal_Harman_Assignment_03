import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Events API Documentation",
      version: "1.0.0",
      description: "This is the API documentation for the events.",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      // ✅ ADD THIS PART (VERY IMPORTANT)
      schemas: {
        CreateEvent: {
          type: "object",
          properties: {
            title: { type: "string" },
            date: { type: "string" },
            location: { type: "string" },
          },
        },
        UpdateEvent: {
          type: "object",
          properties: {
            title: { type: "string" },
            date: { type: "string" },
            location: { type: "string" },
          },
        },
        EventResponse: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            date: { type: "string" },
            location: { type: "string" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validation/*.ts"],
};

// Generate the Swagger spec
export const generateSwaggerSpec = (): object => {
  return swaggerJsdoc(swaggerOptions);
};