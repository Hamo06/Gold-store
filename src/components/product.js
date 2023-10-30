import React, {useEffect, useState} from "react";
import "../style/product.scss";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ImagesUploading from "./imagesUploading";
import {deleteProduct, getProduct, postProduct, pushImageProduct} from "../redux/reducers/productSlice";
import ClearIcon from "@mui/icons-material/Clear";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import TextField from "@mui/material/TextField";
import {useSearchParams} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Slider from "@mui/material/Slider";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "20%",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 2,
    outline: "none",
    borderRadius: 3,
};

function Product() {

    const [open, setOpen] = React.useState(false);
    const [openFilter, setOpenFilter] = React.useState(false);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryIdQuery = +searchParams.get("categoryId");
    const subcategoriesIdQuery = +searchParams.get("subcategoriesId");
    const priceFilter = []
    const [value, setValue] = useState([0, 0]);

    const {product, src, searchProduct} = useSelector(
        (state) => state.productReducer
    );


    useEffect(() => {
        dispatch(getProduct());

    }, []);

    useEffect(() => {
        dispatch(getProduct());

    }, [categoryIdQuery, subcategoriesIdQuery ]);



    useEffect(() => {
        setValue([priceFilter[0], priceFilter[priceFilter.length - 1]])
        setOpenFilter(false)

    }, [subcategoriesIdQuery]);

    useEffect(() => {
        setValue([priceFilter[0], priceFilter[priceFilter.length - 1]])

    }, [openFilter]);

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
    } = useForm();

    const onSubmit = (data) => {
        data.categoryid = +subcategoriesIdQuery;
        data.src = src;
        dispatch(postProduct(data)).then(() => dispatch(getProduct()));
        setOpen(false);
        reset();
    };

    const productFilter = product.filter(item => item.categoryid === subcategoriesIdQuery)
    const searchProductFilter = product.filter(item => (item.vendorCode?.toLowerCase().includes(searchProduct?.toLowerCase())|| item.price?.toLowerCase().includes(searchProduct?.toLowerCase())))

    console.log(productFilter,'productFilter1111')




    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    searchProductFilter.length > 0 ? searchProductFilter.filter(item => item.categoryid === subcategoriesIdQuery).map(item => priceFilter.push(+item.price)) : productFilter.map(item => priceFilter.push(+item.price))
    priceFilter.sort((a,b)=> a-b)


    return (
        <div>
            {!!categoryIdQuery &&  <div className="price-filter-wrap">
                {priceFilter.length > 0 &&  <Box sx={{width: '50%', textAlign: 'center'}}>
                    { openFilter ?
                        <Box>
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={value[0] === 'undefined' ? [+priceFilter[0], +priceFilter[priceFilter.length - 1]] : value}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                min={priceFilter[0]}
                                max={priceFilter[priceFilter.length - 1]}
                             />
                            {/*<Box >*/}
                                <Box className='price-filter'>
                                    <TextField
                                        size='small'
                                        // value={value[0] < +priceFilter[0]  ? +priceFilter[0] : value[0]}
                                        value={value[0]}
                                        label={value[0]}
                                        onChange={e => setValue([ Math.floor(e.target.value) , value[1]])}
                                    />
                                    <TextField
                                        size='small'
                                        value={value[1]}
                                        label={value[1]}
                                        // onChange={e => setValue([value[0], Math.floor(e.target.value) > +priceFilter[priceFilter.length - 1] ? +priceFilter[priceFilter.length - 1] :  Math.floor(e.target.value) ])}
                                        onChange={e => setValue([value[0], Math.floor(e.target.value) ])}
                                    />
                                </Box >
                                {/*<Button className='price-filter-button'*/}
                                {/*        // onClick={() => }*/}
                                {/*>*/}
                                {/*    Save*/}
                                {/*</Button>*/}
                            {/*</Box>*/}
                        </Box>
                            :
                        <Button
                            onClick={() => {
                                productFilter.length > 1 && (+priceFilter[0] !== +priceFilter[1]) ? setOpenFilter(true) : setOpenFilter(false)

                            }}
                            sx={{
                                border: '1px solid #3d8bd9'
                            }}
                        >
                            Filter product by price
                        </Button>
                    }
                </Box>}
            </div>}
            {!!categoryIdQuery && <div className="product-wrap">
                <Box sx={{display: 'flex', flexWrap: 'wrap', width: 'calc(100% - 35px)'}}>
            {
                (searchProductFilter.length === 0 ? product : searchProductFilter).filter(item => item.categoryid === subcategoriesIdQuery).map(item =>

                 value[0]  === undefined ?
                     <Box key={item.id} className='product-image-info'>
                         <img src={item.src}/>
                         <div>
                             <p className='line2' >{item.vendorCode}</p>
                             <p className='line2' >price {item.price}</p>
                         </div>

                         <span
                             onClick={() =>
                                 dispatch(deleteProduct(item.id)).then(() =>
                                     dispatch(getProduct())
                                 )}
                         >
                    <ClearIcon/>
                    </span>
                     </Box> :

                     item.price >= value[0] && item.price <= value[1] &&
                     <Box key={item.id} className='product-image-info'>
                         <img src={item.src}/>
                         <div>
                             <p className='line2' >{item.vendorCode}</p>
                             <p className='line2' >price {item.price}</p>
                         </div>

                         <span
                             onClick={() =>
                                 dispatch(deleteProduct(item.id)).then(() =>
                                     dispatch(getProduct())
                                 )}
                         >
                    <ClearIcon/>
                    </span>
                     </Box>

            )
            }
                </Box>
                {!!subcategoriesIdQuery && <Button
                    sx={{
                        textTransform: "capitalize",
                        minWidth: "35px",
                        height: '45px',
                        lineHeight: "10px",
                        backgroundColor: "#fff",
                        padding: "5px",
                        borderRadius: "5px",
                        color: "rgb(138, 138, 138)",
                    }}
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    <AddIcon/>
                </Button>}
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className="modaltitle">
                             <h3>Add category</h3>
                            <Button
                            sx={{minWidth: "0", padding: "0", border: "1px solid"}}
                            onClick={() => {
                            setOpen(false);
                            reset();
                        }}
                            >
                                <ClearIcon/>
                            </Button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                size="small"
                                fullWidth={true}
                                required={true}
                                id="standard-basic"
                                label="Vendor Code"
                                variant="standard"
                                sx={{marginBottom: "10px"}}
                                error={errors?.vendorCode?.message}
                            {...register("vendorCode", {
                                required: true,
                                // required: "please fill out this field.",
                                // maxLength: {
                                //     value: 10,
                                //     message: "word length cannot be more than 10 characters"
                                // }
                            })}
                            />
                            <div >
                                {errors?.vendorCode &&  <p style={{margin:'0 0 10px 0' }}>{errors?.vendorCode?.message || "Error"}</p>}
                            </div>
                            <TextField
                                size="small"
                                fullWidth={true}
                                required={true}
                                type="number"
                                id="standard-basic"
                                label="Price"
                                variant="standard"
                                sx={{marginBottom: "10px"}}
                            {...register("price", {
                                required: true,
                            })}
                            />
                            <ImagesUploading pushImage={pushImageProduct}/>
                            <Button
                                sx={{
                                textTransform: "capitalize",
                            }}
                                fullWidth={true}
                                variant="contained"
                                type="submit"
                                disabled={!isValid || src === ""}
                            >
                            Add
                            </Button>
                        </form>
                    </Box>
                </Modal>
                </div>}
        </div>
    );
}

export default Product;
