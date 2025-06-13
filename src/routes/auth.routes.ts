import { Router } from "express";
import { register, login } from "@controllers/auth.controller";
import { validateDTO } from "@middlewares/validate-dto.middleware";
import { RegisterDto } from "@dtos/auth";
import { LoginDto } from "@dtos/auth/login.dto";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDto'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/register", validateDTO(RegisterDto), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: Login exitoso, se retorna el token
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", validateDTO(LoginDto), login);

export default router;
