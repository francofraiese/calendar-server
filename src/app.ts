import express, { Request, Response } from "express";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.send("API funcionando");
});

export default app;
