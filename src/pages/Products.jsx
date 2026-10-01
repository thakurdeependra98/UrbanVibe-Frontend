import React from "react";
import { useGetCategories } from "../hooks/Category/useQueries";
import { Link, useParams } from "react-router-dom";
import { useGetProducts } from "../hooks/products/useQueries";
import ProductCard from "../componets/product/ProductCard";

const Products = () => {
  const { category } = useParams();
  const { data: categories } = useGetCategories();
  const categoryData = Array.isArray(categories)
    ? categories
    : categories?.categories || [];
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProducts(category || "all");
  const productsData = Array.isArray(products)
    ? products
    : products?.products || [];
  const activeCategory = category?.toLowerCase() || "";

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-wrap gap-8 px-[6vw] py-4">
        {categoryData.map((categoryItem) => {
          const isActive = categoryItem.slug?.toLowerCase() === activeCategory;

          return (
            <Link
              to={`/products/${categoryItem.slug}`}
              key={categoryItem._id || categoryItem.slug || categoryItem.name}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className={`text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${isActive ? "border-b-2 border-[#bb4d32] pb-1 text-[#bb4d32]" : "text-zinc-800 hover:text-[#bb4d32]"}`}
              >
                {categoryItem.name}
              </span>
            </Link>
          );
        })}
      </div>
      <div>
        {isLoading ? (
          <p className="text-center text-gray-500 mt-20">Loading products...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Unable to load products.</p>
        ) : productsData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-20 mt-4">
            {productsData.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
                title={item.name}
                description={item.description}
                images={item.image}
                price={item.discountPrice ?? item.price}
                oldPrice={
                  item.discountPrice < item.price ? item.price : undefined
                }
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
