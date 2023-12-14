import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
    products : []
}

export const addProduct = createAsyncThunk('/product/add' ,(data) => {
    try {
        const res = axiosInstance.post('/product/', data)
    } catch (e) {
        
    }
})
export const getAllProducts = createAsyncThunk('/product/getAllProducts' ,() => {
    try {
        
    } catch (e) {
        
    }
})

const productSlice = createSlice({
    name : 'products',
    reducers: {},
    initialState
});

export default productSlice.reducer;
