import React, { useState } from "react";
import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import Loginbtn from "./Loginbtn";
import SignUpBtn from "./SignUpBtn";
import MenuBtn from "./MenuBtn";
import LogoutBtn from "./LogoutBtn";
import { useAuth } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import ProfileBtn from "./ProfileBtn";

const Navbarr = () => {
  const { isSessionOn } = useAuth();
  console.log(isSessionOn);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <header className="backdrop-blur-lg sticky top-0 z-50 shadow-xs shadow-gray-200">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo Always Visible */}
        <NavLogo />

        {/* Menu Button Only on Mobile */}
        <div onClick={() => setIsOpenMenu(!isOpenMenu)} className="sm:hidden flex gap-1">
        <ProfileBtn/>
          <MenuBtn />
          
        </div>

        {/* Desktop Navigation Links - Hidden on Mobile */}
        <div className="hidden sm:flex">
          <NavLinks />
        </div>

        {/* Desktop Auth Buttons - Hidden on Mobile */}
        <div className="hidden sm:flex space-x-2">
          {isSessionOn ? (
            <div className="flex gap-2">
              <LogoutBtn />
              <ProfileBtn />
            </div>
          ) : (
            <div className="flex gap-2">
              <Loginbtn />
              <SignUpBtn />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu (Shown Only When Open) */}
      <AnimatePresence>
        {isOpenMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col w-full items-end gap-5 sm:hidden p-4 bg-transparent shadow-md overflow-hidden"
          >
            <NavLinks />
            <div className="space-x-2 flex">
              {isSessionOn ? (
                <div className="flex gap-2">
                  <LogoutBtn />
                </div>
              ) : (
                <div className="flex gap-2">
                  <Loginbtn />
                  <SignUpBtn />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbarr;
