import { Jwt, SignOptions } from "jsonwebtoken";
import * as process from "process";

export default () => ({
  api: {
    port: process.env.PORT,
  },
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    name: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  },
  cors: {
    frontUrl: process.env.FRONTEND_URL,
  },
});
