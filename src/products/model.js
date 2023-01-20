import mongoose from "mongoose";
const { Schema, model } = mongoose;
import Review from '../reviews/model.js'

const productSchema = new Schema({
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

const Product = model("Product", productSchema);

// Example of using populate() to reference the reviews in the products model
Product.find().populate("reviews").exec((err, products) => {
    if (err) {
        console.error(err);
    } else {
        console.log(products);
    }
});





    export default model("Product", productSchema); //  this model is now automatically linked to the "Blogposts" collection, if it's not there it will be created
