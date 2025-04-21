import React from "react";
import * as motion from "motion/react-client";
import { useAuth } from "../Context/AuthContext";

const LogoutBtn = () => {

  const {logout} = useAuth();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        logout();
      }}
      type="button"
      className="text-white cursor-pointer shadow shadow-gray-400 bg-gradient-to-r from-blue-700 to-blue-900  font-medium rounded-full text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2 text-center"
    >
      logout
    </motion.button>
  );
};

export default LogoutBtn;
