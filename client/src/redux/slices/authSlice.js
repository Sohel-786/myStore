import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  isLoggedIn: false,
  role: "",
  data: {},
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
