import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import { getProductDetails } from "../../services/Product/product";

const ProductDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const selectedProduct = state?.product;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(id),
    enabled: !selectedProduct,
  });

  const product = selectedProduct || data?.product || data;
  const image = product?.images?.[0]?.url || product?.image;

  if (isLoading && !selectedProduct) {
    return <p className="px-6 py-20 text-center">Loading product...</p>;
  }

  if (isError || !product) {
    return (
      <main className="px-6 py-20 text-center">
        <p className="text-red-600">Unable to load this product.</p>
        <Link to="/products/all" className="mt-6 inline-block text-sm font-semibold underline">Back to products</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f5f1] px-6 py-12 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <Link to="/products/all" className="text-sm font-semibold text-zinc-600 hover:text-black">← Back to products</Link>
        <div className="mt-8 grid gap-10 bg-white p-6 sm:p-10 lg:grid-cols-2">
          <div className="aspect-[4/5] overflow-hidden bg-[#f0eeeb]">
            <img src={image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#bb4d32]">{product.brand || "UrbanVibe"}</p>
            <h1 className="mt-4 text-4xl font-semibold text-zinc-950">{product.name}</h1>
            <p className="mt-5 leading-7 text-zinc-600">{product.description}</p>
            <div className="mt-8 flex items-center gap-4">
              <span className="text-2xl font-semibold">₹{product.discountPrice ?? product.price}</span>
              {product.discountPrice != null && product.discountPrice < product.price && (
                <span className="text-zinc-500 line-through">₹{product.price}</span>
              )}
            </div>
            <div className="mt-8 grid gap-3 text-sm text-zinc-600">
              <p>Category: {product.category?.name || "Uncategorized"}</p>
              <p>Style: {product.subcategory || "Everyday essential"}</p>
              <p>{product.stock > 0 ? `${product.stock} available` : "Currently out of stock"}</p>
            </div>
            <button type="button" disabled={!product.stock} className="mt-10 w-full bg-black px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#bb4d32] disabled:cursor-not-allowed disabled:bg-zinc-400">Add to cart</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails