import React, { useState, useEffect } from 'react';
import ImageGallery from "react-image-gallery";
import PropTypes from 'prop-types';


const ProductImage = ({product}) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if(product?.images?.length > 0 ){
            let images = [];

                product.images.map(imageName =>{
                    return images.push({
                        original: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
                        thumbnail: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
                    })
                })
                setImages(images)
        }

    }, [product])
    

  return (
    <ImageGallery items={images}  />
)
}
ProductImage.propTypes = {
    product: PropTypes.shape({
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
      // 필요한 다른 속성도 추가할 수 있습니다.
    }).isRequired,
  };
export default ProductImage