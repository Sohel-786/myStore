import { stripe } from "../server";

export const createCheckoutSession = async (req, res, next) => {
  const { products } = req.body;

  if (!products) {
    return next(new AppError("The Products data is not provided", 400));
  }

  const userCheck = await User.findById(req.user.id);
  if (!userCheck) {
    return next(new AppError("Unauthenticated, please login", 400));
  }

  const session = await stripe.checkout.sessions.create({
    
  })
};
