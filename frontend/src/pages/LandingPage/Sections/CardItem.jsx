import React from 'react'
import {Link} from 'react-router-dom';
import ImageSlider from '../../../components/ImageSlider';
import PropTypes from 'prop-types';


const CardItem = ({product}) => {
  return (
    <div className='border-[1px] border-gray-300'>
        <ImageSlider images={product.images} />   
        <Link to={`/product/${product._id}`}>
            <p className='p-1'>{product.title}</p>
        </Link>
    </div>
  )
}


CardItem.propTypes = {
    product: PropTypes.object.isRequired // product이 객체이고 필수로 전달되어야 함

  };
export default CardItem