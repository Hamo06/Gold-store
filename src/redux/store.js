import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './reducers/categorySlice';
import subcategoriesReducer from "./reducers/subcategoriesSlice";
import productReducer from "./reducers/productSlice";

const store = configureStore({
    reducer: {
        categoryReducer,
        subcategoriesReducer,
        productReducer
    }
})

export default store