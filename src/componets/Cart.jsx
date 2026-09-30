import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
// import { increaseQuantity, decreaseQuantity, getCartItems, deleteCartItem, addToWishlist } from "../store/reducers/productSlice";


const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state)=> state.products.cart)
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(getCartItems())
  }, [dispatch]);

  const handleRemoveFromCart = async (cartItemId) => {
    await dispatch(deleteCartItem(cartItemId));
    dispatch(getCartItems());
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
  
  const handlerIncreaseQnty = async (cartItemId) => {
    await dispatch(increaseQuantity(cartItemId)); 
  };

  const handlerDecreaseQnty = async (cartItemId) => {
    await dispatch(decreaseQuantity(cartItemId));
  };

  const shopNow = () =>{
    navigate("/")
  }
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <div className= "w-screen h-screen pt-24 overflow-auto">
        <h2 className = "text-[2vw] font-normal ml-20 mt-[5vh] mb-[1vh]">My Shopping cart({cartItems.length})</h2>
        <div className='w-[88vw] h-auto flex justify-between mx-[5vw] bg-white'>
          <div className="w-[60vw] h-[70vh] px-[2vw] py-[1vw] overflow-y-auto space-y-4 ">
              {cartItems.length <= 0 ? (
                <div className='w-full h-full flex flex-col justify-center items-center'>
                  <p className='text-[1.8vw] text-red-700'>Your Cart is Empty</p>
                  <button onClick={shopNow} className='bg-blue-700 px-3 rounded py-1 mt-3 text-white text-[1.2vw]'>Shop Now</button>
                </div> ) : (
                  <div>
                    {cartItems.map((item, index)=>(
                      <div key = {index} className = "w-full h-auto bg-cyan-100 flex mb-5 rounded">
                        <div className='w-[15vw] h-[30vh] '>
                          <img className='h-full w-full object-cover rounded' src={item.productId?.image} />
                        </div>
                        <div className='w-[45vw] px-5 py-3 flex justify-between flex-col'>
                          <div className='mt-2'>
                            <h1 className='text-[1.5vw] font-semibold'>{item.productId?.title}</h1>
                            <h1 className='text-[0.9vw] text-zinc-600 font-normal'>{item.productId?.description}</h1>
                          </div>
                          <div>
                            <h3 className='mb-2 text-[1.3vw]'>Quantity</h3>
                            <div className='flex flex-row gap-2 items-center'>
                              <button className='text-[1.5vw]' onClick={() => handlerDecreaseQnty(item._id)}>-</button>
                              <span className='px-5 bg-white text-[1.1vw] rounded'>{item.quantity}</span>
                              <button className='text-[1.5vw]' onClick={() => handlerIncreaseQnty(item._id)}>+</button>
                            </div>
                          </div>
                          <div className='w-full flex justify-between '>
                            <div className='flex gap-4 items-center'>
                              <h3 className='text-[1.2vw]'> ${item.productId?.price * item.quantity}  </h3>
                              <h3 className='line-through text-zinc-500 text-[1vw]'> ${item.productId?.oldPrice * item.quantity}</h3>
                            </div>
                            <div className='flex items-center gap-8'>
                              <h3 onClick={() => dispatch(addToWishlist(item._id))} className='text-[1.2vw] text-zinc-500 flex gap-2 items-center'><IoMdHeartEmpty/> Move To Wishlist</h3>
                              <h3 onClick={() => handleRemoveFromCart(item._id)} className='text-[1.2vw] text-zinc-500 flex gap-2 items-center'><AiOutlineDelete /> Remove</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              }
          </div>
          <div className="w-[25vw] h-auto bg-cyan-100 flex flex-col p-4 m-4 rounded ">
            <h1 className='text-[2vw] text-center mb-4'>Order Summary</h1>
            <div className=' h-full flex flex-col justify-between'>
                <h3 className='text-[1.1vw] text-zinc-500'>Total Bag Items({cartItems.length})</h3>
              <div>
                <div className='my-3'>
                  {cartItems.map((item, index) => (
                    <p key={index} className="text-[1.1vw] text-zinc-600">
                      {item.productId.title} × {item.quantity}
                    </p>
                  ))}
                </div>
                <div className='flex justify-between my-[2vh]'>
                  <h3 className='text-[1.5vw]'>Payable Amount : </h3>
                  <h3>$ {totalPrice.toFixed(2)}</h3>
                </div>
                <button onClick={handleCheckout} className='w-full text-[1.2vw] bg-blue-700 px-4 py-1 text-white rounded'>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart