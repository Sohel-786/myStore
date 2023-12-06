import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : false,
    role: "",
    data : {}
}

export const getUserDetails = createAsyncThunk("/auth/user",async () => {
    try{
        
    } catch(e){

    }
})

const authSlice = createSlice({
    name : 'auth',
    reducers : {},
    initialState
});

export default authSlice.reducer;
