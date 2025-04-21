import React, { useState } from "react";
import { FaBars,FaXmark } from "react-icons/fa6";


const MenuBtn = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
  return (
    <button
      onClick={() => setIsOpenMenu(!isOpenMenu)}
      className="flex text-gray-800 text-xl p-0.5 sm:hidden items-center sm:p-2  justify-center  sm:text-sm rounded-sm md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
    >
      {isOpenMenu ? <FaXmark /> : <FaBars />}
    </button>
  );
};

export default MenuBtn;
