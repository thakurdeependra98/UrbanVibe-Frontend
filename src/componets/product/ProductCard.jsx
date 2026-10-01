import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaHeart } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { useGetWishlist } from "../../hooks/products/useQueries";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useAddtoCart,
} from "../../hooks/products/useMutation";
import { deleteProduct } from "../../services/Product/product";
import { useToast } from "../common/Toast";

const ProductCard = ({
  product,
  title,
  description,
  images,
  price,
  oldPrice,
  handleEdit,
  handleDelete,
}) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { data: wishlist = [] } = useGetWishlist();
  const isWishlisted = wishlist.some(
    (item) => item.productId && item.productId._id === product._id,
  );
  const cartMutation = useAddtoCart();
  const addWishlistMutation = useAddToWishlist();
  const removeWishlistMutation = useRemoveFromWishlist();
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
  const handlerWishlist = () => {
    try{

      if (isWishlisted) removeWishlistMutation.mutate(product._id);
      else addWishlistMutation.mutate(product._id);
      showToast(isWishlisted ? "Removed from your wishlist." : "Added to your wishlist.", isWishlisted ? "success" : "info");
    }catch(error){
      showToast(error.message, "error");
    }
  };
  const wishlistPending =
    addWishlistMutation.isPending || removeWishlistMutation.isPending;
  const openDetails = () =>
    navigate(`/product/${product._id}`, { state: { product } });

  return (
    <div
      className="w-[18vw] cursor-pointer ease-in-out duration-400 h-auto shadow-2xl shadow-neutral-950/50 bg-white rounded-xl flex flex-col py-4 px-4"
      onClick={openDetails}
      role="link"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") openDetails();
      }}
    >
      <div className="w-full h-[18vw]  flex item-center justify-center">
        <img
          className="h-full w-full object-cover hover:scale-105 ease-in-out duration-400"
          src={images}
          alt={title}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-[1.2vw] mt-4 font-semibold leading-5">{title}</h1>
        <h5 className="text-[0.8vw] leading-3.5 text-zinc-600 mt-2">
          {description}
        </h5>
        <div className="flex gap-3 items-center mt-2">
          <h3 className="text-[1vw]">$ {price}</h3>
          {oldPrice && (
            <h3 className="line-through text-zinc-500 text-[1vw]">
              $ {oldPrice}
            </h3>
          )}
        </div>
        {!showDeleteBtn ? (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleAddToCart();
              }}
              disabled={cartMutation.isPending}
              className="bg-blue-700 rounded text-white py-1 px-3 disabled:opacity-50"
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                handlerWishlist();
              }}
              disabled={wishlistPending}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              {isWishlisted ? (
                <FaHeart className="fill-red-500" />
              ) : (
                <IoIosHeartEmpty />
              )}
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={(event) => {
                event.stopPropagation();
                handlerDelete();
              }}
              disabled={deleteMutation.isPending}
              className="bg-red-700 rounded text-white py-1 px-3 disabled:opacity-50"
            >
              Delete
            </button>
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleEdit(product);
              }}
              className="bg-slate-500 rounded text-white py-1 px-3"
            >
              Edit{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
