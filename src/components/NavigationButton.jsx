import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationButton = ({ label, to, variant = "primary" }) => {
  const navigate = useNavigate();

  const buttonStyles = {
    primary: "bg-black hover:bg-black/80 text-white font-medium rounded-full border-gray-300 px-4 py-2.5 text-sm mt-4 text-center disabled:bg-gray-200 disabled:text-gray-600",
    secondary: "bg-black hover:bg-black/80 text-white font-medium rounded-full border-gray-300 px-4 py-2.5 text-sm mt-4 text-center disabled:bg-gray-200 disabled:text-gray-600",
    success: "bg-emerald-400 hover:bg-emerald-400/80 font-medium rounded-full border-gray-300 px-4 py-2.5 text-sm mt-4 text-center disabled:bg-gray-200 disabled:text-gray-600",
  };

  return (
    <button
      onClick={() => navigate(to)}
      className={`px-4 py-2 rounded ${buttonStyles[variant]} transition duration-200`}
    >
      {label}
    </button>
  );
};

export default NavigationButton;