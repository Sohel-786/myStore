import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: ["true", "Product Name is Required"],
    minLength: [5, "Product Name must be at least 5 characters"],
    maxLength: [50, "Product Name must be less than 50 charcters"],
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: ["true", "You Should Describe the Product you are adding."],
    minLength: [10, "Product Description Should be long."],
    trim: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: ["true", "The product must have price."],
  },
  deliveryInfo: {
    type: String,
    required: ["true", "You should describe the cost of delivery."],
    trim: true,
    lowercase: true,
  },
  availableSizes: {},
});

// name: "",
//           description: "",
//           category: "",
//           price: "",
//           deliveryInfo: "",
//           availableSizes: [],
//           sale: "no",
//           pricedrop: 0,
//           thumbnail: null,
