import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getCartItems} from '../../store/thunkFunctions'
import CartTable from './Sections/CartTable';
import { removeCartItem } from '../../store/thunkFunctions';

const CartPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user?.userData);
  const cartDetail = useSelector(state => state.user?.cartDetail);
  const [total,setTotal] = useState(0);
  
  useEffect(() => {
    let cartItemIds = []


    if(userData?.cart &&userData.cart.length > 0){
      userData.cart.forEach(item=>{
        cartItemIds.push(item.id);
      })

      const body={
        cartItemIds,
        userCart: userData.cart
      }

      dispatch(getCartItems(body))
    }
  }, [dispatch,userData])
  

  useEffect(() => {
    calculateTotal (cartDetail)
  }, [cartDetail])

  const calculateTotal  = (cartItems) =>{
    let total=0;
    cartItems.map(item => total +=item.price * item.quantity)
    setTotal(total);
  }
  
  const handleRemoveCartItem = (productId)=>{
    dispatch(removeCartItem(productId));
  }

  return (
  <section className="bg-[#e2d7d2]">
      <div className=' text-center m-7 w-full'>
        <h2 className='text-2xl'>나의 장바구니</h2>
      </div>

      {cartDetail?.length >0 ?
      <>

      <CartTable products={cartDetail} onRemoveItem={handleRemoveCartItem}/>
      {/* 가격부분 전체적인 UI */}
      </>  
      :
      <p>장바구니 비었습니다.</p>
    }
    </section>
  )
}

export default CartPage