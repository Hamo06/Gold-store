import "../style/category.scss";
import ImagesUploading from "./imagesUploading";
import PersonIcon from "@mui/icons-material/Person";
import Person3Icon from "@mui/icons-material/Person3";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import { pushImage } from "../redux/reducers/categorySlice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import {
    postCategory,
    getCategory,
    deleteCategory
} from "../redux/reducers/categorySlice";
import { useSearchParams } from "react-router-dom";
import {deleteSubcategories, getSubcategories} from "../redux/reducers/subcategoriesSlice";
import {deleteProduct, getProduct} from "../redux/reducers/productSlice";
import {FreeMode} from "swiper";


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

const Category = () => {
  const [formcategory, setFormcategory] = useState(0);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryIdQuery = +searchParams.get("categoryId");
  const categoryFilterQuery = searchParams.get("categoryFilter");
  const subcategoriesIdQuery = +searchParams.get("subcategoriesId");


    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };





  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm();

  const { category, src } = useSelector(
    (state) => state.categoryReducer
  );

    const { subcategories, subValue } = useSelector((state) => state.subcategoriesReducer);

    const { product  } = useSelector(
        (state) => state.productReducer
    );

    const subcategoriesFilterId =
        subcategories.length > 0 &&
        subcategories.filter((item) => item.categoryid === categoryIdQuery);

    // console.log(subcategoriesFilterId,'subcategories44444')
    // console.log(product,'product777777')
    //
    // subcategoriesFilterId.map(item => {
    //     console.log(555555)
    //     product.map(item5 => {
    //         if (item.id == item5.categoryid) {
    //             console.log(item5,'999999999')
    //         }
    //     })
    // })

  useEffect(() => {
    dispatch(getCategory() );
    dispatch(getSubcategories());
  }, []);

    useEffect(() => {
        setSearchParams({
            categoryId: categoryIdQuery,
            categoryFilter: categoryFilterQuery,
            subcategoriesId : subcategoriesFilterId.length ? subcategoriesFilterId[subValue].id : ''
        })
    }, [categoryIdQuery]);



  const categoryFilter = category.filter((item) =>
    categoryFilterQuery === "male"
      ? item.type === "male"
      : categoryFilterQuery === "female"
      ? item.type === "female"
      : item
  );



  const onSubmit = (data) => {
    data.type =
      formcategory === 1 ? "male" : formcategory === 2 ? "female" : "";
    data.src = src;
    dispatch(postCategory(data)).then(() => dispatch(getCategory()));
    setOpen(false);
    setFormcategory(0);
    reset();
  };

  return (
    <div className="category">
      <div className="category-filter-icons">
        <Button
          sx={{
            lineHeight: "10px",
            backgroundColor: "#fff",
            padding: "2px 5px",
            borderRadius: "5px",
            marginBottom: "10px",
            color: "rgb(138, 138, 138)",
          }}
          onClick={
            categoryFilterQuery === "male"
              ? () => {
                  searchParams.delete("categoryFilter");
                  setSearchParams({
                    categoryId: 0,
                  });
                }
              : () =>
                  setSearchParams({
                    categoryId: 0,
                    categoryFilter: "male",
                  })
          }
          style={{ color: categoryFilterQuery === "male" ? "#3d8bd9" : "" }}
        >
          <PersonIcon />
        </Button>
        <Button
          sx={{
            lineHeight: "10px",
            backgroundColor: "#fff",
            padding: "2px 5px",
            borderRadius: "5px",
            color: "rgb(138, 138, 138)",
          }}
          onClick={
            categoryFilterQuery === "female"
              ? () => {
                  searchParams.delete("categoryFilter");
                  setSearchParams({
                    categoryId: 0,
                  });
                }
              : () =>
                  setSearchParams({
                    categoryId: 0,
                    categoryFilter: "female",
                  })
          }
          style={{ color: categoryFilterQuery === "female" ? "#3d8bd9" : "" }}
        >
          <Person3Icon />
        </Button>
      </div>
      <div className="category-image-container">

          <Swiper
              value={categoryIdQuery === 0 ? -1 : value}
              onChange={handleChange}
              slidesPerView={3}
              spaceBetween={30}
              freeMode={true}
              modules={[FreeMode]}
              style={{width:"100%", }}
          >
              {
                  categoryFilter.map((item) => {
                     return <SwiperSlide
                         key={item.id}
                         onClick={
                             categoryIdQuery === item.id
                                 ? () => {
                                     searchParams.delete("categoryId");
                                     searchParams.delete("subcategoriesId");
                                     setSearchParams(searchParams);
                                 }
                                 : () =>
                                     setSearchParams({
                                         categoryId: item.id,
                                         categoryFilter: categoryFilterQuery
                                             ? categoryFilterQuery
                                             : "all",

                                     })
                         }
                         className="category-image-info"
                         style={{
                             boxShadow:
                                 categoryIdQuery === item.id &&
                                 "0px 0px 10px 5px rgba(61, 139, 217, 0.5)",
                             scale: categoryIdQuery === item.id && "1.05",
                             padding: '0',
                             border: categoryIdQuery === item.id && "2px solid #5986d7"


                         }}
                     >
                          <img src={item.src} />
                          <p>{item.name}</p>
                         <span className='delete-icon'
                               onClick={() =>
                                   dispatch(deleteCategory(item.id)).then(() =>
                                       dispatch(getCategory())
                                   )
                               }

                         >
                              <ClearIcon/>
                         </span>
                      </SwiperSlide>
                  })
              }
          </Swiper>

          {/*<Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>*/}
          {/*{!!categoryFilter.length && <Tabs*/}
          {/*    value={categoryIdQuery === 0 ? -1 : value}*/}
          {/*    onChange={handleChange}*/}
          {/*    variant="scrollable"*/}
          {/*    scrollButtons="auto"*/}
          {/*    aria-label="scrollable auto tabs example"*/}
          {/*>*/}
          {/*    {categoryFilter.map((item) => (*/}
          {/*        <Tab*/}
          {/*            key={item.id}*/}
          {/*            onClick={*/}
          {/*                categoryIdQuery === item.id*/}
          {/*                    ? () => {*/}
          {/*                        searchParams.delete("categoryId");*/}
          {/*                        searchParams.delete("subcategoriesId");*/}
          {/*                        setSearchParams(searchParams);*/}
          {/*                    }*/}
          {/*                    : () =>*/}
          {/*                        setSearchParams({*/}
          {/*                            categoryId: item.id,*/}
          {/*                            categoryFilter: categoryFilterQuery*/}
          {/*                                ? categoryFilterQuery*/}
          {/*                                : "all",*/}

          {/*                        })*/}
          {/*            }*/}
          {/*            className="category-image-info"*/}
          {/*            style={{*/}
          {/*                boxShadow:*/}
          {/*                    categoryIdQuery === item.id &&*/}
          {/*                    "0px 5px 10px 0px rgba(61, 139, 217, 0.5)",*/}
          {/*                scale: categoryIdQuery === item.id && "1.1",*/}
          {/*                padding: '0',*/}

          {/*            }}*/}
          {/*            label={*/}
          {/*                <Box style={{*/}
          {/*                    width: '100%'*/}
          {/*                }}>*/}
          {/*                    <img src={item.src}/>*/}
          {/*                    <p>{item.name}</p>*/}
          {/*                    <span className='delete-icon'*/}
          {/*                          onClick={() =>*/}
          {/*                              dispatch(deleteCategory(item.id)).then(() =>*/}
          {/*                                  dispatch(getCategory())*/}
          {/*                              )*/}
          {/*                          }*/}
          {/*                        //   onClick={() => {*/}
          {/*                        //       subcategoriesFilterId.forEach(item => {*/}
          {/*                        //           product.forEach(product => {*/}
          {/*                        //               if (item.id === product.categoryid) {*/}
          {/*                        //                   dispatch(deleteProduct(product.id)).then(() =>*/}
          {/*                        //                       dispatch(getProduct())*/}
          {/*                        //                   )*/}
          {/*                        //               }*/}
          {/*                        //           })*/}
          {/*                        //       })*/}
          {/*                        //       subcategories.forEach(item => {*/}
          {/*                        //           if (item.categoryid === categoryIdQuery) {*/}
          {/*                        //               dispatch(deleteSubcategories(item.id)).then(() =>*/}
          {/*                        //                   dispatch(getSubcategories())*/}
          {/*                        //               )*/}
          {/*                        //           }*/}
          {/*                        //       })*/}
          {/*                        //*/}
          {/*                        //       dispatch(deleteCategory(item.id)).then(() =>*/}
          {/*                        //               dispatch(getCategory())*/}
          {/*                        //           )*/}
          {/*                        //*/}
          {/*                        //   }}*/}

          {/*                    >*/}
          {/*                    <ClearIcon/>*/}
          {/*               </span>*/}
          {/*                </Box>*/}
          {/*            }*/}
          {/*        />*/}

          {/*    ))}*/}
          {/*</Tabs>}*/}
          {/*</Box>*/}
      </div>
      <div className="add-categoryImage">
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            color: "rgb(138, 138, 138)",
          }}
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </div>
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
                sx={{ minWidth: "0", padding: "0", border: "1px solid" }}
                onClick={() => {
                  setFormcategory(0);
                  setOpen(false);
                  reset();
                }}
              >
                <ClearIcon />
              </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-catecory">
                <div
                  className="modal-icon-male"
                  onClick={() =>
                    formcategory === 1 ? setFormcategory(0) : setFormcategory(1)
                  }
                >
                  <PersonIcon
                    style={{ color: formcategory === 1 ? "#3d8bd9" : "" }}
                  />
                  <span>Male</span>
                </div>
                <div
                  className="modal-icon-female"
                  onClick={() =>
                    formcategory === 2 ? setFormcategory(0) : setFormcategory(2)
                  }
                >
                  <Person3Icon
                    style={{ color: formcategory === 2 ? "#3d8bd9" : "" }}
                  />
                  <span>Female</span>
                </div>
              </div>
              <TextField
                size="small"
                fullWidth={true}
                required={true}
                id="standard-basic"
                label="Category"
                variant="standard"
                sx={{ marginBottom: "10px" }}
                {...register("name", {
                  required: true,
                })}
              />
              <ImagesUploading pushImage={pushImage} />
              <Button
                sx={{
                  textTransform: "capitalize",
                }}
                fullWidth={true}
                variant="contained"
                type="submit"
                disabled={!isValid || src === "" || formcategory === 0}
              >
                Add
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Category;
