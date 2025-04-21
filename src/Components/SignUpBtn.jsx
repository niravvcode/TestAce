import React from "react";
import * as motion from "motion/react-client";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";


const SignUpBtn = () => {

    const navigate  = useNavigate();

  return (
   <motion.button
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         onClick={() => {
           navigate("/signup")
         }}
         type="button"
         className="text-white cursor-pointer shadow shadow-gray-400 bg-gradient-to-r from-blue-700 to-blue-900  font-medium rounded-full text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2 text-center"
       >
         Sign up
       </motion.button>
  );
};

export default SignUpBtn;
