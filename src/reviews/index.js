import express from "express";
const reviewsRouter = express.Router();
import Review from "./model.js";

async function getReview(req, res, next) {
    try {
      Review = await Review.findById(req.params.id);
      if (Review == null) {
        return res.status(404).json({ message: "Cannot find review" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.review = Review;
    next();
  }

// Create a new review
reviewsRouter.post("/:productId", async (req, res) => {
    try {
    let review = new Review({
    comment: req.body.comment,
    rate: req.body.rate,
    product: req.params.productId
    });
    await review.save();
    res.status(201).json(review);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    });
  

// Get all reviews
reviewsRouter.get("/:id", getReview, (req, res) => {
  res.json(res.review);
});

// Update a review by id
reviewsRouter.put("/:id", getReview, async (req, res) => {
  if (req.body.comment != null) {
    res.review.comment = req.body.comment;
  }
  if (req.body.rate != null) {
    res.review.rate = req.body.rate;
  }
  try {
    let updatedReview = await res.review.save();
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a review by id
reviewsRouter.delete("/:id", getReview, async (req, res) => {
  try {
    await res.review.remove();
    res.json({ message: "Deleted review" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



export default reviewsRouter;
