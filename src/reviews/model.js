import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reviewsSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
      },
      comment: {
        type: String,
        required: true,
      },
      rate: {
        type: Number,
        required: true,
      },
     
    },
    {
        timestamps: true, // this option automatically handles the createdAt and updatedAt fields
      }
    )

const Review = model("Review", reviewsSchema);

export default Review;
