import React from "react";
import clsx from "clsx";

type Variant = "primary" | "tertiary";

interface Props {
  text: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<Props> = ({
  text,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}) => {
  const baseClasses =
    "w-full px-4 py-2 rounded-xl text-center font-medium transition-all duration-100 hover:cursor-pointer";

  const variantClasses = {
    primary: "bg-primary-100 text-white hover:bg-primary-100/90",
    tertiary: "bg-background-300 text-primary-100 hover:bg-background-300/90",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(className, baseClasses, variantClasses[variant])}
    >
      {text}
    </button>
  );
};

export default Button;
