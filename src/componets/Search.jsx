import React,{ useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchBar = ({ value = "", onChange, onSearch, placeholder = "Search products..." }) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    onSearch?.(debouncedValue);
  }, [debouncedValue, onSearch]);

  const handleChange = (event) => {
    const nextValue = event.target.value;
    setInputValue(nextValue);
    onChange?.(nextValue);
  };

  return (
    <input
      type="search"
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholder}
      aria-label={placeholder}
      className="w-full rounded-full border border-border px-5 py-2 outline-none focus:border-[#bb4d32] sm:w-[20vw]"
    />
  );
};

export default SearchBar;
