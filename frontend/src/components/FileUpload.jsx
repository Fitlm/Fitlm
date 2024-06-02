// components/FileUpload.jsx
import React from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";
import PropTypes from "prop-types";

const FileUpload = ({ onImageChange, image }) => {
  const handleDrop = async (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    try {
      const response = await axiosInstance.post(
        "/products/image",
        formData,
        config
      );
      console.log("Image upload response:", response.data);
      if (response.data.fileId) {
        onImageChange(response.data.fileId);
      } else {
        console.error("Failed to receive file ID");
      }
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const handleDelete = () => {
    onImageChange(null);
  };

  return (
    <div className="flex gap-4">
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="min-w-[300px] h-[300px] border flex items-center justify-center">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p className="text-3xl">+</p>
            </div>
          </section>
        )}
      </Dropzone>
      <div className="flex-grow h-[300px] border flex items-center justify-center overflow-x-scroll overflow-y-hidden">
        {image && (
          <div onClick={handleDelete}>
            <img
              className="min-w-[300px] h-[300px]"
              src={`${import.meta.env.VITE_SERVER_URL}/products/image/${image}`}
              alt={image}
            />
          </div>
        )}
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  onImageChange: PropTypes.func.isRequired,
  image: PropTypes.string,
};

export default FileUpload;
