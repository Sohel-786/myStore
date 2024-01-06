export const createOrder = async (req, res, next) => {
  const { orderItems, address, totalPrice } = req.body;

  if (!orderItems || !address || !totalPrice) {
    return next(new AppError("All Fileds are required", 400));
  }

  const userCheck = await User.findById(req.user.id);
  if (!userCheck) {
    return next(new AppError("Unauthenticated, please login", 400));
  }
};

export const getAllOrders = async (req, res, next) => {};

export const orderDetails = async (req, res, next) => {};
