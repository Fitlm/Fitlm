// pages/PictureBoard.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";

const PictureBoard = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get("/products");
        console.log("Fetched products:", response.data.products);

        // 각 product의 images 필드가 배열임을 고려하여 처리
        const allImages = response.data.products
          .flatMap((product) => {
            console.log("Product images:", product.images);
            return product.images || []; // 이미지가 없을 경우 빈 배열 반환
          })
          .reverse()
          .slice(0, 3);

        console.log("Images to be displayed:", allImages);
        setImages(allImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((imageId, index) => (
        <div key={index} className="w-full h-64">
          <img
            className="object-cover w-full h-full"
            src={`${import.meta.env.VITE_SERVER_URL}/products/image/${imageId}`}
            alt={`Product ${imageId}`}
            onError={(e) =>
              console.error(`Error loading image with ID: ${imageId}`, e)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default PictureBoard;
