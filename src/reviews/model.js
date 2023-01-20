import mongoose from "mongoose";
const { Schema, model } = mongoose;

let reviewsSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true, // this option automatically handles the createdAt and updatedAt fields
  }
);

let Review = model("Review", reviewsSchema);

export default Review;
