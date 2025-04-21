import React from "react";
import * as motion from "motion/react-client";
import { useNavigate } from "react-router-dom";

const Loginbtn = () => {
  const navigate = useNavigate("/login");

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative inline-block"
    >
      <div className="absolute  inset-0 bg-gradient-to-r from-blue-500 to-blue-900 rounded-full blur-xs "></div>
      <button
        onClick={() => {
          navigate("/login");
        }}
        type="button"
        className="relative  text-xs sm:text-sm z-10 p-[1.5px] rounded-full bg-gradient-to-r from-blue-500 to to-blue-900"
      >
        <div className="px-4 cursor-pointer sm:px-5 py-2 bg-white font-medium rounded-full text-blue-800">
          Login
        </div>                                                                                                                                                                                                                           
      </button>
    </motion.div>
  );
};

export default Loginbtn;
