import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaHeart } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import {
  addToCart,
  addToWishlist,
  deleteProduct,
  getWishlist,
  removeFromWishlist,
} from "../../services/Product/product";


const ProductCard = ({ product, title, description, images, price, oldPrice, handleEdit, handleDelete }) => {
  const queryClient = useQueryClient();
  const { data: wishlist = [] } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });
  const isWishlisted = wishlist.some(
    (item) => item.productId && item.productId._id === product._id,
  );
  const cartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
  const wishlistMutation = useMutation({
    mutationFn: isWishlisted ? removeFromWishlist : addToWishlist,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      handleDelete?.(product._id);
    },
  });

  const showDeleteBtn = Boolean(
    handleEdit && handleDelete && window.location.pathname === "/seller",
  );
  const handleAddToCart = () =>
    cartMutation.mutate({ productId: product._id, quantity: 1 });
  const handlerDelete = () => deleteMutation.mutate(product._id);
  const handlerWishlist = () => wishlistMutation.mutate(product._id);


  return (
    <div className='w-[18vw] hover:scale-105 ease-in-out duration-400 h-auto shadow-2xl shadow-neutral-950/50 bg-white rounded-xl flex flex-col py-4 px-4'>
      <div className='w-full h-[18vw]  flex item-center justify-center'>
        <img className='h-full w-full object-cover hover:scale-105 ease-in-out duration-400' src={images} alt="" />
      </div>
      <div className='flex flex-col'>
        <h1 className='text-[1.2vw] mt-4 font-semibold leading-5'>{title}</h1>
        <h5 className='text-[0.8vw] leading-3.5 text-zinc-600 mt-2'>{description}</h5>
        <div className='flex gap-3 items-center mt-2'>
          <h3 className='text-[1vw]'>$ {price}</h3>
          <h3 className='line-through text-zinc-500 text-[1vw]'>$ {oldPrice}</h3>
        </div>
        {!showDeleteBtn ? (<div className='flex justify-between items-center mt-4'>
          <button onClick={handleAddToCart} disabled={cartMutation.isPending} className='bg-blue-700 rounded text-white py-1 px-3 disabled:opacity-50'>Add to cart</button>
          <button type='button' onClick={handlerWishlist} disabled={wishlistMutation.isPending} aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>{isWishlisted ? (<FaHeart className='fill-red-500'/>) : (<IoIosHeartEmpty />)}</button>
        </div>): (
          <div className='flex justify-between items-center mt-4'>
            <button onClick={handlerDelete} disabled={deleteMutation.isPending} className='bg-red-700 rounded text-white py-1 px-3 disabled:opacity-50'>Delete</button>
            <button onClick={()=> handleEdit(product)} className='bg-slate-500 rounded text-white py-1 px-3'>Edit </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard