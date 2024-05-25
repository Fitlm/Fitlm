import React from 'react'
import PropTypes from 'prop-types'

const CartTable = ({products , onRemoveItem}) => {

    const renderCartImage =(images)=>{
        if(images.length >0){
            let image = images[0]
            return `${import.meta.env.VITE_SERVER_URL}/${image}`
        }
    }
const renderItems = (
    products.length > 0 && products.map(product => (
        <tr key={product._id}>
            <td>
                <img 
                    className='w-[70px] mt-[30px]'
                    alt='product'
                    src={renderCartImage(product.images)}
                />
            </td>
            <td>
                <button onClick={() => onRemoveItem(product._id)}>지우기</button>
            </td>
        </tr>
    ))
);
return (
        <table className='w-full text-sm text-left text-black bg-[#F1EBE9]'>
            <thead>
                <tr>
                    <th>친구 목록</th>
                    <th>친구 요청</th>
                </tr>
            </thead>


        {/* 수평 줄 */}
        <tr style={{ height: '10px' }}>
            <td colSpan="2" style={{ padding: '0 20px' }}>
                <hr className="border-t-2 border-white" />
            </td>
        </tr>

        <tbody>
            {renderItems}
        </tbody>
        
    </table>
)

}

CartTable.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    })).isRequired,
    onRemoveItem: PropTypes.func.isRequired,
}

export default CartTable