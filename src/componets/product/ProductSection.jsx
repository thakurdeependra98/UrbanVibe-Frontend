import { useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useGetProducts } from "../../hooks/products/useQueries";

const ProductSection = () => {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [sortOrder, setSortOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useGetProducts(category || "all");

  const products = Array.isArray(data) ? data : data?.products || [];
  const getCategoryValue = (product) =>
    typeof product.category === "string"
      ? product.category
      : product.category?.slug || product.category?.name || "";

  const filteredProducts = products
    .filter((product) =>
      selectedCategory === "all"
        ? true
        : getCategoryValue(product).toLowerCase() === selectedCategory.toLowerCase()
    )
    .filter((product) =>
      searchQuery.trim()
        ? product.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage));

  return (
    <>
      <div className="mt-[5vh] flex w-full flex-wrap items-center justify-between gap-4 bg-white px-[6vw] py-4">
        <div className="flex gap-[5vw] font-normal text-red-700">
          {["all", "men", "women", "kids"].map((category) => (
            <h2
              key={category}
              className={`tracking-[5px] cursor-pointer ${
                selectedCategory === category ? "font-bold text-zinc-800" : ""
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
            >
              {category.toUpperCase()}
            </h2>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search products"
            className="w-48 border px-3 py-2 text-sm outline-none focus:border-black"
          />
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            className="border p-2 rounded"
          >
            <option value="">Sort By Price</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
      </div>

      <div className="my-10 grid grid-cols-4 gap-10 px-20">
        {isLoading ? (
          <p className="col-span-full text-center text-gray-500">Loading products...</p>
        ) : isError ? (
          <p className="col-span-full text-center text-red-500">Unable to load products.</p>
        ) : currentProducts.length > 0 ? (
          currentProducts.map((item) => (
            <ProductCard
              key={item._id}
              product={item}
              title={item.title}
              description={item.description}
              images={item.image}
              price={item.price}
              oldPrice={item.oldPrice}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>

      <div className="flex justify-center my-16 space-x-4 ">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>
        <span className="px-4 py-2 border rounded-md bg-gray-100">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ProductSection;
