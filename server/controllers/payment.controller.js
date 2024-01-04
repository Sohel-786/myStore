import User from "../models/user.model.js";
import { stripe } from "../server.js";
import AppError from "../utils/appError.js";

export const createCheckoutSession = async (req, res, next) => {
  const { products } = req.body;

  if (!products) {
    return next(new AppError("The Products data is not provided", 400));
  }

  const userCheck = await User.findById(req.user.id);
  if (!userCheck) {
    return next(new AppError("Unauthenticated, please login", 400));
  }

  const lineItems = products.map((el) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: el.product.name,
          images: [el.product.thumbnail.secure_url],
        },
        unit_amount: Math.floor(
          el.product.price - (el.product.pricedrop / 100) * el.product.price
        ) * 100,
      },
      quantity : el.quantity
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/success`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
  });

  return  res.status(200).json({
    success : true,
    session_id : session.id
  })
};
