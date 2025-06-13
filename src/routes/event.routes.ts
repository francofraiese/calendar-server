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

router.post("/", validateDTO(CreateEventDto), create);
router.put("/:id", validateDTO(UpdateEventDto), update);
router.delete("/:id", validateDTO(CreateEventDto), softDelete);
router.get("/:id", getById);
router.get("/month", getMonth);
router.get("/week", getWeek);

export default router;
