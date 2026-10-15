import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductDetails } from "../hooks/products/useQueries";
import { useToast } from "../componets/common/Toast";
import { useAddtoCart } from "../hooks/Cart/useMutation";

const ProductDetails = () => {
  const showToast = useToast();
  const { id } = useParams();
  const { data: productData, isLoading, isError } = useGetProductDetails(id);
  const cartMutation = useAddtoCart();
  const product = productData?.product || productData?.data?.product || productData;
  const discount =
    product?.price && product?.discountPrice < product.price
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : 0;
  const handleAddToCart = () => {
    try{
      cartMutation.mutate({ productId: product.id, quantity: 1 });
      showToast("Product added to cart", "success");
    }catch(error){
      showToast(error.message, "error");
    }
  };
  if (isLoading) {
    return <p className="px-6 py-20 text-center">Loading product...</p>;
  }

  if (isError || !product) {
    return (
      <main className="px-6 py-20 text-center">
        <p className="text-red-600">Unable to load this product.</p>
        <Link
          to="/products/all"
          className="mt-6 inline-block text-sm font-semibold underline"
        >
          Back to products
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] px-6 py-10 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-10 rounded bg-white p-6 lg:grid-cols-2">
          <div className="aspect-[4/5] overflow-hidden rounded bg-[#f0eeeb]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover rounded"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.12em]">
              {product.isNewArrival && <span className="rounded bg-blue-100 px-2 py-1 text-blue-700">New arrival</span>}
              {product.isBestSeller && <span className="rounded bg-amber-100 px-2 py-1 text-amber-700">Best seller</span>}
              {product.isTodayDeal && <span className="rounded bg-emerald-100 px-2 py-1 text-emerald-700">Today&apos;s deal</span>}
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#bb4d32]">{product.brand}</p>
            <h1 className="mt-4 text-4xl font-semibold text-zinc-950">
              {product.name}
            </h1>
            <p className="mt-5 leading-5 text-zinc-600">
              {product.description}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span className="text-2xl font-semibold">
                ₹{product.discountPrice ?? product.price}
              </span>
              {discount > 0 && (
                  <span className="text-zinc-500 line-through">
                    ₹{product.price}
                  </span>
              )}
              {discount > 0 && <span className="text-sm font-semibold text-emerald-700">{discount}% off</span>}
            </div>
            <div className="mt-8 grid gap-3 border-y border-zinc-200 py-5 text-sm text-zinc-600 sm:grid-cols-2">
              <p><strong className="text-zinc-900">Category:</strong> {product.category?.name || "Uncategorized"}</p>
              <p><strong className="text-zinc-900">Category slug:</strong> {product.category?.slug || "—"}</p>
              <p><strong className="text-zinc-900">Subcategory:</strong> {product.subcategory || "—"}</p>
              <p><strong className="text-zinc-900">SKU:</strong> {product.sku || "—"}</p>
              <p><strong className="text-zinc-900">Stock:</strong> {product.stock > 0 ? `${product.stock} available` : "Currently out of stock"}</p>
              <p><strong className="text-zinc-900">Status:</strong> {product.isActive ? "Active" : "Inactive"}</p>
            </div>
            <button
              type="button"
              disabled={!product.stock || cartMutation.isPending || !product.isActive}
              onClick={handleAddToCart}
              className="mt-10 w-full bg-black px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#bb4d32] disabled:cursor-not-allowed disabled:bg-zinc-400"
            >
              {cartMutation.isPending ? "Adding..." : product.stock ? "Add to cart" : "Out of stock"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
