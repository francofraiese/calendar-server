import "reflect-metadata";
import * as dotenv from "dotenv";
import { database } from "./database/db";
import app from "./app";
import { envSchema } from "./config/config-validation";

dotenv.config();

const start = async () => {
  const { error } = envSchema.validate(process.env, { abortEarly: false });

  if (error) {
    console.error("❌ Error en las variables de entorno:");
    error.details.forEach((err: any) => {
      console.error(`- ${err.message}`);
    });
    process.exit(1);
  }

  try {
    await database.initialize();
    await database.runMigrations();

    const HOST = process.env.HOST || "http://localhost";
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en ${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

start();
