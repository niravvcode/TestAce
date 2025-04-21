import React from "react";
import { FaFacebook, FaGithub, FaRegCopyright } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className="max-w-screen-xl mx-auto px-5 py-5">
      <div className="flex flex-col gap-5 w-full bg-transparent rounded-2xl py-3">
        <div className=" flex flex-col md:flex-row">
          <div className="px-5 w-full py-4 flex flex-col gap-2 text-gray-900">
            <h2 className="text-2xl font-semibold">TestAce</h2>
            <p className="text-xs font-medium">
              A free MCQ practice platform with topic-wise quizzes, video
              preparation, live tests, scoreboards, and secure authentication
              using Spring Boot.
            </p>
            {/* <p className='text-xs font-medium'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p> */}
          </div>
          <div className="px-2 py-4 w-full flex flex-col gap-2 text-gray-900">
            <h2 className="text-lg font-semibold underline underline-offset-3">
              Contacts
            </h2>
            <p className="text-sm font-medium flex gap-1">
              <span className="font-bold flex gap-2 items-center">
                <FaPhone /> Phone :{" "}
              </span>
              +91 820-024-5496
            </p>
            <p className="text-sm font-medium flex gap-1">
              <span className="font-bold flex gap-2 items-center">
                <FiMail />
                Email :{" "}
              </span>
              testace@gmail.com
            </p>
            <p className="text-sm font-medium flex gap-1">
              <span className="font-bold flex gap-2 items-center">
                <FaLocationDot />
                Address :{" "}
              </span>
              Ahmedabad, India{" "}
            </p>
          </div>
          <div className="px-2 py-4 w-full flex flex-col gap-3 text-black">
            <h2 className="text-lg font-semibold underline underline-offset-3">
              Socials
            </h2>
            <p className="text-2xl flex gap-4 text-gray-900">
              <a
                href="https://twitter.com/your-handle"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                <FaXTwitter className="cursor-pointer" />
              </a>
              <a
                href="https://github.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black"
              >
                <FaGithub className="cursor-pointer" />
              </a>
              <a
                href="https://facebook.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700"
              >
                <FaFacebook className="cursor-pointer" />
              </a>
            </p>
            <p className="text-sm text-slate-700 font-medium">
              Follow us on socials.
            </p>
          </div>
        </div>
        <div className="h-0.5 border bg-black opacity-40 rounded-full mx-5 border-none"></div>
        <div className="flex flex-col sm:flex-row justify-between gap-4 text-xs font-medium text-slate-700 px-5 pb-5">
          <p className="flex gap-2 items-center ">
            <FaRegCopyright /> Copyright 2025 TestAce. All rights reserved
          </p>
          <div>
            <ul className="flex gap-3 sm:gap-5 items-center">
              <NavLink className="cursor-pointer" to="faq">
                F.A.Q
              </NavLink>
              <NavLink className="cursor-pointer" to="privacy-policy">
                Privacy Policy
              </NavLink>
              <NavLink className="cursor-pointer" to="Terms-Condition">
                Terms & Condition
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
