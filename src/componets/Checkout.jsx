import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { clearCart } from "../store/reducers/productSlice";
import { useDispatch } from "react-redux";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMode: "cashOnDelivery",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Successfully Placed!");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-[30vw] bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Checkout</h2>

        <label className="block mb-2 text-lg">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded mb-3"
        />

        <label className="block mb-2 text-lg">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded mb-3"
        />

        <label className="block mb-2 text-lg">Address:</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded mb-3"
        />

        <label className="block mb-2 text-lg">Payment Mode:</label>
        <select
          name="paymentMode"
          value={formData.paymentMode}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="creditCard">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cashOnDelivery">Cash on Delivery</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded text-lg"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
