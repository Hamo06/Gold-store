import React, { useEffect, useState } from "react";
import "../style/subcategories.scss";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Modal from "@mui/material/Modal";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import {
  changeSubValue,
  deleteSubcategories,
  getSubcategories,
  postSubcategories,
} from "../redux/reducers/subcategoriesSlice";
import { useForm } from "react-hook-form"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

function Subcategories() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryIdQuery = +searchParams.get("categoryId");
  const subcategoriesIdQuery = searchParams.get("subcategoriesId");
  const categoryFilterQuery = searchParams.get("categoryFilter");



  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm();

  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(getSubcategories());
  }, []);


  useEffect(() => {
    dispatch(changeSubValue(value))
  }, [value]);


  const { category } = useSelector((state) => state.categoryReducer);
  const { subcategories  } = useSelector((state) => state.subcategoriesReducer);

  const handleChange = (event, newValue) => {
    setValue( newValue);

  };

  const onSubmit = (data) => {
    data.categoryid = categoryIdQuery;
    dispatch(postSubcategories(data)).then(() => dispatch(getSubcategories()));
    setOpen(false);
    reset();
  };

  const subcategoriesFilter =
    subcategories.length > 0 &&
    subcategories.filter((item) => item.categoryid === categoryIdQuery);




  return (
    <div className="subcategories-wrap">
      <div className="button-modal-wrap">
        <Box
          sx={{
            width: { xs: 320, sm: "100%" },
            borderRadius: "10px 0 0 10px",
          }}
        >
          <Tabs
            value={!!subcategoriesIdQuery ? value : ''}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            {subcategoriesFilter.length > 0 &&
              subcategoriesFilter.map((item) => {
                return (
                  <Tab
                    sx={{
                      minWidth: "15%",
                      fontWeight: "700",
                      zIndex:"5",
                      position: "relative"
                    }}
                    onClick={() => {
                      setSearchParams({
                        categoryId: categoryIdQuery,
                        categoryFilter: categoryFilterQuery,
                        subcategoriesId:item.id,
                      })
                    }}
                    key={item.id}
                    label={
                      <Box>
                        <Box
                            className='line2'
                            sx={{marginRight:'20px'}}
                        >
                          {item.subcategory}
                        </Box>
                        <span
                            style={{
                              position:"absolute",
                              top:'5px',
                              right:'5px',
                              backgroundColor: '#3d8bd9',
                              color: '#fff',
                              borderRadius: '50%',
                              lineHeight: '10px',
                              cursor: 'pointer'
                        }}
                            onClick={() =>
                                dispatch(deleteSubcategories(item.id)).then(() =>
                                    dispatch(getSubcategories())
                                )
                            }
                        >
                          <ClearIcon />
                        </span>
                      </Box>
                    }
                  />
                );
              })}
          </Tabs>
        </Box>
        <Button
          sx={{
            minWidth: "35px",
            lineHeight: "10px",
            backgroundColor: "#fff",
            padding: "5px",
            borderRadius: "5px",
            color: "rgb(138, 138, 138)",
          }}
          disabled={categoryIdQuery === 0 ? true : false}
          onClick={() => {
            setOpen(true);
          }}
        >
          <AddIcon />
        </Button>
        <div>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="modaltitle">
                <h3>{category[categoryIdQuery - 1]?.name}: Add Subcategory</h3>
                <Button
                  sx={{ minWidth: "0", padding: "0", border: "1px solid" }}
                  onClick={() => setOpen(false)}
                >
                  <ClearIcon />
                </Button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  size="small"
                  fullWidth={true}
                  required={true}
                  id="standard-basic"
                  label="subcategory"
                  variant="standard"
                  sx={{ marginBottom: "10px" }}
                  {...register("subcategory", {
                    required: true,
                  })}
                />
                <Button
                  sx={{
                    textTransform: "capitalize",
                  }}
                  fullWidth={true}
                  variant="contained"
                  type="submit"
                  disabled={!isValid}
                >
                  Add Subcategory
                </Button>
              </form>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Subcategories;
