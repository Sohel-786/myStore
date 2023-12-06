import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : false,
    role: "",
    data : {}
}

const authSlice = createSlice({
    name : 'auth',
    reducers : {},
    initialState
});

export default authSlice.reducer;
