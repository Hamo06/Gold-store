import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getCategory = createAsyncThunk(
    "getCategory",
    async (_, thunkApi) => {
        try {
            const response = await axios.get("http://localhost:3001/category/");
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue(e.message);
        }
    }
);

export const postCategory = createAsyncThunk(
    "postCategory",
    async (data, thunkApi) => {
        try {
            const response = await axios.post("http://localhost:3001/category", data);
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue(e.message);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "deleteCategory",
    async (id, thunkApi) => {
        try {
            const response = await axios.delete(
                `http://localhost:3001/category/${id}`
            );
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue(e.message);
        }
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState: {
        category: [],
        loading: false,
        error: "",
        src: "",
    },

    reducers: {
        pushImage: (state, action) => {
            state.src = action.payload;
        },
    },

    extraReducers: {
        [getCategory.pending]: (state) => {
            state.loading = true;
        },
        [getCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.category = action.payload;
            state.error = "";
        },
        [getCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {pushImage} = categorySlice.actions;

export default categorySlice.reducer;
