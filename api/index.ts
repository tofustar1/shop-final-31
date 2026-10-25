import express from "express";
import cors from "cors";
import productsRouter from "./routers/products";
import mongoose from "mongoose";
import config from "./config";
import categoriesRouter from "./routers/categories";
import usersRouter from "./routers/users";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(config.port, () => {
    console.log("Listening on port " + config.port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
}

run().catch(e => console.error(e));

