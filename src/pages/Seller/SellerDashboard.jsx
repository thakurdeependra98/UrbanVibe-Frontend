
import React from "react";
import {
  ShoppingBag,
  ShoppingCart,
  IndianRupee,
  Clock,
  Plus,
  ArrowUpRight,
  Eye,
  Package,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const salesData = [
  { month: "May", sales: 12000 },
  { month: "Jun", sales: 18000 },
  { month: "Jul", sales: 15000 },
  { month: "Aug", sales: 26000 },
  { month: "Sep", sales: 22000 },
  { month: "Oct", sales: 35000 },
];

const stats = [
  {
    title: "Total Products",
    value: "48",
    change: "8 active this month",
    icon: ShoppingBag,
  },
  {
    title: "Total Orders",
    value: "126",
    change: "12 new orders",
    icon: ShoppingCart,
  },
  {
    title: "Total Revenue",
    value: "₹84,500",
    change: "Across all orders",
    icon: IndianRupee,
  },
  {
    title: "Pending Orders",
    value: "9",
    change: "Require processing",
    icon: Clock,
  },
];

const orders = [
  {
    id: "#ORD-1001",
    customer: "Rahul Sharma",
    product: "Wireless Headphones",
    amount: "₹2,499",
    status: "Processing",
  },
  {
    id: "#ORD-1002",
    customer: "Priya Verma",
    product: "Smart Watch",
    amount: "₹3,999",
    status: "Shipped",
  },
  {
    id: "#ORD-1003",
    customer: "Amit Patel",
    product: "Running Shoes",
    amount: "₹1,899",
    status: "Delivered",
  },
  {
    id: "#ORD-1004",
    customer: "Neha Singh",
    product: "Travel Backpack",
    amount: "₹1,299",
    status: "Pending",
  },
];

const topProducts = [
  { name: "Wireless Headphones", sold: 42, revenue: "₹1,04,958" },
  { name: "Smart Watch", sold: 35, revenue: "₹1,39,965" },
  { name: "Running Shoes", sold: 28, revenue: "₹53,172" },
];

const statusStyles = {
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Pending: "bg-gray-100 text-gray-700",
};

const SellerDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-wider">
            Dashboard
          </h1>
          <p className="mt-1 text-sm tracking-wider text-secondary">
            Welcome back! Here is your store's overview.
          </p>
        </div>

      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
                  <Icon size={21} />
                </div>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                {stat.value}
              </h2>

              <p className="mt-2 text-xs text-gray-500">
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Sales chart */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Sales Overview
          </h2>
          <p className="text-sm text-gray-500">
            Monthly sales performance
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient
                  id="salesGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#2563eb"
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="95%"
                    stopColor="#2563eb"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `₹${value / 1000}k`}
              />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString("en-IN")}`,
                  "Sales",
                ]}
              />

              <Area
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={2.5}
                fill="url(#salesGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Recent orders */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between p-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Orders
            </h2>
            <p className="text-sm text-gray-500">
              Latest customer purchases
            </p>
          </div>

          <a
            href="/seller/orders"
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View all <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-5 py-3 font-medium">Order ID</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-900">
                    {order.id}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {order.customer}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {order.product}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-900">
                    {order.amount}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        statusStyles[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Top products */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Top Selling Products
            </h2>
            <p className="text-sm text-gray-500">
              Your best performing products
            </p>
          </div>

          <Package className="text-gray-400" size={22} />
        </div>

        <div className="divide-y divide-gray-100">
          {topProducts.map((product, index) => (
            <div
              key={product.name}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-semibold text-blue-600">
                  {index + 1}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-medium text-gray-900">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {product.sold} units sold
                  </p>
                </div>
              </div>

              <p className="whitespace-nowrap font-semibold text-gray-900">
                {product.revenue}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <a
          href="/seller/products"
          className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 hover:border-blue-300 hover:shadow-sm"
        >
          <div>
            <h3 className="font-semibold text-gray-900">
              Manage Products
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Update prices and inventory
            </p>
          </div>
          <Eye className="text-blue-600" size={22} />
        </a>

        <a
          href="/seller/orders"
          className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 hover:border-blue-300 hover:shadow-sm"
        >
          <div>
            <h3 className="font-semibold text-gray-900">
              Manage Orders
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Review and process orders
            </p>
          </div>
          <ShoppingCart className="text-blue-600" size={22} />
        </a>
      </section>
    </div>
  );
}

export default SellerDashboard;
