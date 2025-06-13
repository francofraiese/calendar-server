import { Router } from "express";
import authRouter from "./auth.routes";
import eventRouter from "./event.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/event", eventRouter);

export default router;
