import { Router } from "express";
import {
  create,
  getById,
  getMonth,
  getWeek,
  softDelete,
  update,
} from "@controllers/event.controller";
import { validateDTO } from "@middlewares/validate-dto.middleware";
import { authMiddleware } from "@middlewares/auth.middleware";
import { CreateEventDto, UpdateEventDto } from "@dtos/event";

const router = Router();
router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Endpoints para la gestión de eventos
 */

/**
 * @swagger
 * /event/:
 *   post:
 *     summary: Crear un nuevo evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventDto'
 *     responses:
 *       201:
 *         description: Evento creado correctamente
 *       400:
 *         description: Error en la petición
 */
router.post("/", validateDTO(CreateEventDto), create);

/**
 * @swagger
 * /event/{id}:
 *   put:
 *     summary: Actualizar un evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEventDto'
 *     responses:
 *       200:
 *         description: Evento actualizado
 *       400:
 *         description: Error en la petición
 */
router.put("/:id", validateDTO(UpdateEventDto), update);

/**
 * @swagger
 * /event/{id}:
 *   delete:
 *     summary: Eliminar (soft delete) un evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Evento eliminado
 *       400:
 *         description: Error en la petición
 */
router.delete("/:id", softDelete);

/**
 * @swagger
 * /event/month:
 *   get:
 *     summary: Obtener eventos por mes
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Mes (1-12). Si no se envía, se toma el mes actual.
 *       - in: query
 *         name: year
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1970
 *         description: Año. Si no se envía, se toma el actual.
 *     responses:
 *       200:
 *         description: Lista de eventos del mes
 *       400:
 *         description: Error en la petición
 */
router.get("/month", getMonth);

/**
 * @swagger
 * /event/week:
 *   get:
 *     summary: Obtener eventos de la semana actual
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de eventos de la semana
 *       400:
 *         description: Error en la petición
 */
router.get("/week", getWeek);

/**
 * @swagger
 * /event/{id}:
 *   get:
 *     summary: Obtener evento por ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Detalles del evento
 *       400:
 *         description: Error en la petición
 */
router.get("/:id", getById);

export default router;
