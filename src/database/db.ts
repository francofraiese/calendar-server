import { DataSource } from "typeorm";
import { User } from "./entities/User.entity";
import { Session } from "./entities/Session.entity";
import { Event } from "./entities/Event.entity";
import "reflect-metadata";
import * as dotenv from "dotenv";

dotenv.config();

export const database = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Session, Event],
  migrations: ["src/database/migrations/*.ts"],
});
