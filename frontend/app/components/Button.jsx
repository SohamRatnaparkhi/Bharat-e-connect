import React from "react";

const Button = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 rounded-[5px] px-4 py-2 w-3/4  text-white font-semibold text-lg ${
        disabled ? "opacity-50" : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
