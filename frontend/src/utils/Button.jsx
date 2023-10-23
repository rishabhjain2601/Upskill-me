import React from "react";

const Button = ({ children, fontSize = "17px", onClick }) => {
  return (
    <div
      onClick={onClick}
      className="button text-center "
      style={{ fontSize: fontSize }}
    >
      {children}
    </div>
  );
};

export default Button;
