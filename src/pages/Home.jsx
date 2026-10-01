import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaTruckFast,
  FaLock,
  FaRotateLeft,
  FaStar,
} from "react-icons/fa6";
// import { productsItem } from "../store/reducers/productSlice";
import Hero from "../assests/Hero Page Image.jpg";
import HeroTwo from "../assests/Hero 2.jpg";
import { useGetProducts } from "../hooks/products/useQueries";
import { useGetCategories } from "../hooks/Category/useQueries";

const brands = ["NIKE", "adidas", "PUMA", "Apple", "SAMSUNG"];

const ProductTile = ({ product, index }) => (
  <Link
    to={product?._id ? `/product/${product._id}` : "/products/all"}
    className="group block min-w-[220px] flex-1"
  >
    <div className="relative aspect-[4/5] overflow-hidden bg-[#f0eeeb]">
      <img
        src={product?.image || (index % 2 ? HeroTwo : Hero)}
        alt={product?.name || "UrbanVibe product"}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
    <div className="flex items-start justify-between gap-3 pt-4">
      <div>
        <h3 className="font-display text-base font-semibold">
          {product?.name || "Featured essential"}
        </h3>
        <p className="mt-1 text-sm tracking-[0.05rem]">
          {(product?.description || "UrbanVibe")}
        </p>
      </div>
      <span className="whitespace-nowrap text-sm font-semibold">
        ${product?.price || "49.00"}
      </span>
    </div>
  </Link>
);

const SectionHeading = ({ eyebrow, title, link = "View all" }) => (
  <div className="mb-8 flex items-end justify-between gap-4">
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
    </div>
    <Link
      to="/products/all"
      className="hidden items-center gap-2 border-b border-[#1b1c1b] pb-1 text-xs font-bold uppercase tracking-[0.16em] sm:flex"
    >
      {link} <FaArrowRight />
    </Link>
  </div>
);

