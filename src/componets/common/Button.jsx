import React from "react";

const Button = ({
  children,
  onClick,
  type,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex mt-10 justify-center items-center gap-4 bg-primary text-center px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-primary/95 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
