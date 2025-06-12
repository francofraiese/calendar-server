import { Router } from "express";
import { register, login } from "@controllers/auth.controller";
import { validateDTO } from "@middlewares/validate-dto.middleware";
import { RegisterDto } from "@dtos/auth";
import { LoginDto } from "@dtos/auth/login.dto";

const router = Router();

router.post("/register", validateDTO(RegisterDto), register);
router.post("/login", validateDTO(LoginDto), login);

export default router;
