import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import Product from './models/product.js';

const app = express();
dotenv.config();

// -- middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// Connecting DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log('mongodb connected');
  })
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('api is runing');
});

// get all products
app.get('/api/products', (req, res) => {
  Product.find({}).then((data) => res.json(data));
});

// get products by category
app.get('/api/products/:category', (req, res) => {
  let category = req.params.category;
  category = category.substr(0, 1).toUpperCase() + category.slice(1, 20);
  Product.find({ category: category }).then((data) => res.json(data));
});

// get producst by id
app.get('/api/products/id/:id', (req, res) => {
  let id = req.params.id;
  Product.findById(id).then((data) => res.json(data));
});

// starting server
app.listen(PORT, () => console.log(`starting server on port:${PORT}`));
