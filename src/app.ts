import express from "express";

import applicationConfig from "../config";

const app = express();

const port = applicationConfig.port;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
