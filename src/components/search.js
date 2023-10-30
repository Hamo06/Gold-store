import style from "../style/global.scss";
import SearchIcon from "@mui/icons-material/Search";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {searchProduct} from "../redux/reducers/productSlice";

const Search = () => {

  const inputRef = useRef();
  const [value, setValue] = useState()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchProduct(value))
  },[value])

  return (
    <div className="searchContainer">
      <div className="searchContainer-icon">
        <input onChange={ e => setValue(e.target.value)} ref={inputRef} autoFocus type="text" placeholder="Search" />
        <div className="search-icon" onClick={() => inputRef.current.focus()}>
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default Search;
