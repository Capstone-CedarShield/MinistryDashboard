import React, { useState } from "react";
import IIcon from "../../../assets/IIcon.svg";
import ShowEye from "../../../assets/ShowEye.svg";

function InputField({
  type = "text",
  id,
  name,
  placeholder,
  required = false,
  showPasswordToggle = false,
  onPasswordToggle,
  value,
  onChange,
  multiline = false,
  rows = 4,
  className = "", // Added className prop for custom styling
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
    if (onPasswordToggle) onPasswordToggle();
  };

  const baseStyles =
    "custom-input w-full bg-gray-100 px-4 py-4 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-700";

  return (
    <div className={`mb-4 relative ${className}`}>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          rows={rows}
          className={baseStyles}
        />
      ) : (
        <input
          type={showPassword ? "text" : type}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={baseStyles}
        />
      )}
      {showPasswordToggle && (
        <span
          className="absolute right-3 top-3 cursor-pointer text-gray-500 text-lg"
          onClick={togglePasswordVisibility}
        >
          <img src={showPassword ? ShowEye : IIcon} alt="Toggle password" />
        </span>
      )}
    </div>
  );
}


export default InputField;