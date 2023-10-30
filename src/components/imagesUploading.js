import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ClearIcon from "@mui/icons-material/Clear";
import "../style/ImagesUploading.scss";
import { useDispatch } from "react-redux";

const ImagesUploading = ({pushImage}) => {
  const [images, setImages] = useState("");
  const maxNumber = 69;
  const dispatch = useDispatch();

  const onChange = (imageList) => {
    setImages(imageList);
    dispatch(pushImage(""));
    dispatch(pushImage(imageList[0].data_url));
  };

  return (
    <div className="cantainer-image-wrapper">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          // onImageRemoveAll,
          // onImageUpdate,
          // isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <div></div>
            <div>
              {images.length ? (
                imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image["data_url"]} alt="" />
                    <div
                      className="delete-icon"
                      onClick={() => {
                        onImageRemove(index);
                      }}
                    >
                      <ClearIcon />
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className="notImgLength"
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <UploadFileIcon
                    style={{ fontSize: "70px", color: "#3d8bd9" }}
                  />
                  <p>Upload a photo</p>
                </div>
              )}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImagesUploading;
