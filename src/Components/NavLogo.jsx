import React from "react";

const NavLogo = () => {
  return (
    <span
      onClick={() => navigate("/")}
      className="cursor-pointer text-2xl md:text-3xl font-semibold whitespace-nowrap bg-gradient-to-r from-blue-700 to-blue-900 text-transparent bg-clip-text"
    >
      TestAce
    </span>
  );
};

export default NavLogo;
