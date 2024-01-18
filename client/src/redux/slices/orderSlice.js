import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
  orders: null,
  adminOrders: null,
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

export const getAllOrders = createAsyncThunk(
  "/order/getallOrders",
  async () => {
    try {
      const res = await axiosInstance.get("/order/getAllOrders");
      return res;
    } catch (e) {
      console.log(e?.response?.data?.message);
    }
  }
);

export const getOrdersforAdmin = createAsyncThunk(
  "/order/getOrdersforAdmin",
  async () => {
    try {
      const res = await axiosInstance.get("/order/getOrdersforAdmin");
      return res;
    } catch (e) {
      console.log(e?.response?.data?.message);
    }
  }
);

export const updateStatusOrder = createAsyncThunk(
  "/order/updateStatusOrder",
  async (id) => {
    try {
      const res = axiosInstance.put(`/order/updateStatusOrder/${id}`);
      toast.promise(res, {
        pending: "Wait! Updating Order Status",
        success: "Done",
        error: "Failed",
      });
      return await res;
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      if (action.payload) {
        state.orders = action?.payload?.data?.orders;
      }
    });
    builder.addCase(getOrdersforAdmin.fulfilled, (state, action) => {
      if (action.payload) {
        state.adminOrders = action?.payload?.data?.orders;
      }
    });
    builder
      .addCase(updateStatusOrder.fulfilled, (state, action) => {
        if (action.payload) {
          state.adminOrders = action?.payload?.data?.orders;
        }
      })
      .addCase(AddOrder.fulfilled, (state, action) => {
        if (action.payload) {
          state.orders = action?.payload?.data?.orders;
        }
      });
  },
});

export default orderSlice.reducer;
