import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaEnvelope,
  FaUserTag,
  FaCalendarAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionOn = localStorage.getItem("sessionOn") === "true";
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const userPhoto = localStorage.getItem("userPhoto");
    const role = localStorage.getItem("role");
    const rDate = localStorage.getItem("registrationDate");
    const token = localStorage.getItem("token");

    console.log("LocalStorage:", {
      sessionOn,
      userName,
      userEmail,
      userPhoto,
      role,
      rDate,
      token,
    });

    if (sessionOn && userName && userEmail && token) {
      setUser({
        userName: userName || "Unknown User",
        userEmail: userEmail || "N/A",
        userPhoto: userPhoto || "https://via.placeholder.com/150",
        userRole: role || "N/A",
        registrationDate: rDate || null,
      });
    } else {
      console.log("Navigating to /login due to missing data");
      setTimeout(() => navigate("/login"), 100);
    }
  }, [navigate]);

  const handleEditProfile = () => {
    navigate("/editProfile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("sessionOn");
    localStorage.removeItem("userPhoto");
    localStorage.removeItem("role");
    localStorage.removeItem("registrationDate");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Sidebar: User Info */}
        <div className="lg:w-1/3 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-xl shadow-2xl p-6 sm:p-8 flex flex-col items-center">
          <div className="relative">
            <img
              src={user.userPhoto}
              alt="Profile"
              onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-lg object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <h2 className="mt-4 text-xl sm:text-2xl font-bold text-center">
            {user.userName}
          </h2>
          <p className="mt-2 text-sm sm:text-base opacity-80 text-center">
            {user.userEmail}
          </p>
          {/* <button
            onClick={handleEditProfile}
            className="mt-6 flex items-center gap-2 bg-white text-indigo-600 font-semibold rounded-full px-5 py-2 shadow-md hover:bg-indigo-100 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <FaEdit />
            Edit Profile
          </button> */}
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-2 bg-red-500 text-white font-semibold rounded-full px-5 py-2 shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {/* Main Content: User Details */}
        <div className="lg:w-2/3 bg-white rounded-xl shadow-xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
            Profile Details
          </h3>
          <div className="space-y-6">
            {/* Role */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <FaUserTag className="text-indigo-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-lg font-medium text-gray-900">{user.userRole}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <FaEnvelope className="text-indigo-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-medium text-gray-900">{user.userEmail}</p>
              </div>
            </div>

            {/* Registration Date */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <FaCalendarAlt className="text-indigo-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Joined</p>
                <p className="text-lg font-medium text-gray-900">
                  {user.registrationDate
                    ? new Date(user.registrationDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}