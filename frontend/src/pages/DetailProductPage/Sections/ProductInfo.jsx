import React from 'react'
import PropTypes from 'prop-types'; // PropTypes 불러오기
import {useDispatch} from 'react-redux';
import { addToCart } from '../../../store/thunkFunctions';

const ProductInfo = ({product}) => {
    const dispatch = useDispatch();
    const handleClick = () =>{
        dispatch(addToCart({productId: product._id}))
    }
  return (
    <div>
        <p className='text-xl, text-bold'>상품 정보</p>

        <ul>
            <li><span className='font-semibold text-gray-900'>가격: </span> {product.price} 원</li>
            <li><span className='font-semibold text-gray-900'>팔린 개수: </span> {product.sold} 원</li>
            <li><span className='font-semibold text-gray-900'>설명: </span> {product.description} 원</li>
        </ul>


        <div className=' mt-3'>
            <button 
                onClick={handleClick}
                className='w-full px-4 py-2 bg-black text-white hover:bg-gray-700 rounded-md'>
                장바구니로
            </button>

        </div>
    </div>
  )
}
ProductInfo.propTypes = {
    product: PropTypes.shape({
      _id: PropTypes.string.isRequired, // _id는 문자열이며 필수입니다.
      price: PropTypes.number.isRequired,
      sold: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      // 필요한 다른 속성도 추가할 수 있습니다.
    }).isRequired,
  };
export default ProductInfo