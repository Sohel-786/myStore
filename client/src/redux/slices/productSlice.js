import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products : []
}

export const addProduct = createAsyncThunk('/product/add' ,(data) => {
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