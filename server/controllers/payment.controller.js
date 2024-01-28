import { isValidPhoneNumber } from "../helpers/RegexMatcher.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import { stripe } from "../server.js";
import AppError from "../utils/appError.js";

export const createCheckoutSession = async (req, res, next) => {
  let { products, address, name, phone } = req.body;

  address = JSON.parse(address);
  if (!products || !address || !name || !phone) {
    return next(new AppError("All Fileds are required", 400));
  }

  if (!isValidPhoneNumber(phone)) {
    return next(new AppError("Provide a valid phone number", 400));
  }

  const userCheck = await User.findById(req.user.id);
  if (!userCheck) {
    return next(new AppError("Unauthenticated, please login", 400));
  }

  function handleTotal(arr) {
    let temp = 0;
    arr.forEach((el) => {
      temp += el.price;
    });

    return temp;
  }

  const order = await Order.create({
    user: req.user.id,
    orderItems: products,
    shippingAddress: { ...address, name, phone },
    totalPrice: handleTotal(products),
    isPaid: false,
    isProcessing: true,
    expireAt : new Date(Date.now() + 30 * 60 * 1000)
  });

  if (!order) {
    return next(new AppError("Something Went Wrong, order creation failed"));
  }

  function handleName(name) {
    let temp = name.split(" ");
    temp = temp.map((el) => {
      return el[0].toUpperCase() + el.slice(1);
    });

    let str = temp.join(" ");
    return str;
  }

  const lineItems = products.map((el) => {
    return {
      price_data: {
        currency: "inr",
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
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/checkout/${order._id}?success=true`,
    cancel_url: `${process.env.FRONTEND_URL}/checkout/${order._id}?success=false`,
    expires_at: new Date(Date.now() + 30 * 60 * 1000),
  });

  return res.status(200).json({
    success: true,
    session_id: session.id,
  });
};
