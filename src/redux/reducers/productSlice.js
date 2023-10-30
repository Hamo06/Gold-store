import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
    "getProduct",
    async (_, thunkApi) => {
        try {
            const response = await axios.get("http://localhost:3001/product/");
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue(e.message);
        }
    }
);

export const postProduct = createAsyncThunk(
    "postProduct",
    async (data, thunkApi) => {
        try {
            const response = await axios.post("http://localhost:3001/product", data);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue(e.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "deleteProduct",
    async (id, thunkApi) => {
        try {
            const response = await axios.delete(
                `http://localhost:3001/product/${id}`
            );
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue(e.message);
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState: {
        product: [],
        src: "",
        searchProduct: ""
    },

    reducers: {
        pushImageProduct: (state, action) => {
            state.src = action.payload;
        },
        searchProduct: (state, action) => {
            state.searchProduct = action.payload
        }
    },

    extraReducers: {
        [getProduct.fulfilled]: (state, action) => {
            state.product = action.payload;
        },
    },
});

export const {pushImageProduct , searchProduct} = productSlice.actions;

export default productSlice.reducer;
