import React from "react";
import "./Button.css";
import * as FaIcons from "react-icons/fa";

const Button = ({
  type = "button",
  title,
  icon,
  variant = "default",
  disabled = false,
}) => {
  const Icon = FaIcons[icon];

  return (
    <button
      type={type}
      className={`custom-btn ${variant} ${disabled ? "loading" : ""}`}
      disabled={disabled}
    >
      {Icon && <Icon className={`icon ${disabled ? "spin" : ""}`} />}
      {title}
    </button>
  );
};

export default Button;
