import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import Hero from '../assets/hero7.png'
import { useNavigate } from 'react-router-dom';
import GradientLogo from './GradientLogo';


export default function Home() {
  const navigate = useNavigate();

  const onClickHendle = () => {
    if(localStorage.getItem("sessionOn")){
      navigate("/");
    }else{
      navigate("/login");

    }
  } 
  return (
    <div className="bg-transparent  px-3 sm:p-5 py-5 mb-3">
      <div className="relative max-w-screen-xl h-full flex flex-col flex-wrap items-center justify-between mx-auto px-2 py-4 sm:py-0 bg-transparent sm:flex-row">
        
        <div className='w-full flex flex-col gap-5 sm:gap-2 md:gap-5 lg:gap-10 sm:space-between px-5 items-center sm:items-start sm:w-[65%]'>
          <div className='md:space-y-1 text-center sm:text-left'>
            <h1 className="text-2xl  md:text-3xl lg:text-5xl text-gray-900 font-semibold">Ace Your Exams with </h1>
           <GradientLogo text={"Expert-Curated MCQs"} size={"text-2xl  md:text-3xl lg:text-5xl"}/>
          </div>
          <div className='font-normal md:space-y-1 text-sm md:text-l text-gray-700 text-center sm:text-left'>
            <p>Practice unlimited MCQs for free, track your progress, get instant feedback,</p>
            <p> and improve your knowledge across various topics effortlessly.</p>
          </div>
          <button
            onClick={onClickHendle}
              type="button"
              className="flex cursor-pointer items-center gap-2 text-white w-fit bg-gradient-to-r from-blue-700 to-blue-900 hover:scale-102 transition-transform duration-150 focus:ring-1 focus:outline-none focus:ring-blue-200 font-medium rounded-xl text-xs sm:text-sm px-5 py-2 text-center  shadow-md shadow-gray-400"
            >
              Get started <FaArrowRightLong/>
            </button>
        </div>
        <div className='w-full mt-4 sm:w-[35%]'>
         <div>
         <img src={Hero} alt="Hero" className="w-full h-auto" />
         </div>
        </div>
      </div>
    </div>
  )
}
