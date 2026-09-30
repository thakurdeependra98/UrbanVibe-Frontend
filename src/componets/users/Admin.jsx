import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getAllUsers } from "../../store/reducers/authSlice";
// import { productsItem } from "../../store/reducers/productSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products.products);
  const users = useSelector((state) => state.auth.users);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(productsItem());
  }, [dispatch]);
  

  if (!user || user.role !== "admin") {
    return <h2 className="text-center text-red-500">Access Denied</h2>;
  }

  return (
    <div className="w-screen min-h-screen flex items-center mt-[25vh] px-[10vw]">
      <div className="w-full">
      <h2 className="text-[2vw] font-bold mb-[1vh] border-b-2">All Users</h2>
      <div className="w-full">
        {users ? (
          <ul>
            {users.map((user) => (
              <li key={user._id} className="flex justify-between items-center border-b py-2">
                <div className="flex flex-col">
                  <h3 className="text-[1.5vw] font-semibold text-[red]">{user.username}</h3>
                  <p className="text-[1vw]">{user.email}</p>
                </div>
                <span className="text-[1.2vw] capitalize">{user.role}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
      <div>
        <div className="w-full flex items-center justify-between mt-[10vh] border-b-2">
          <h2 className="text-[2vw] font-bold ">Total Products</h2>
        </div>
        <div>
        {products ? (
            <ul className="w-full grid grid-cols-3 gap-4 mt-10">
              {products.map((product) => (
                <li key={product._id} className="flex border p-2 rounded-lg shadow-xl shadow-neutral-950/50">
                  <img src={product.image} alt={product.title} className="w-[10vw] h-[10vw] object-cover mb-2" />
                  <div className="px-2">
                    <h3 className="text-[1.2vw] font-normal leading-6 mb-2">{product.title}</h3>
                    <p className="text-[1vw]">${product.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
