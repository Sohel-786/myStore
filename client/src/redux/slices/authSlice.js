import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  isLoggedIn: false,
  role: "",
  data: {},
  networkRequest: false,
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
      });
  },
});

export default authSlice.reducer;