const Home = () => {
  const { data } = useGetProducts("all");
  const products = Array.isArray(data) ? data : data?.products || [];
  const bestSellingProducts = products.filter((product) => product.isBestSeller).slice(0, 4);
  const todaysDeals = products.filter((product) => product.isTodayDeal).slice(0, 4);
  const newArrivals = products.filter((product) => product.isNewArrival).slice(8, 12);
  const { data: CategoriesData } = useGetCategories("categories");
  const categories = Array.isArray(CategoriesData) ? CategoriesData : CategoriesData?.categories || [];
  const categoryData = categories.slice(0, 6); // Get the first 6 categories for display

  return (
    <main className="home-page">
      <section
        className="relative mx-4 overflow-hidden sm:mx-8 lg:mx-0"
        aria-label="Summer sale"
      >
        <img
          src={Hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative flex min-h-[560px] items-end p-8 sm:p-14 lg:min-h-[692px] lg:p-20">
          <div className="max-w-xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.28em] text-red-500">
              Summer collection
            </p>
            <h1 className="max-w-lg text-5xl font-semibold leading-[1.08] tracking-tight text-zinc-950 sm:text-6xl lg:text-6xl">
              Fall - Winter Collections 2027
            </h1>
            <p className="mt-8 max-w-lg text-base leading-5 text-slate-700 sm:text-lg">
              A specialist label creating luxury essentials. Ethically crafted
              with an unwavering commitment to exceptional quality.
            </p>
            <button
              type="button"
              className="mt-10 inline-flex items-center gap-4 bg-black px-8 py-5 text-sm font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-secondary"
            >
              Shop now
              <span aria-hidden="true" className="text-xl leading-none">
                &rarr;
              </span>
            </button>
          </div>
        </div>
        <div className="absolute bottom-5 right-12 hidden text-right text-xs uppercase tracking-[0.16em] text-[#4e4a43] sm:block">
          Limited drop
          <br />
          <span className="font-bold">60% off selected styles</span>
        </div>
      </section>

      <section className="home-section bg-white">
        <SectionHeading
          subtitle="Discover our curated collections"
          eyebrow="Start somewhere good"
          title="Shop by category"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categoryData.map((category) => (
            <Link
              to={`/products/${(category.slug)}`}
              key={category._id || (category.name)}
              className={`group category-tile relative overflow-hidden bg-cover bg-center text-white rounded`}
              style={{
                backgroundImage: `url("${category?.image || HeroTwo}")`,
              }}
            >
              <span className="absolute inset-0 bg-black/25 transition duration-300 group-hover:bg-black/10" />
              <span className="relative z-10 flex h-full flex-col">
                <span className="font-display text-2xl capitalize">{(category.name)}</span>
                <span className="mt-2 text-[10px] uppercase tracking-[0.15em] opacity-85">
                  {category.description || "Explore our curated selection of products."}
                </span>
                <FaArrowRight className="mt-auto text-xs" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section ">
        <SectionHeading eyebrow="Seen around town" title="Best sellers" />
        <div className="grid grid-cols-4 gap-5 overflow-x-auto pb-2 lg:gap-6">
          {bestSellingProducts.map(
            (product, index) => (
              <div key={product._id || `trend-${index}`}>
                <ProductTile
                  product={product}
                  index={index}
                />
              </div>
            ),
          )}
        </div>
      </section>

      <section className="home-section">
        <SectionHeading
          eyebrow="For a little less"
          title="Today's deals"
          link="Shop deals"
        />
        <div className="flex gap-5 overflow-x-auto pb-2 lg:gap-6">
          {todaysDeals.map(
            (product, index) => (
              <ProductTile
                key={product._id || `deal-${index}`}
                product={product}
                index={index + 1}
              />
            ),
          )}
        </div>
      </section>

      <section className="border-y border-[#d8d3cb] px-6 py-12 sm:px-12 lg:px-20 bg-white">
        <p className="eyebrow text-center">The names you know</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:justify-between sm:gap-x-6">
          {brands.map((brand) => (
            <span
              key={brand}
              className="font-display text-2xl font-semibold tracking-[-0.04em] text-[#333330] sm:text-3xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      <section className="home-section">
        <SectionHeading eyebrow="Just landed" title="New arrivals" />
        <div className="flex gap-5 overflow-x-auto pb-2 lg:gap-6">
          {newArrivals.map(
            (product, index) => (
              <ProductTile
                key={product._id || `new-${index}`}
                product={product}
                index={index}
              />
            ),
          )}
        </div>
      </section>

      <section className="grid border-y border-[#d8d3cb] bg-[#dfe5df] sm:grid-cols-2">
        <div className="p-8 sm:p-12 lg:p-20">
          <p className="eyebrow">The UrbanVibe promise</p>
          <h2 className="font-display mt-4 max-w-md text-4xl font-semibold leading-none">
            Little details. Better days.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-6 text-[#53594f]">
            We make shopping feel human, from the first click to the moment your
            order arrives.
          </p>
        </div>
        <div className="grid grid-cols-2 border-t border-[#cbd2cb] sm:border-l sm:border-t-0">
          {[
            ["Fast delivery", FaTruckFast],
            ["Secure payment", FaLock],
            ["Easy returns", FaRotateLeft],
            ["Quality products", FaStar],
          ].map(([label, Icon]) => (
            <div
              key={label}
              className="border-b border-[#cbd2cb] p-6 last:border-b-0 sm:p-8"
            >
              <Icon className="text-[#bb4d32]" />
              <p className="mt-6 text-sm font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
        <div className="text-xl tracking-[0.35em] text-[#bb4d32]">★★★★★</div>
        <blockquote className="font-display mt-6 text-3xl font-semibold leading-tight sm:text-4xl">
          “The kind of online shop that makes you want to refresh your wardrobe
          and your whole outlook.”
        </blockquote>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#77736c]">
          Maya R. / Verified customer
        </p>
      </section>

      <section className="bg-[#bb4d32] px-6 py-16 text-white sm:px-12 lg:px-20">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-[#f7d9c8]">Stay in the loop</p>
            <h2 className="font-display mt-3 text-4xl font-semibold">
              Good finds, delivered.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#f7d9c8]">
              New drops, private offers and the occasional excellent idea.
            </p>
          </div>
          <form
            className="flex w-full max-w-md border-b border-white/60 pb-3"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              aria-label="Your email address"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#f7d9c8]"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em]"
            >
              Subscribe <FaArrowRight />
            </button>
          </form>
        </div>
      </section>

      <footer className="flex flex-col justify-between gap-5 bg-[#1b1c1b] px-6 py-8 text-white sm:flex-row sm:items-center sm:px-12 lg:px-20">
        <span className="font-display text-2xl font-semibold">
          UrbanVibe<span className="text-[#bb4d32]">.</span>
        </span>
        <p className="text-xs uppercase tracking-[0.14em] text-white/50">
          Curated for everyday living / 2025
        </p>
        <div className="flex gap-5 text-xs uppercase tracking-[0.12em] text-white/70">
          <Link to="/account">Account</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </footer>
    </main>
  );
};

export default Home;
