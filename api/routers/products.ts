import express from "express";
import {ProductWithoutId} from "../types";
import {imagesUpload} from "../multer";
import Product from "../models/Product";
import auth from "../middlewares/auth";
import permit from "../middlewares/permit";

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'title description');

    res.send(products);
  } catch {
    res.sendStatus(500);
  }
});

productsRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({error: 'Product not found!'});
    }

    res.send(product);
  } catch {
    res.sendStatus(500);
  }

});

productsRouter.post('/', auth, permit('admin'), imagesUpload.single('image'), async (req, res) => {
  const { title, price, description, category } = req.body;

  if (!title || !price || !category) {
    return res.status(400).send({error: "Title, price and category are required!"});
  }

  const newProduct: ProductWithoutId = {
    title,
    category,
    price: parseInt(price),
    description,
    image: req.file ? req.file.filename : null,
  };

  try {
    const product = new Product(newProduct);
    await product.save();
    res.send(product);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send({message: e.message});
    }
    res.sendStatus(500);
  }
});

export default productsRouter;