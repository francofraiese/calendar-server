import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateDTO = (DTO: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(DTO, req.body);
    const errors = await validate(instance);

    if (errors.length > 0) {
      const messages = errors
        .map((err) => Object.values(err.constraints || {}))
        .flat();
      res.status(400).json({ errors: messages });
      return;
    }

    req.body = instance;
    next();
  };
};
