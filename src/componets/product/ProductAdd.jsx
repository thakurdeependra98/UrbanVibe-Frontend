import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createProduct, getProductsById, updateProduct } from "../../store/reducers/productSlice";
import ProductCard from "./ProductCard";

const ProductAdd = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  if (!user || user.role !== "seller") return null;
  
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [item, setItem] = useState([]); // Ensure item is initialized as an empty array
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    description : "",
    oldPrice : "",
    category : "",
  });

  const handleEdit = (product) => {
    setEditMode(true);
    setEditProductId(product._id);
    setProduct({
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
      oldPrice: product.oldPrice,
      category: product.category,
    });
  };

  const handleDelete = (productId) => {
    setItem((prevItems) => prevItems.filter((item) => item._id !== productId)); // Remove the deleted product from the state
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItem([...item, product]);
    if (editMode) {
      dispatch(updateProduct({ productId: editProductId, productData: product }));
      setEditMode(false);
      setEditProductId(null);
    }else{
      dispatch(createProduct(product));
    }
    setProduct({ title: "", price: "", image: "", description:"", oldPrice:"", category:"" });
  };

  useEffect(() => {
    dispatch(getProductsById()).then((res) => {
      if (Array.isArray(res.payload)) { // Check if the response is an array
        setItem(res.payload);
      } else {
        console.error("Expected an array but got:", res.payload); // Debugging line
        setItem([]); // Fallback to an empty array
      }
    });
  }, [dispatch]);

  return (
    <div className="w-screen flex flex-col  min-h-screen pt-[8vw]">
      <div className="w-screen flex items-center justify-between px-[5vw] py-[5vh]">
        <div className="w-[50vw]">
          <h1 className="text-[4vw] font-light leading-14">Hello, <br /> Welcome back <span className="text-[red] font-medium">{user.username}</span></h1> 
        </div>    
        <div className="w-[50vw] p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Product Name"
            value={product.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white"
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white"
            required
          />
          <input
            type="text"
            name="oldPrice"
            placeholder="Old Price"
            value={product.oldPrice}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white"
            required
          />
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white"
            required
          >
            <option value="">Select Category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
          <input
            type="url"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
            Add Product
          </button>
        </form>
        </div>
      </div>
        <h1 className="ml-[5vw] text-[2vw]">Total Products : <span className="text-[red]">{item.length}</span></h1> 
      <div className="w-screen px-[5vw] py-[5vh] grid grid-cols-4 gap-10">
          {item.length > 0 ? (
            item.map((item)=>(
              <ProductCard
              key = {item._id}
              product = {item}
              title ={item.title}
              description ={item.description}
              images = {item.image}
              price = {item.price}
              oldPrice = {item.oldPrice}
              handleEdit = {handleEdit}
              handleDelete = {handleDelete} // Pass the handleDelete function
              />
            ))
          ): (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <p className="text-[1.8vw] text-red-700">No Products Available</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProductAdd;
