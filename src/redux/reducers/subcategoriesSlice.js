import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSubcategories = createAsyncThunk(
  "postSubcategories",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(`http://localhost:3001/subcategories`);
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const postSubcategories = createAsyncThunk(
  "postSubcategories",
  async (item, thunkApi) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/subcategories`,
        item
      );
      response.data = item;
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const deleteSubcategories = createAsyncThunk(
    "deleteSubcategories",
    async (id, thunkApi) => {
        try {
            const response = await axios.delete(
                `http://localhost:3001/subcategories/${id}`
            );
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue(e.message);
        }
    }
);



const subcategoriesSlice = createSlice({
  name: "subcategories",
  initialState: {
    subcategories: [],
      subValue: 0
  },

    reducers: {
        changeSubValue: (state, action) => {
            state.subValue = action.payload
        }
    },

  extraReducers: {
    [getSubcategories.fulfilled]: (state, action) => {
      state.subcategories = action.payload;
    },
  },
});

export const {changeSubValue} = subcategoriesSlice.actions
export default subcategoriesSlice.reducer;
