import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

const initialState = {
    products : []
}

export const addProduct = createAsyncThunk('/product/add' ,(data) => {
    try {
        const res = axiosInstance.post('/product/', data);
        toast.promise(res, {
            pending : 'Wait, Adding New Product',
            success : 'Done',
            error: 'Something Went Wrong'
        })
    } catch (e) {
        toast.error(e?.response?.data?.message);
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
