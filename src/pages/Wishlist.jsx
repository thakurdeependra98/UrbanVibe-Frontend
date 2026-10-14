import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useGetWishlist } from "../hooks/products/useQueries";
import { removeFromWishlist } from "../services/Product/product";
import { useToast } from "../componets/common/Toast";

const Wishlist = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { data, isLoading, isError } = useGetWishlist();
  const wishlistItems = Array.isArray(data) ? data : data?.wishlist || [];
  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      showToast("Removed from your wishlist.", "success");
    },
    onError: () => showToast("Unable to remove this item.", "error"),
  });

  if (isLoading) {
    return <main className="min-h-screen px-6 py-20 text-center text-zinc-500">Loading your wishlist...</main>;
  }

  if (isError) {
    return <main className="min-h-screen px-6 py-20 text-center text-red-600">Unable to load your wishlist.</main>;
  }

  return (
    <main className="min-h-screen bg-[#f7f5f1] px-6 py-12 sm:px-12 lg:px-20">
      <div className="w-screen">
        <div className="flex flex-col justify-between gap-3 border-b border-[#d8d3cb] pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#bb4d32]">Saved for later</p>
            <h1 className="mt-3 text-4xl font-semibold text-zinc-950">My Wishlist</h1>
          </div>
          <p className="text-sm text-zinc-500">{wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="py-24 text-center">
            <h2 className="text-2xl font-semibold text-zinc-900">Your wishlist is waiting.</h2>
            <p className="mt-3 text-zinc-600">Save pieces you love and come back to them anytime.</p>
            <Link to="/products/all" className="mt-8 inline-flex bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#bb4d32]">Explore products</Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems.map((item) => {
              const product = item.productId;
              const discounted = product?.discountPrice != null && product.discountPrice < product.price;

              return (
                <article key={item._id} className="group bg-white p-4 shadow-sm">
                  <Link to={`/product/${product?._id}`} className="block overflow-hidden bg-[#f0eeeb]">
                    <img src={product?.image} alt={product?.name || "Wishlist product"} className="aspect-[4/5] h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </Link>
                  <div className="pt-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#bb4d32]">{product?.brand || "UrbanVibe"}</p>
                        <Link to={`/product/${product?._id}`} className="mt-2 block text-lg font-semibold text-zinc-950 hover:text-[#bb4d32]">{product?.name}</Link>
                      </div>
                      {product?.isTodayDeal && <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">Deal</span>}
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-5 text-zinc-600">{product?.description}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="font-semibold">₹{product?.discountPrice ?? product?.price}</span>
                      {discounted && <span className="text-sm text-zinc-500 line-through">₹{product?.price}</span>}
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
                      <span className="text-xs text-zinc-500">{product?.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</span>
                      <button type="button" onClick={() => removeMutation.mutate(product?._id)} disabled={removeMutation.isPending} className="text-sm font-semibold text-red-600 hover:text-black disabled:opacity-50">Remove</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Wishlist;
