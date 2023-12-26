import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  Allproducts: [],
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
export const updateProduct = createAsyncThunk(
  "/product/update",
  async (data) => {
    try {
      console.log(data.id, typeof data.id);
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

export const addToBag = createAsyncThunk("/product/addToBag", async (id) => {
  try {
    let res = axiosInstance.post(`/user/bag/${id}`);
    toast.promise(
      res,
      {
        pending: "Wait!, Adding product to the bag",
        success: "Product Added To The Bag!",
        error: "Something Went Wrong",
      },
      {
        hideProgressBar: true,
        autoClose: 2000,
        theme: "dark",
      }
    );

    return await res;
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
});

export const removeFromBag = createAsyncThunk("/product/removeFromBag", async (id) => {
  try {
    let res = axiosInstance.delete(`/user/bag/${id}`);
    toast.promise(
      res,
      {
        pending: "Wait!, Removing product from the bag",
        success: "Product Removed",
        error: "Something Went Wrong",
      },
      {
        hideProgressBar: true,
        autoClose: 2000,
        theme: "dark",
      }
    );

    return await res;
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
});

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
