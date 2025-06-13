import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const HOST = process.env.HOST || "http://localhost";
const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Calendario - PONCE",
      version: "1.0.0",
      description:
        "Documentación de los endpoint de la API creada para realizar un calendario web para la prueba técnica de Ponce.",
    },
    servers: [
      {
        url: `${HOST}:${PORT}`,
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
      schemas: {
        LoginDto: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "usuario@ejemplo.com",
            },
            password: {
              type: "string",
              example: "Password123",
            },
          },
        },
        RegisterDto: {
          type: "object",
          required: ["email", "password", "timezone"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "usuario@ejemplo.com",
            },
            password: {
              type: "string",
              example: "Password123",
            },
            timezone: {
              type: "string",
              example: "America/Argentina/Buenos_Aires",
            },
          },
        },
        CreateEventDto: {
          type: "object",
          required: ["eventDate", "endDate", "name"],
          properties: {
            description: {
              type: "string",
              example: "Reunión con equipo de desarrollo",
            },
            eventDate: {
              type: "string",
              format: "date-time",
              example: "2025-06-15T14:00:00Z",
            },
            endDate: {
              type: "string",
              format: "date-time",
              example: "2025-06-15T15:00:00Z",
            },
            name: {
              type: "string",
              example: "Sprint Review",
            },
          },
        },
        UpdateEventDto: {
          type: "object",
          properties: {
            description: {
              type: "string",
              example: "Actualización de evento",
            },
            eventDate: {
              type: "string",
              format: "date-time",
              example: "2025-06-16T14:00:00Z",
            },
            endDate: {
              type: "string",
              format: "date-time",
              example: "2025-06-16T15:00:00Z",
            },
            name: {
              type: "string",
              example: "Reunión ajustada",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
