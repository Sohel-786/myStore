import { isValidPhoneNumber } from "../helpers/RegexMatcher.js";
import Order from "../models/order.model.js";
import AppError from "../utils/appError.js";

export const createOrder = async (req, res, next) => {
  // try {

  //   return res.status(200).json({
  //     success: true,
  //     message: "Order Created Successfully",
  //     order,
  //   });
  // } catch (e) {
  //   return next(new AppError("Something went wrong, please try again", 500));
  // }
};

export const getAllOrders = async (req, res, next) => {};

export const orderDetails = async (req, res, next) => {};
