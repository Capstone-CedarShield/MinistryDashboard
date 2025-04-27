import React from "react";

function Button({ type = "submit", onClick, children, className = "" }) {
  const hasTextRed = className.match(/(^|\s)text-red-\d{3}(\s|$)/);
  const hasHoverTextRed = className.match(/hover:text-red-\d{3}/);

  //force text-white if hover red exists, unless text-red is already there
  const finalTextColor =
    hasHoverTextRed && !hasTextRed
      ? "text-white"
      : !hasTextRed
      ? "text-white"
      : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-4 font-semibold bg-red-700 hover:bg-red-800 shadow-md rounded-2xl transition-colors ${className} ${finalTextColor}`}
    >
      {children}
    </button>
  );
}

export default Button;
