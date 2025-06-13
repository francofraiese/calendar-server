import express, { Request, Response } from "express";
import router from "./routes";
import { setupSwagger } from "@config/swagger.config";

const app = express();

app.use(express.json());
app.use(router);
setupSwagger(app);

app.get("/", (req: Request, res: Response) => {
  res.send("API funcionando");
});

export default app;
