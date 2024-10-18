import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  to?: string;
  leftIcon?: React.ReactNode; // Optional prop for left icon
  rightIcon?: React.ReactNode; // Optional prop for right icon
}

const PrimaryBtn: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  disabled,
  to,
  leftIcon, // Destructure leftIcon
  rightIcon, // Destructure rightIcon
}) => {
  const buttonContent = (
    <button
      onClick={onClick}
      className={`flex items-center justify-center py-[1.4rem] px-[10px] lg:px-[35px] text-[1.4rem] lg:text-[1.6rem] rounded-[1rem] w-full ${className}`}
      disabled={disabled}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );

  if (to) {
    return <Link to={to}>{buttonContent}</Link>;
  }

  return buttonContent;
};

export default PrimaryBtn;
