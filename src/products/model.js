import mongoose from "mongoose";
let { Schema, model } = mongoose;
import Review from '../reviews/model.js'

let productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
},
{
    timestamps: true, // this option automatically handles the createdAt and updatedAt fields
});

productSchema.static("findProductsWithReviews", async function (query) {
    const total = await this.countDocuments(query.criteria)
  
    const products = await this.find(query.criteria, query.options.fields)
      .skip(query.options.skip)
      .limit(query.options.limit)
      .sort(query.options.sort)
      .populate({
        path: "reviews",
        select: "comment rate",
      })
  
    return { total, products }
  })



    export default model("Product", productSchema); //  this model is now automatically linked to the "Blogposts" collection, if it's not there it will be created
