import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  Allproducts: null
};

export const addProduct = createAsyncThunk("/product/add", async (data) => {
  try {
    const res = axiosInstance.post("/product/", data);
    toast.promise(res, {
      pending: "Wait, Adding New Product",
      success: "Done",
      error: "Something Went Wrong",
    });

    return await res;
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
});

export const getOneProduct = createAsyncThunk("/product/getOneProduct", async (id) => {
  try {
    const res = await axiosInstance.get(`/product/${id}`);
    return res;
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
});

export const updateProduct = createAsyncThunk(
  "/product/update",
  async (data) => {
    try {
      const res = axiosInstance.put(`/product/${data.id}`, data.data);
      toast.promise(res, {
        pending: "Wait, Updating Product",
        success: res?.data?.message,
        error: "Something Went Wrong",
      });

      return await res;
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "/product/getAllProducts",
  async () => {
    try {
      const res = await axiosInstance.get("/product/");
      return res;
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      if (action.payload) {
        state.Allproducts = action?.payload?.data?.products;
      }
    });
  },
});

export default productSlice.reducer;
