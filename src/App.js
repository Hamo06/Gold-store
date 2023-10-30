import "./App.scss";
import Search from "./components/search";
import Category from "./components/category";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import Subcategories from "./components/subcategories";
// import { getCategory } from "./redux/reducers/categorySlice";
// import { getSubcategories } from "./redux/reducers/subcategoriesSlice";
import Product from "./components/product";

function App() {
  // const dispatch = useDispatch();
  // const { images, loading, error, src } = useSelector(
  //   (state) => state.imagesReducer
  // );


  return (
    <div className="App">
      <Search />
      <Category />
      <Subcategories />
      <Product />
    </div>
  );
}

export default App;
