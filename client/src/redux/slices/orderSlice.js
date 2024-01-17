import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
  orders: [],
};

export const AddOrder = createAsyncThunk("/order/add", async (id) => {
  try {
    const res = await axiosInstance.put(`/order/${id}`);
    console.log(res);
    return res;
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
});

export const deleteOrder = createAsyncThunk("/order/delete", async (id) => {
  try {
    const res = await axiosInstance.delete(`/order/${id}`);
    return res;
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
});

export const getAllOrders = createAsyncThunk("/order/getallOrders", async () => {
  try {
    const res = await axiosInstance.get("/order/getAllOrders");
    return res;
  } catch (e) {
    console.log(e?.response?.data?.message);
  }
});

const orderSlice = createSlice({
  name: "order",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      if (action.payload) {
        state.orders = action?.payload?.data?.orders;
      }
    })
    .addCase(AddOrder.fulfilled, (state, action) => {
      if (action.payload) {
        state.orders = action?.payload?.data?.orders;
      }
    })
  },
});

export default orderSlice.reducer;
