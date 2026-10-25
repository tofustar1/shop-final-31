import mongoose from "mongoose";
import config from "./config";
import Category from "./models/Category";
import Product from "./models/Product";
import User from "./models/User";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('categories');
    await db.dropCollection('products');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collection were not present, skipping drop...');
  }

  const [cpuCategory, ssdCategory] = await Category.create({
    title: "CPUs",
    description: "Central Processor Units",
  }, {
    title: "SSDs",
    description: "Solid State Drives",
  });

  await Product.create({
    title: 'Intel Core i7 12700K',
    price: 350,
    category: cpuCategory._id,
    image: null
  },{
    title: 'Samsung Pro 1TB',
    price: 170,
    category: ssdCategory._id,
    image: null
    }
  );

  await User.create({
    username: 'Admin',
    password: '1234',
    token: crypto.randomUUID(),
    role: 'admin'
  }, {
    username: 'User',
    password: '1234',
    token: crypto.randomUUID(),
    role: 'user'
  });

  console.log('Database successfully seed');
  await db.close();
};

run().catch(console.error);