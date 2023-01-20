import express from "express";
import productsModel from "./model.js";
import Product from "./model.js";
import q2m from "query-to-mongo";

let productsRouter = express.Router();


async function findProductById(req, res, next) {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.product = product;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

// Create product
productsRouter.post("/", async (req, res) => {
  try {
    let product = new productsModel(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


productsRouter.get("/", async (req, res) => {
    try {
        let query = {};
        if (req.query.category) {
            query.category = req.query.category;
        }
        if (req.query.price) {
            query.price = { $lt: req.query.price };
        }

        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const total = await productsModel.countDocuments(query);
        const products = await productsModel.find(query).skip((page - 1) * limit).limit(limit).populate('reviews_id')
        res.send({
          total,
          totalPages: Math.ceil(total / limit),
          products,
        })
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});


  

// Get one product with its reviews
productsRouter.get("/:id", async (req, res) => {
    try {
      let product = await Product.findById(req.params.id).populate('reviews_id')
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Update product
productsRouter.put("/:id", findProductById, async (req, res) => {
    if (req.body.reviews != null) {
      res.product.reviews.push(req.body.reviews);
    }
    try {
      let updatedProduct = await res.product.save();
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  
  

// Delete product
productsRouter.delete("/:id", async (req, res) => {
  try {
    let product = await productsModel.findByIdAndRemove(req.params.id);
    if (!Product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default productsRouter;
