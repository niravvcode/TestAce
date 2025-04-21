import { ArrowDown, Check, ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Links = ({ subTopics }) => {
  console.log(subTopics);

  if (!subTopics.length) {
    return <p className="text-gray-500 text-center">No subtopics available.</p>;
  }

  const [expandedVideo, setExpandedVideo] = useState(null);
  const [completedVideos, setCompletedVideos] = useState({});

  const toggleVideo = (index) => {
    setExpandedVideo(expandedVideo === index ? null : index);
  };

  const markAsCompleted = (id) => {
    setCompletedVideos((prev) => {
      const updated = { ...prev };
      if (updated[id]) {
        delete updated[id]; // Remove from completed if already marked
      } else {
        updated[id] = true; // Mark as completed
      }
      return updated;
    });
  };
  

  const allCompleted = Object.keys(completedVideos).length === subTopics.length;

  return (
    <div className="sm:p-4 w-full mx-auto dark:bg-gray-800">
      <h2 className="font-heading dark:text-gray-100 text-gray-900 mb-8 text-xl qsm:text-3xl font-bold lg:text-2xl">
        Watch these videos to master the concepts before taking the quiz!
      </h2>

      {subTopics.map((subtopic, index) => (
        <div className="flex" key={subTopics.subTopicId}>
          {/* Left Icon & Border */}
          <div className="mr-4 flex flex-col items-center">
            <div
              className={`flex p-2 items-center justify-center rounded-full border-2 ${
                completedVideos[subtopic.subTopicId]
                  ? "bg-blue-900 text-white border-blue-900"
                  : "text-blue-900 border-blue-900"
              }`}
            >
              {completedVideos[subtopic.subTopicId] ? <Check /> : <ArrowDown />}
            </div>
            {/* ✅ Border turns blue when completed */}
            <div
              className={`h-full w-0.5 ${
                completedVideos[subtopic.subTopicId]
                  ? "bg-blue-900"
                  : "bg-gray-300 dark:bg-slate-500"
              }`}
            ></div>
          </div>

          {/* Video Details */}
          <div className="pt-1 pb-8 w-full space-y-2">
            <button
              className="mb-2 text-xl font-medium text-gray-900 dark:text-slate-300 flex justify-between w-[100%]"
              onClick={() => toggleVideo(subtopic.subTopicId)}
            >
              <p>{subtopic.subTopicName}</p>
              {expandedVideo === subtopic.subTopicId ? (
                <ChevronUp />
              ) : (
                <ChevronDown />
              )}
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: expandedVideo === subtopic.subTopicId ? "auto" : 0,
                opacity: expandedVideo === subtopic.subTopicId ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {expandedVideo === subtopic.subTopicId && (
                <iframe
                width="450"
                height="250"
                src={subtopic.subTopicVidioLink.replace("youtu.be/", "www.youtube.com/embed/")}
                title={subtopic.subTopicName}
                frameBorder="0"
                allowFullScreen
                className="rounded-2xl mt-3 bg-cover"
              />
              
              )}

              <button
                onClick={() => markAsCompleted(subtopic.subTopicId)}
                className={`my-2 rounded-2xl w-full border-2 py-2 font-semibold transition-all ${
                completedVideos[subtopic.subTopicId]
                  ? "bg-blue-900 text-white"
                  : "bg-transparent  border-blue-900 text-blue-900"}`}
              >
                Mark as Completed
              </button>
            </motion.div>
          </div>
        </div>
      ))}

      {/* Final Exam Readiness Message */}
      <div className="flex">
        <div className="mr-4 flex flex-col items-center">
          <div
            className={`flex p-2 items-center justify-center rounded-full border-2 ${
              allCompleted
                ? "bg-blue-900 text-white border-blue-900"
                : "text-blue-900 border-blue-900"
            } `}
          >
            <Check className="" />
          </div>
        </div>
        <div className="">
          <p className="mb-2  text-xl font-bold text-blue-900">
            You are ready to give the exam!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Links;
