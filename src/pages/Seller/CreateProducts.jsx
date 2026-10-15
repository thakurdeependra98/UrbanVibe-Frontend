import React,{ useState } from "react";
import { useGetCategories } from "../../hooks/Category/useQueries";
import { useCreateProduct } from "../../hooks/products/useMutation";

const initialForm = {
  name: "",
  slug: "",
  brand: "",
  description: "",
  category: "",
  subcategory: "",
  price: "",
  discountPrice: "",
  stock: "",
  sku: "",
  isTodayDeal: false,
  isNewArrival: false,
  isBestSeller: false,
  isActive: true,
  image: null,
};

const CreateProducts = () => {
  const [form, setForm] = useState(initialForm);
  const [successMessage, setSuccessMessage] = useState("");
  const { data: categoryData, isLoading: isCategoriesLoading } = useGetCategories();
  const { mutateAsync, isPending, error } = useCreateProduct();
  const categories = Array.isArray(categoryData)
    ? categoryData
    : categoryData?.categories ?? categoryData?.data ?? [];
  const subcategories = categories.find((cat) => cat._id === form.category)?.subcategories ?? [];

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : type === "file" ? files?.[0] ?? null : value,
    }));
    setSuccessMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");

    const productData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        productData.append(key, value);
      }
    });

    try {
      await mutateAsync(productData);
      setForm(initialForm);
      setSuccessMessage("Product created successfully.");
    } catch {
      // The mutation error is shown below the form.
    }
  };

  return (
    <section className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">Create Product</h1>

      <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm font-medium text-gray-700">Product name</span>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded border p-2" />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium text-gray-700">Brand</span>
          <input name="brand" value={form.brand} onChange={handleChange} required className="w-full rounded border p-2" />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium text-gray-700">Category</span>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            disabled={isCategoriesLoading}
            className="w-full rounded border p-2"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium text-gray-700">Subcategory</span>
          <select
            name="subcategory"
            value={form.subcategory}
            onChange={handleChange}
            className="w-full rounded border p-2"
          >
            <option value="">Select subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1 md:col-span-2">
          <span className="text-sm font-medium text-gray-700">Description</span>
          <textarea name="description" value={form.description} onChange={handleChange} required rows="4" className="w-full rounded border p-2" />
        </label>
        {[
          ["price", "Price", true],
          ["discountPrice", "Discount price", false],
          ["stock", "Stock", false],
          ["sku", "SKU", false],
          ["slug", "Slug", false],
        ].map(([name, label, required]) => (
          <label key={name} className="space-y-1">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <input
              name={name}
              type={["price", "discountPrice", "stock"].includes(name) ? "number" : "text"}
              min={["price", "discountPrice", "stock"].includes(name) ? "0" : undefined}
              value={form[name]}
              onChange={handleChange}
              required={required}
              className="w-full rounded border p-2"
            />
          </label>
        ))}
        <label className="space-y-1 md:col-span-2">
          <span className="text-sm font-medium text-gray-700">Product image</span>
          <input name="image" type="file" accept="image/*" onChange={handleChange} className="w-full rounded border p-2" />
        </label>
        <div className="flex flex-wrap gap-4 md:col-span-2">
          {[
            ["isTodayDeal", "Today deal"],
            ["isNewArrival", "New arrival"],
            ["isBestSeller", "Best seller"],
            ["isActive", "Active"],
          ].map(([name, label]) => (
            <label key={name} className="flex items-center gap-2 text-sm text-gray-700">
              <input name={name} type="checkbox" checked={form[name]} onChange={handleChange} />
              {label}
            </label>
          ))}
        </div>
        <div className="md:col-span-2">
          {successMessage && <p className="mb-3 text-sm text-green-600">{successMessage}</p>}
          {error && <p className="mb-3 text-sm text-red-600">{error.response?.data?.msg ?? "Unable to create product."}</p>}
          <button type="submit" disabled={isPending} className="rounded bg-secondary px-5 py-2 font-medium text-white disabled:opacity-60">
            {isPending ? "Creating..." : "Create product"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateProducts;