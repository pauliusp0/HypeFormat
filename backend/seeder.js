import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import btoa from 'btoa';

import Product from './models/product.js';

dotenv.config();

const updateDatabase = async () => {
  let products = [];

  //   getting data from hypeformat
  const hypeformatResponse = await fetch(process.env.HYPEFORMAT_PRODUCTS, {
    method: 'GET',
    headers: {
      Authorization:
        'Basic ' +
        btoa(
          `${process.env.HYPEFORMAT_CONSUMER_KEY}:${process.env.HYPEFORMAT_CONSUMER_SECRET}`
        ),
    },
  });

  const hypeformatProducts = await hypeformatResponse.json();
  hypeformatProducts.forEach((product) => {
    let newProduct = {
      name: product.name,
      image: product.images[0].src,
      price: product.price_html,
      rating: +product.average_rating,
      short_description: product.short_description,
      description: product.description,
      attributes: product.attributes,
    };
    product.categories.forEach((category) => {
      switch (category.id) {
        case 29:
          newProduct.category = 'Canvases';
          break;
        case 30:
          newProduct.category = 'Posters';
          break;
        case 38:
          newProduct.category = 'Stickers';
          break;
      }
    });
    products.push(newProduct);
  });

  // Getting data from per4mmedia
  let PER4MMEDIA;
  let category;
  for (let i = 1; i < 6; i++) {
    if (i === 1) {
      PER4MMEDIA = process.env.PER4MMEDIA_POSTERS;
      category = 'Posters';
    } else if (i === 2) {
      PER4MMEDIA = process.env.PER4MMEDIA_CUPS;
      category = 'Cups';
    } else if (i === 3) {
      PER4MMEDIA = process.env.PER4MMEDIA_CALENDARS;
      category = 'Calendars';
    } else if (i === 4) {
      PER4MMEDIA = process.env.PER4MMEDIA_APPAREL;
      category = 'Apparel';
    } else if (i === 5) {
      PER4MMEDIA = process.env.PER4MMEDIA_STICKERS;
      category = 'Stickers';
    }

    const per4mmediaResponse = await fetch(PER4MMEDIA, {
      method: 'GET',
      headers: {
        Authorization:
          'Basic ' +
          btoa(
            `${process.env.PER4MMEDIA_CONSUMER_KEY}:${process.env.PER4MMEDIA_CONSUMER_SECRET}`
          ),
      },
    });

    const per4mmediaProducts = await per4mmediaResponse.json();

    per4mmediaProducts.forEach((product) => {
      let newProduct = {
        name: product.name,
        image: product.images[0].src,
        price: +product.price + '€',
        rating: +product.average_rating,
        category: category,
        short_description: product.short_description,
        description: product.description,
        attributes: product.attributes,
      };
      products.push(newProduct);
    });
  }

  // updating db
  //   deleting previous data
  const deletedPreviousProducts = await Product.deleteMany();
  // sending new data
  const insertNewProducts = await Product.insertMany(products);
  console.log('DB updated');
};

// Connecting DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log('mongodb connected');
    updateDatabase();
    setInterval(updateDatabase, 600000);
  })
  .catch((err) => console.log(err));
