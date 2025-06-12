import { Request, Response } from "express";
import { Session, User } from "@database/entities";
import { database } from "@database/db";
import { comparePasswords, hashPassword } from "@utils/bcrypt";
import { generateToken } from "@utils/jwt";
import { isValidTimezone } from "@utils/timezone";

const userRepo = database.getRepository(User);
const sessionRepo = database.getRepository(Session);

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, timezone } = req.body;

    const emailInUse = await userRepo.findOneBy({ email });

    if (emailInUse) {
      res.status(400).json({ message: "Email already in use." });
      return;
    }

    const validTimezone = isValidTimezone(timezone);

    if (!validTimezone) {
      res.status(400).json({ message: "Timezone not valid." });
      return;
    }

    const hashed = await hashPassword(password);

    const user = userRepo.create({
      email,
      password: hashed,
      user_timezone: timezone,
    });

    await userRepo.save(user);

    res.status(201).json({ message: "User successfully registered." });
  } catch (e) {
    const err = e as Error;
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await userRepo.findOneBy({ email });
  if (!user) {
    res.status(401).json({ message: "Credenciales inválidas" });
    return;
  }

  const valid = await comparePasswords(password, user.password);
  if (!valid) {
    res.status(401).json({ message: "Credenciales inválidas" });
    return;
  }

  const token = generateToken(user.id);

  await sessionRepo.update({ user, is_expired: false }, { is_expired: true });

  const session = sessionRepo.create({
    token,
    user,
    is_expired: false,
  });

  await sessionRepo.save(session);

  res.json({ token });
};
