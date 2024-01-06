import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        qty: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        currentPrice: {
          type: String,
          required: true,
        },
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postal: { type: String, required: true },
      country: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true },
    isProcessing: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);
