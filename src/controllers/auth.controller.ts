import { Request, Response } from "express";
import * as authService from "@services/auth.service";

export const register = (req: Request, res: Response) => {
  return authService.register(req, res);
};

export const login = (req: Request, res: Response) => {
  return authService.login(req, res);
};
