import express from "express";
import morgan from "morgan";

import applicationConfig from "../config";
import urlsRouter from "./routes/index";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const port = applicationConfig.port;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", urlsRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
