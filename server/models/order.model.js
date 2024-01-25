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
        quantity: {
          type: Number,
          required: true,
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        product: {
          type: Object,
          required: true,
        },
        size : {
          type : String,
          required :true
        }
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postal: { type: String, required: true },
      country: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true },
    isProcessing: { type: Boolean, required: true },
    expireAt: {
      type: Date,
      default: Date.now() + 30 * 60 *  1000,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("order", orderSchema);

export default Order;
