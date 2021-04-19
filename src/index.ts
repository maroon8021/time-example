import express from "express";
import { createConnection } from "typeorm";
import { Index } from "./application-service";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!?");
});

app.get("/products", async (req, res) => {
  await createConnection();
  const products = await Index.getProducts();
  res.send(products);
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
