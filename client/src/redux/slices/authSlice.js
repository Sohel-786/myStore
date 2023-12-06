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
      loading: "Wait! Creating your account",
      success: "Congratulations, Your Account Got Created",
      error: "Failed to create your account",
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
      });
  },
});

export default authSlice.reducer;
