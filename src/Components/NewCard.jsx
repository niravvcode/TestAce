import React from "react";
import { DiJava,DiJavascript,DiPython  } from "react-icons/di";
import { useNavigate } from "react-router-dom";

const iconMap = {
  DiJava: DiJava,
  DiJavascript: DiJavascript,
  DiPython : DiPython,
};

const NewCard = ({ topic }) => {
  const navigate = useNavigate();

  const LogoComponent = iconMap[topic.logo];
  return (
    <div className="mt-10 lg:mt-0 group min-h-70 backdrop-blur-lg dark:bg-blue-800 shadow-md relative rounded-2xl my-4 hover:ring hover:ring-blue-800 dark:hover:ring-white transform duration-500 hover:scale-105 hover:shadow-xl">
      <div className="relative h-full w-full overflow-hidden">
        <LogoComponent className="w-60 h-60 left-40 top-[0px] absolute opacity-15 text-blue-900 "/>
      </div>
      <div className="bg-blue-800 flex justify-center items-center w-28 h-28 rounded-full absolute mx-auto right-0 left-0 -inset-y-14 border-4 border-slate-200 dark:border-slate-800 group-hover:bg-white dark:group-hover:bg-blue-800 group-hover:shadow-md transform duration-300">
        <span className="text-5xl md:text-5xl text-white dark:text-slate-800 group-hover:text-blue-800 dark:group-hover:text-white transform duration-">
          {/* <img src={topic.logo} className="text-white" /> */}
          <LogoComponent className="w-15 h-15" />
        </span>
      </div>
      <div className="flex flex-col items-center justify-center absolute mx-auto inset-0 p-4">
        <div>
          <h2 className="text-xl mt-2 pt-10 md:pt-0 capitalize font-bold text-blue-800 dark:text-slate-800 my-4 sm:my-4">
            {topic.topicName}
          </h2>
        </div>
        <div>
          <p className="text-center text-sm  dark:text-white">
            {topic.topicDesc}
          </p>
        </div>
        <div
          className="flex mt-8 border-2 bottom-0 border-blue-800 dark:border-slate-800 dark:text-slate-800 p-2 px-6 capitalize font-semibold text-blue-800 rounded-md group-hover:bg-blue-800 dark:group-hover:bg-slate-800 group-hover:text-white transform ease-in-out delay-75 opacity-85 hover:opacity-100"
          onClick={() => {
            localStorage.setItem("selectedTopic", topic.topicName);
            navigate("/question", { state: { subtopic: topic.subTopics } });
          }}
        >
          view details
        </div>
      </div>
    </div>
  );
};

export default NewCard;
