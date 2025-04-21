import { Mail, User, MessageSquareText } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { UserInput } from "./Input";
import TextArea from "./TextArea";
import axios from "axios";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  // Debug form state
  const userMessage = watch("userMessage");
  console.log("userMessage:", userMessage);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/contact/add",
        {
          name: data.userName,
          email: data.email,
          message: data.userMessage,
        }
      );
      alert("✅ Message sent successfully!");
      reset();
    } catch (error) {
      console.error("❌ Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <section className="max-w-screen-xl mx-auto my-10 py-10 px-3 md:px-5 dark:bg-gray-900 flex flex-col gap-3 md:gap-1 md:flex-row">
      <div className="flex text-left sm:w-[40%] md:w-[45%] flex-col md:py-10 h-fit px-3 md:px-0">
        <h1 className="text-2xl md:text-3xl lg:text-7xl text-gray-900 font-semibold">
          How can we help you,
        </h1>
        <h1 className="text-2xl md:text-3xl lg:text-7xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-900">
          Get in touch
        </h1>
      </div>

      <div className="w-full sm:w-[60%] md:w-[55%] h-fit bg-transparent rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 px-2 sm:p-6 py-6">
        <h1 className="text-xl font-bold text-center text-gray-900 md:text-3xl dark:text-white">
          Contact us
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6 mt-4"
        >
          {/* Username */}
          <div>
            <UserInput
              label={"Username"}
              placeholder={"Enter your Name"}
              Icon={User}
              type="text"
              id="userName"
              {...register("userName", { required: "Username is required" })}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <UserInput
              label={"Email"}
              placeholder={"Enter your email"}
              Icon={Mail}
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <TextArea
              Icon={MessageSquareText}
              placeholder="Enter your message"
              {...register("userMessage", {
                required: "Message is required",
                minLength: {
                  value: 3,
                  message: "Message must be at least 3 characters",
                },
              })}
            />
            {errors.userMessage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userMessage.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white cursor-pointer bg-gradient-to-r from-blue-700 to-blue-950 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
}