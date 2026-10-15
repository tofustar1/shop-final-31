import express from "express";
import Category from "../models/Category";
import auth from "../middlewares/auth";
import permit from "../middlewares/permit";

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch {
    res.sendStatus(500);
  }
});

categoriesRouter.post('/', auth, permit('admin'), async (req, res) => {
  const categoryData = {
      title: req.body.title,
      description: req.body.description,
    }

    const category = new Category(categoryData);

    try {
      await category.save();
      res.send(category);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).send({message: e.message});
      }
      res.sendStatus(500);
    }
});

export default categoriesRouter;