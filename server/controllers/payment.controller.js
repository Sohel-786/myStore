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

  function handleName(name){
    let temp = name.split(" ");
    temp = temp.map((el) => {
        return (el[0].toUpperCase()+ el.slice(1))
    })

    let str = temp.join(" ");
    return str;
  }

  const lineItems = products.map((el) => {
    return {
      price_data: {
        currency: 'INR',
        product_data: {
          name: handleName(el.product.name),
          images: [el.product.thumbnail.secure_url],
        },
        unit_amount:
          Math.floor(
            el.product.price - (el.product.pricedrop / 100) * el.product.price
          ) * 100,
      },
      quantity: el.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/success`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
  });

  return res.status(200).json({
    success: true,
    session_id: session.id,
  });
};
