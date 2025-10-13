import React from "react";
import "./Button.css";
import * as FaIcons from "react-icons/fa";

const Button = ({ type = "button", title, icon, variant = "default" }) => {
  const Icon = FaIcons[icon];

  return (
    <button type={type} className={`custom-btn ${variant}`}>
      {Icon && <Icon className="icon" />}
      {title}
    </button>
  );
};

export default Button;
