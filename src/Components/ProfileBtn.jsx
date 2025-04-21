import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

const ProfileBtn = () => {
  const { userName, userPhoto } = useAuth();
  const [openProfile, setOpenProfile] = useState(false)
  const navigate = useNavigate();
  return (
    <div 
    onClick={() => navigate("/profile")}
    className="cursor-pointer  relative border border-blue-700 pl-3 pr-4 py-1 font-medium rounded-full text-xs sm:text-sm  text-center flex items-center gap-1">
      {userPhoto && (
        <img src={userPhoto} alt="Profile" className="w-6 h-6 rounded-full" />
      )}  Hi
      <p>{userName}</p>
      {openProfile && <Profile setOpenProfile={setOpenProfile}/> }
    </div>
  );
};

export default ProfileBtn;
