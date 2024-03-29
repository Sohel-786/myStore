import { config } from "dotenv";
config();
import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import morgon from "morgan";
import errMiddleware from "./middlewares/error.middleware.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import router from "./routes/miscellaneous.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

app.use(express.json());
app.use(morgon("dev"));

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, 'https://shaikhsohel.netlify.app'],
    credentials: true,
    exposedHeaders : ["set-cookie"],
  })
);

app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/country-data", router);
app.use("/payment", paymentRoutes);
app.use("/order", orderRoutes);

app.use("/ping", (req, res) => {
  res.send("Pong");
});

app.all("*", (req, res) => {
  res
    .status(404)
    .send(
      '<h1 style=" width:100%; text-align:center;">OOPS!! 404 page not found</h1>'
    );
});

app.use(errMiddleware);

export default app;
