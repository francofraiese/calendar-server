import jwt from "jsonwebtoken";
import configuration from "../config";

const { secret, expiresIn } = configuration().jwt;

if (!secret || !expiresIn) {
  throw new Error("JWT config isn't defined in environment");
}

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, secret, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
