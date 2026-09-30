import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getWishlist, removeWishlist} from "../store/reducers/productSlice";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.products.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWishlist = async () => {
      await dispatch(getWishlist());
    };
    fetchWishlist();
  }, [dispatch]);

  const handlerRemoveFromWishlist = async (wishlistItemId) => {
    await dispatch(removeWishlist(wishlistItemId));
    dispatch(getWishlist());
  };
  return (
    <div className="w-screen h-screen my-[18vh] px-[5vw]">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {wishlistItems.map((item) => (
            <div key={item._id} className='w-[18vw] hover:scale-105 ease-in-out duration-400 h-auto shadow-2xl shadow-neutral-950/50 bg-white rounded-xl flex flex-col py-4 px-4'>
                  <div className='w-full h-[18vw]  flex item-center justify-center'>
                    <img className='h-full w-full object-cover hover:scale-105 ease-in-out duration-400' src={item.productId?.image} alt="" />
                  </div>
                  <div className='flex flex-col'>
                    <h1 className='text-[1.2vw] mt-4 font-semibold leading-5'>{item.productId?.title}</h1>
                    <h5 className='text-[0.8vw] leading-3.5 text-zinc-600 mt-2'>{item.productId?.description}</h5>
                    <div className='flex gap-3 items-center mt-2'>
                      <h3 className='text-[1vw]'>$ {item.productId?.price}</h3>
                      <h3 className='line-through text-zinc-500 text-[1vw]'>$ {item.productId?.oldPrice}</h3>
                    </div>
                    <div className='flex justify-between items-center mt-4'>
                    <button
                      onClick={() => handlerRemoveFromWishlist(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded mt-2">
                      Remove
                    </button>
                    </div>
                  </div>
                </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
