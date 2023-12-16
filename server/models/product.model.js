import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
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
    brand: {
      type: String,
      required: ["true", "You Should Specify the Product Brand."],
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
    availableSizes: {
      type: Array,
      required: ["true", "You must provide the correct size of the product."],
    },
    sale: {
      type: String,
      enum: ["NO", "YES"],
      default: "NO",
    },
    category: {
      type: String,
      enum: ["men", "women", "kids"],
      required: ["true", "You should specify the category of product."],
      trim: true,
      lowercase: true,
    },
    pricedrop: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product = model("product", productSchema);

export default Product;
