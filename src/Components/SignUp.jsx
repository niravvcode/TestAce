import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'
import GoogleLoginBtn from "./GoogleLoginBtn";
import { Lock, Mail, User } from "lucide-react";
import { UserInput } from "./Input";
import { CardHeader,Typography } from "@material-tailwind/react";


const Signup = () => {
  const [serverError, setserverError] = useState("");
  const [nameError, setnameError] = useState("");
  const [emailError, setemailError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setnameError("");
    setemailError("");
    setemailError("");

    const requestBody = {
      userName: data.userName,
      userEmail: data.userEmail,
      userPassword: data.userPassword,
    };
    try {
      let response = await axios.post(
        "http://localhost:8080/api/register",
        requestBody
      );
      alert(response.data.message);
      navigate("/login");
      
    } catch (error) {
      if (error.response && error.response.status == 400) {
        if (error.response.data.nameError)
          setnameError(error.response.data.nameError);
        setemailError(error.response.data.emailError);
      } else {
        setserverError("Something went wrong, try again");
      }
    }
  };

  

  return (
    <section className="my-10 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="m-3 w-full max-w-md bg-transparent rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 px-4 py-6 sm:p-6">
    
        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6 mt-4"
        >
          
          {serverError && <p className="  ">{serverError}</p>}
          {/* Name Field */}
          <div className="space-y-6">
          <div>
          <UserInput label={"Username"} placeholder={"Enter your Name"} Icon={User}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-700 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              {...register("userName", {
                required: "Name is required",
                minLength: {
                  value: 5,
                  message: "Name must be at least 5 character",
                },
                maxLength: {
                  value: 12,
                  message: "Name cannot exceed 12 character",
                },
              })}
            />
            {nameError && (
              <p className="text-red-500 text-xs pl-2">{nameError}</p>
            )}
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>
          {/* Email Field */}
          <div>
          <UserInput label={"Email"} placeholder={"Enter your email"} Icon={Mail}
              type="email"
              {...register("userEmail", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Invalid email",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {emailError && (
              <p className="text-red-500 text-xs pl-2">{emailError}</p>
            )}
            {errors.userEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userEmail.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
          <UserInput label={"Password"} placeholder={"Enter your password"} Icon={Lock}
              type="password"
              {...register("userPassword", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 character",
                },
                maxLength: {
                  value: 12,
                  message: "Password cannot exceed 12 character",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              
            />
            {errors.userPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <UserInput label={"Confirm password"} placeholder={"Confirm password"} Icon={Lock}
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 character",
                },
                maxLength: {
                  value: 12,
                  message: "Password cannot exceed 12 character",
                },
                validate: (value) =>
                  value === watch("userPassword") || "Passwords do not match",
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white bg-gradient-to-r from-blue-700 to-blue-900 focus:ring-2 hover:scale-102 transition-transform duration-150 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Create an account
          </button>

          {/* sign in with google */}

          <GoogleLoginBtn/>

          {/* Login Redirect */}
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login here
            </NavLink>
          </p>
        </form>
        {/* End Form */}
      </div>
    </section>
  );
};

export default Signup;
