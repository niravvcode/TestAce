import React, { useEffect, useState } from "react";
import axios from "axios";
import NewCard from "./NewCard"

function Topics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await axios.get("http://localhost:8080/topic/getAll");
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setTopics(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setTopics([]); // Ensure topics is always an array
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopic();
  }, []);

  return (
    <div className="px-3 sm:px-5 mb-3">
      <div className="max-w-screen-xl sm:p-5 bg-transparent rounded-2x ">
        <div className="my-4 p-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <h3 className="mx-4 mb-0 text-center capitalize text-2xl md:text-4xl font-bold text-blue-800">
            Topics
          </h3> 
          
        </div>
        <div className="max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 h-full mx-auto bg-transparent p-2 mt-16">
          {topics.map((topic) => (
            
            <NewCard topic={topic} key={topic.topicId}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Topics;
