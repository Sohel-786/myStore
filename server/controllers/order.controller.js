import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";

export const confirmOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return next(new AppError("Provide a valid order Id", 400));
    }

    const userCheck = await User.findById(req.user.id);
    if (!userCheck) {
      return next(new AppError("Unauthenticated, please login", 400));
    }

    const order = await Order.findByIdAndUpdate(orderId, {
      $set: { isPaid: true },
      $unset: { expireAt: "" },
    });

    if (!order) {
      return next(new AppError("The Provided orderId Is not valid", 400));
    }

    const orders = await Order.find({ user: req.user.id, isPaid: true }, {expireAt : 0});

    return res.status(200).json({
      success: true,
      message: "Payment Success",
      orders,
    });
  } catch (e) {
    return next(new AppError("Something went wrong, please try again", 500));
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const userCheck = await User.findById(req.user.id);
    if (!userCheck) {
      return next(new AppError("Unauthenticated, please login", 400));
    }

    const orders = await Order.find({ user: req.user.id, isPaid: true }, {expireAt : 0});

    return res.status(200).json({
      success: true,
      message: "Fetched All Orders Successfully",
      orders,
    });
  } catch (e) {
    return next(new AppError("Something went wrong, please try again", 500));
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return next(new AppError("Provide a valid order Id", 400));
    }

    const order = await Order.findOneAndDelete({ _id: orderId, isPaid: false });

    if (!order) {
      return next(new AppError("Something Went Wrong", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Order Deleted Successfully",
    });
  } catch (e) {
    return next(new AppError("Something went wrong, please try again", 500));
  }
};

export const getAllOrdersAdmin = async ( req, res, next ) => {
  try {
    const userCheck = await User.findById(req.user.id);
    if (!userCheck) {
      return next(new AppError("Unauthenticated, please login", 400));
    }

    const orders = await Order.find({isPaid : true});

    return res.status(200).json({
      success: true,
      message: "Fetched All Orders Successfully",
      orders,
    });
  } catch (e) {
    return next(new AppError("Something went wrong, please try again", 500));
  }
}

export const updateOrderStatus = async ( req, res, next ) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return next(new AppError("Provide a valid order Id", 400));
    }

    const userCheck = await User.findById(req.user.id);
    if (!userCheck) {
      return next(new AppError("Unauthenticated, please login", 400));
    }

    const order = await Order.findOneAndUpdate({ _id: orderId, isPaid: true }, {
      $set: { isProcessing: false },
    });

    if(!order){
      return next(new AppError("Something Went Wrong", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Fetched All Orders Successfully"
    });
  } catch (e) {
    return next(new AppError("Something went wrong, please try again", 500));
  }
}