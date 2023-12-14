import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products : []
}

const product = createSlice({
    name : 'products',
    reducers: {},
    initialState
})