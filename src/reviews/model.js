import mongoose from "mongoose";
const { Schema, model } = mongoose;

let reviewSchema = new Schema({
  comment: { type: String, required: true },
  rate: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
}, {
  timestamps: true,
});


let Review = model("Review", reviewSchema);

export default Review;
