import { isValidPhoneNumber } from "../helpers/RegexMatcher.js";
import Order from "../models/order.model.js";
import AppError from "../utils/appError.js";

export const createOrder = async (req, res, next) => {
  try {
    const { orderItems, address, totalPrice } = req.body;

    if (!orderItems || !address || !totalPrice) {
      return next(new AppError("All Fileds are required", 400));
    }

    if (!isValidPhoneNumber(address.phone)) {
      return next(new AppError("Provide a valid phone number", 400));
    }

    const userCheck = await User.findById(req.user.id);
    if (!userCheck) {
      return next(new AppError("Unauthenticated, please login", 400));
    }

    const order = await Order.create({
      user: req.user.id,
      orderItems,
      shippingAddress: address,
      totalPrice,
      isPaid: false,
      isProcessing: true,
    });

    if (!order) {
      return next(new AppError("Something Went Wrong, order creation failed"));
    }

    return res.status(200).json({
      success: true,
      message: "Order Created Successfully",
      order,
    });
  } catch (e) {
    return next(new AppError("Something went wrong, please try again", 500));
  }
};

export const getAllOrders = async (req, res, next) => {};

export const orderDetails = async (req, res, next) => {};
