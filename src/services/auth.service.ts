import { Session, User } from "@database/entities";
import { database } from "@database/db";
import { comparePasswords, hashPassword } from "@utils/bcrypt";
import { generateToken } from "@utils/jwt";
import { isValidTimezone } from "@utils/timezone";
import { RegisterDto } from "@dtos/auth";
import { LoginDto } from "@dtos/auth/login.dto";

const userRepo = database.getRepository(User);
const sessionRepo = database.getRepository(Session);

export const register = async ({ email, password, timezone }: RegisterDto) => {
  const emailInUse = await userRepo.findOneBy({ email });

  if (emailInUse) {
    throw new Error("Email already in use.");
  }

  if (!isValidTimezone(timezone)) {
    throw new Error("Timezone not valid.");
  }

  const hashed = await hashPassword(password);

  const user = userRepo.create({
    email,
    password: hashed,
    user_timezone: timezone,
  });

  await userRepo.save(user);

  return { message: "User successfully registered." };
};

export const login = async ({ email, password }: LoginDto) => {
  const user = await userRepo.findOneBy({ email });
  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const valid = await comparePasswords(password, user.password);
  if (!valid) {
    throw new Error("Credenciales inválidas");
  }

  const token = generateToken(user.id);

  await sessionRepo.update({ user, is_expired: false }, { is_expired: true });

  const session = sessionRepo.create({
    token,
    user,
    is_expired: false,
  });

  await sessionRepo.save(session);

  return { token };
};
