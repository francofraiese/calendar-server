import "reflect-metadata";
import { database } from "./database/db";
import app from "./app";

const start = async () => {
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
