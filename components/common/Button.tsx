import React from "react";
import "./common.css";

interface ButtonProps {
  label: string;
  customStyles?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button = ({
  label,
  customStyles,
  type = "button",
  onClick,
  icon,
  disabled,
  className,
}: ButtonProps) => {
  return (
    <button
      className={`btn-styles ${className}`}
      style={customStyles}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
