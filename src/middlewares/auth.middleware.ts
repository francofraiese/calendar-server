import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@utils/jwt";
import { database } from "@database/db";
import { Session } from "@database/entities";

const sessionRepo = database.getRepository(Session);

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token no proporcionado" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const { userId } = verifyToken(token);

    const session = await sessionRepo.findOneBy({ token });

    if (!session || session.is_expired) {
      res.status(401).json({ message: "Expired or invalid token" });
      return;
    }

    req.user = userId;
    next();
  } catch (err) {
    await sessionRepo.update({ token }, { is_expired: true });
    res.status(401).json({ message: "Expired or invalid token" });
  }
};
