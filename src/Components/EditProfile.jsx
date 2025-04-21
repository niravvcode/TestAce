import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaSave, FaArrowLeft, FaSignOutAlt } from "react-icons/fa";

const EditProfile = () => {
  const [serverError, setServerError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    const sessionOn = localStorage.getItem("sessionOn") === "true";
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const userPhoto = localStorage.getItem("userPhoto");
    const role = localStorage.getItem("role");
    const registrationDate = localStorage.getItem("registrationDate");
    const token = localStorage.getItem("token");

    console.log("LocalStorage:", {
      sessionOn,
      userName,
      userEmail,
      userPhoto,
      role,
      registrationDate,
      token,
    });

    if (sessionOn && userName && userEmail && token) {
      const userData = {
        userName: userName || "Unknown User",
        userEmail: userEmail || "N/A",
        userPhoto: userPhoto || "https://via.placeholder.com/150",
        userRole: role || "N/A",
        registrationDate: registrationDate || null,
      };
      setUser(userData);
      reset({
        userName: userData.userName,
        userEmail: userData.userEmail,
        userPhoto: userData.userPhoto,
      });
    } else {
      console.log("Navigating to /login due to missing data");
      setTimeout(() => navigate("/login"), 100);
    }
  }, [navigate, reset]);

  const onSubmit = async (data) => {
    setServerError("");
    try {
      // Update localStorage with new data
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("userEmail", data.userEmail);
      localStorage.setItem("userPhoto", data.userPhoto);

      // Update user state
      setUser({
        ...user,
        userName: data.userName,
        userEmail: data.userEmail,
        userPhoto: data.userPhoto,
      });

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      setServerError("Something went wrong, please try again");
    }
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
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
          <button
            onClick={() => navigate("/profile")}
            className="mt-6 flex items-center gap-2 bg-white text-indigo-600 font-semibold rounded-full px-5 py-2 shadow-md hover:bg-indigo-100 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <FaArrowLeft />
            Back to Profile
          </button>
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-2 bg-red-500 text-white font-semibold rounded-full px-5 py-2 shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {/* Main Content: Edit Form */}
        <div className="lg:w-2/3 bg-white rounded-xl shadow-xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
            Edit Profile
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-700 focus:border-blue-500 block w-full p-2.5"
                {...register("userName", {
                  required: "Username is required",
                  minLength: {
                    value: 5,
                    message: "Username must be at least 5 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Username cannot exceed 12 characters",
                  },
                })}
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register("userEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Invalid email",
                  },
                })}
              />
              {errors.userEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userEmail.message}
                </p>
              )}
            </div>

            {/* Photo URL Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Photo URL
              </label>
              <input
                type="url"
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register("userPhoto", {
                  required: "Photo URL is required",
                  pattern: {
                    value: /^https?:\/\/.+$/,
                    message: "Invalid URL",
                  },
                })}
              />
              {errors.userPhoto && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userPhoto.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-700 to-blue-900 focus:ring-2 hover:scale-105 transition-transform duration-150 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              <FaSave />
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;