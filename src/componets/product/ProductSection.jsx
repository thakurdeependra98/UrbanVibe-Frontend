import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { productsItem } from "../../store/reducers/productSlice";

const ProductSection = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");

  const products = useSelector((state) => state.products.products);
  const { query } = useSelector((state) => state.search);

  const filteredProducts = products
    .filter((product) =>
      selectedCategory === "all" ? true : product.category === selectedCategory
    )
    .filter((product) =>
      query.trim()
        ? product.title.toLowerCase().includes(query.toLowerCase())
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

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  
  useEffect(()=>{
      dispatch(productsItem());
  },[])

  return (
    <>
      <div className="w-screen flex items-center justify-between bg-white py-[1vh] px-[6vw] mt-[5vh]">
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
        <div>
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
        {currentProducts.length > 0 ? (
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
          disabled={currentPage === 1}
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
          disabled={currentPage === totalPages}
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
