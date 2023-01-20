import express from "express";
import productsModel from "./model.js";

const productsRouter = express.Router();

// Create product
productsRouter.post("/", async (req, res) => {
  try {
    const product = new productsModel(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all products
productsRouter.get("/", async (req, res) => {
  try {
    const products = await productsModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one product
productsRouter.get("/:id", async (req, res) => {
  try {
    const product = await productsModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update product
productsRouter.put("/:id", async (req, res) => {
  try {
    const product = await productsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete product
productsRouter.delete("/:id", async (req, res) => {
  try {
    const product = await productsModel.findByIdAndRemove(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default productsRouter;
