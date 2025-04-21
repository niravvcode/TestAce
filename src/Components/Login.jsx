import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import GoogleLoginBtn from "./GoogleLoginBtn";
import { UserInput } from "./Input";
import { Lock,User } from "lucide-react";

const Login = () => {
  const [isError, setisError] = useState("");
  const [loginSucess, setloginSucess] = useState(false);
  const { login} = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setisError("");
    setloginSucess(false);

    const requestBody = {
      userEmail: data.email,
      userPassword: data.password,
    };

    try{
      const response = await axios.post("http://localhost:8080/api/login",requestBody);
      
      if(response.status === 200){
        console.log("logged in " + response.data)
        login(response.data.name, response.data.photo,response.data.email, response.data.jwtToken,response.data.role,response.data.registrationDate);        navigate("/");
      }
    }catch(error){
      navigate("/login");
      setisError(error.response.data);
    }
  };

  return (
    <div className="">
      <section className="dark:bg-gray-900 bg-transparent">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-transparent rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-3 sm:p-6 space-y-4 md:space-y-6">
              <h1 className="text-xl font-bold md:text-2xl dark:text-white text-slate-700">
                Sign in to your account
              </h1>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                {/* Email Field */}
                {isError && (
                  <p className="text-red-500 text-xs mt-1">{isError}</p>
                )}
                <div className="space-y-4">
                  <div>
                  <UserInput label={"Email"} placeholder={"Enter your email"} Icon={User}
                    type="text"
                    id="email"
                    {...register("email", { required: "email is required" })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs  mt-1">
                      {errors.email.message}
                    </p>
                  )}
                  </div>
                
                {/* Password Field */}
                <div>
                <UserInput label={"Password"} placeholder={"Enter your password"} Icon={Lock}
                    type="password"
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                  </div>
                </div>
                {/* Remember Me & Forgot Password */}
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="remember"
                      {...register("remember")}
                      className="w-4 h-4 border border-gray-300 rounded bg-transparent focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <NavLink
                    to="/forgot-password"
                    className="text-sm font-medium text-gray-500 hover:underline"
                  >
                    Forgot password?
                  </NavLink>
                </div> */}
                {/* Submit Button */}
                <button
                  
                  type="submit"
                  className="w-full text-white bg-gradient-to-r from-blue-700 to-blue-900 hover:scale-102 focus:outline-none transition-transform duration-150 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Sign in
                </button>
              
                <GoogleLoginBtn className="bg-transparent"/>
                {/* Sign Up Link */}
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <NavLink
                    to="/signup"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Sign up
                  </NavLink>
                </p>
              </form>
              {/* End Form */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
