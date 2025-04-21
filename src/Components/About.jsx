import React from "react";
import Hero from "../assets/About.png";
import { PiCheckBold } from "react-icons/pi";

export default function About() {
  return (
    <div className="max-w-screen-xl mx-auto bg-transparent px-3 sm:p-5 py-3">
      <div>
      <div className="grid grid-cols-1  sm:grid-cols-5  items-center h-full mx-auto bg-transparent overflow-hidden rounded-3xl sm:flex-row">
        <div className="space-y-10 py-5 px-5 sm:col-span-3 ">
          <div className="text-center sm:text-left">
            <h1 className="text-5xl  md:text-7xl text-gray-900 font-semibold">
              Welcome to
            </h1>
            <h1 className="text-5xl  md:text-7xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-900 to-blue-950">
              TestAce,
            </h1>
          </div>
          <p className="text-center sm:text-left font-xl font-medium text-gray-600">
            your ultimate destination for MCQ-based learning and practice. Our
            mission is to provide free, high-quality multiple-choice questions
            (MCQs) across various subjects, helping students, job seekers, and
            professionals enhance their knowledge and test their skills
            effortlessly.
          </p>
        </div>
        <div className="bg-gradient-to-br sm:col-span-2 from-blue-800 to-blue-950 h-full flex justify-center items-center overflow-hidden">
          <img src={Hero} className=""/>
        </div>
        </div>
        <div className="mt-10 sm:p-5 p-1 flex flex-col gap-5 w-full items-start">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center sm:text-left">Why choose us?</h1>
          
          <div className="flex flex-col sm:flex-row gap-2 font-sm lg:font-lg text-left"><div className="text-blue-800 font-semibold text-lg flex gap-2 "><PiCheckBold/><p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-900"> Expert-Curated Questions</p></div>– Our MCQs are designed by industry experts and educators.</div>
          <div className="flex flex-col sm:flex-row gap-2 font-sm lg:font-lg text-left"><div className="text-blue-800 font-semibold text-lg flex gap-2"><PiCheckBold/><p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-900"> Instant Feedback & Progress Tracking</p></div>– Learn and improve with real-time explanations and score</div>
          <div className="flex flex-col sm:flex-row gap-2 font-sm lg:font-lg text-left"><div className="text-blue-800 font-semibold text-lg flex gap-2"><PiCheckBold/><p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-900"> Wide Range of Topics</p></div>– From programming to general knowledge, we cover it all.</div>
          <div className="flex flex-col sm:flex-row gap-2 font-sm lg:font-lg text-left"><div className="text-blue-800 font-semibold flex text-lg gap-2"><PiCheckBold/><p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-900"> Completely Free</p></div>– No hidden costs, just pure learning!</div>
        </div>
      </div>
    </div>
  )
}
