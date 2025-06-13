import { Request, Response } from "express";
import * as authService from "@services/auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, timezone } = req.body;

    const result = await authService.register({ email, password, timezone });

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const result = await authService.login({ email, password });

    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ message: (err as Error).message });
  }
};
