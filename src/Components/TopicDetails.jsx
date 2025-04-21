import { useState } from "react";
import { motion} from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Links from "./Links";

const TopicDetails = () => {
  const location = useLocation();
  const subtopic = location.state?.subtopic || [];
  const navigate = useNavigate();

  const [completedTopics, setCompletedTopics] = useState([]);
  

  // const toggleCompletion = (index) => {
  //   setCompletedTopics((prev) =>
  //     prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
  //   );
  // };

  const handleOnClick = () => {
    navigate("/mcq-test");
  };

  const selectedTopic = localStorage.getItem("selectedTopic");

  const progress = (completedTopics.length / subtopic.length) * 100;

  return (
    <div className="max-w-screen-xl mx-auto px-2 sm:px-6 md:px-10 lg:px-20 space-y-3 min-h-screen mt-5">
      <div className="border-l-10 border-blue-900 text-gray-800 px-5 py-2 space-y-4 bg-transparent  mt-4">
        <h1 className="text-4xl font-bold ">{selectedTopic}</h1>
        <p className="text-sm  font-medium">
          Master the key concepts of{" "}
          <span className="text-blue-700 font-bold">{selectedTopic}</span> with
          interactive videos and step-by-step explanations. Track your progress
          and challenge yourself with a quiz at the end!
        </p>
      </div>
      {/* Progress Bar */}
      {/* <div className="space-y-3 text-slate-900 bg-transparent p-2 sm:p-10  rounded-2xl">
        <h2 className="text-lg font-semibold text-blue-900 ">
          Your Progress
        </h2>
        <div className="relative w-full bg-blue-200 rounded-full h-4 overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            className="bg-indigo-600 h-full"
          ></motion.div>
        </div>
      </div> */}

    <Links subTopics={subtopic}/>
      {/* Take a Test Section */}
      
      <div className="sm:px-5 py-1 sm:py-3 mb-5 ">
        <button 
        onClick={handleOnClick}
        className="px-4 py-2 font-medium border-2 border-blue-900 rounded-2xl text-blue-900 hover:bg-blue-900 hover:text-white hover:scale-110 transition-all duration-300">Start Test</button>
      </div>
      
    </div>
  );
};

export default TopicDetails;
