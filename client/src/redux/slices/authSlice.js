import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  isLoggedIn: false,
  role: "",
  data: {},
  networkRequest: false,
  bag: [],
  wishList: [],
};

export const checkIsLoggedIn = createAsyncThunk("/auth/user", async () => {
  try {
    const res = await axiosInstance.get("/user/me");
    return res;
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
});

export const createUser = createAsyncThunk("/auth/create", async (data) => {
  try {
    const res = axiosInstance.post("/user/register", data);
    toast.promise(res, {
      pending: "Wait! Creating your account",
      success: "Congratulations, Your Account Got Created",
      error: "Failed to create your account",
    });
    return await res;
  } catch (err) {
    toast.error(err?.response?.data?.message);
  }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("/user/login", data);
    toast.promise(res, {
      pending: "Wait! Logging on to your account",
      success: "Done",
      error: "Failed to Login",
    });
    return await res;
  } catch (err) {
    toast.error(err?.response?.data?.message);
  }
});

export const getUserDetails = createAsyncThunk(
  "/auth/getUserDetails",
  async () => {
    try {
      const res = await axiosInstance.get("/user/me");
      return res;
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "/auth/update-user",
  async (data) => {
    try {
      const res = axiosInstance.put("/user/update", data);
      toast.promise(
        res,
        {
          pending: "Wait, Updating Your Profile",
          success: "Profile Updated",
          error: "Something Went Wrong",
        },
        {
          theme: "dark",
          autoClose: 1000,
          hideProgressBar: true,
        }
      );

      return await res;
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  }
);

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.get("/user/logout");
    toast.promise(res, {
      pending: "Wait! Logging out",
      success: "Done",
      error: "Failed to Logout",
    });
    return await res;
  } catch (err) {
    toast.error(err?.response?.data?.message);
  }
});

export const addAddress = createAsyncThunk("/add/address", async (data) => {
  try {
    const res = axiosInstance.post("/user/address", data);
    toast.promise(res, {
      pending: "Wait, Adding your address",
      success: "Address Added Successfully",
      error: "Something Went Wrong",
    });
    return await res;
  } catch (err) {
    toast.error(err?.response?.data?.message);
  }
});

export const updateAddress = createAsyncThunk(
  "/update/address",
  async (data) => {
    try {
      const res = axiosInstance.put("/user/address", data);
      toast.promise(
        res,
        {
          pending: "Wait, Updating Address",
          success: "Address Updated Successfully",
          error: "Something Went Wrong",
        },
        {
          theme: "dark",
        }
      );
      return await res;
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  }
);

export const deleteAddress = createAsyncThunk("/delete/address", async (id) => {
  try {
    const res = axiosInstance.delete(`/user/delete-address/${id}`);
    toast.promise(
      res,
      {
        pending: "Wait, Deleting Address",
        success: "Address Deleted Successfully",
        error: "Something Went Wrong",
      },
      {
        theme: "dark",
        hideProgressBar: true,
      }
    );
    return await res;
  } catch (err) {
    toast.error(err?.response?.data?.message);
  }
});

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

export const removeFromBag = createAsyncThunk(
  "/product/removeFromBag",
  async (id) => {
    try {
      let res = axiosInstance.delete(`/user/bag/${id}`);
      toast.promise(
        res,
        {
          pending: "Wait!, Removing product from the bag",
          success: "Product Removed From Bag",
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
  }
);

export const emptyBag = createAsyncThunk("/product/emptyBag", async (id) => {
  try {
    let res = await axiosInstance.put(`/user/emptyBag`);
    return res;
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
});

export const addToWishlist = createAsyncThunk(
  "/product/addToWishlist",
  async (id) => {
    try {
      let res = axiosInstance.post(`/user/wishlist/${id}`);
      toast.promise(
        res,
        {
          pending: "Wait!, Adding product to the Wishlist",
          success: "Product Added To The Wishlist!",
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
  }
);

export const removeFromWishlist = createAsyncThunk(
  "/product/removeFromWishlist",
  async (id) => {
    try {
      let res = axiosInstance.delete(`/user/wishlist/${id}`);
      toast.promise(
        res,
        {
          pending: "Wait!, Removing product from the Wishlist",
          success: "Product Removed From Wishlist",
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
  }
);

const authSlice = createSlice({
  name: "auth",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(checkIsLoggedIn.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoggedIn = true;
          state.role = action?.payload?.data?.user?.role;
          state.data = action?.payload?.data?.user;
          state.bag = action?.payload?.data?.user?.cartItems;
          state.wishList = action?.payload?.data?.user?.wishlist;
        }
        state.networkRequest = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoggedIn = true;
          state.role = action?.payload?.data?.user?.role;
          state.data = action?.payload?.data?.user;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoggedIn = true;
          state.role = action?.payload?.data?.user?.role;
          state.data = action?.payload?.data?.user;
        }
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action?.payload?.data?.user;
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoggedIn = false;
          state.role = "";
          state.data = {};
        }
      })
      .addCase(addToBag.fulfilled, (state, action) => {
        if (action.payload) {
          state.bag = action?.payload?.data?.bag;
        }
      })
      .addCase(removeFromBag.fulfilled, (state, action) => {
        if (action.payload) {
          state.bag = action?.payload?.data?.bag;
        }
      })
      .addCase(emptyBag.fulfilled, (state, action) => {
        if (action.payload) {
          state.bag = action?.payload?.data?.bag;
        }
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        if (action.payload) {
          state.wishList = action?.payload?.data?.wishlist;
        }
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        if (action.payload) {
          state.wishList = action?.payload?.data?.wishlist;
        }
      });
  },
});

export default authSlice.reducer;
