import { isValidPhoneNumber } from "../helpers/RegexMatcher.js";
import Order from "../models/order.model.js";

export const createOrder = async (req, res, next) => {
  const { orderItems, address, totalPrice } = req.body;

  if (!orderItems || !address || !totalPrice) {
    return next(new AppError("All Fileds are required", 400));
  }

  if(!isValidPhoneNumber(address.phone)){
    return next(new AppError("Provide a valid phone number", 400));
  }

  const userCheck = await User.findById(req.user.id);
  if (!userCheck) {
    return next(new AppError("Unauthenticated, please login", 400));
  }

  const order = await Order.create({
    user : req.user.id,
    orderItems,
    shippingAddress : address,
    totalPrice,
    isPaid : false,
    
  })
};

export const getAllOrders = async (req, res, next) => {};

export const orderDetails = async (req, res, next) => {};
