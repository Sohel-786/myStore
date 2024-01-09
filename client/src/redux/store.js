import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products : productReducer,
    orderData : orderReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
