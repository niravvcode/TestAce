import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const currentUser = localStorage.getItem("userName");

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [filteredScores, setFilteredScores] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [allTopics, setAllTopics] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const location = useLocation();
  const liveTestData = location.state?.test;
  const topicFromLiveTest = location.state?.testTopicName || null;

  useEffect(() => {
    
    const fetchScore = async () => {
      try {
        let response;
        if (topicFromLiveTest) {
          console.log(liveTestData.id);
          response = await axios.get(`http://localhost:8080/api/test/getResultByName/${liveTestData.id}`);
          setScores(response.data);
          setFilteredScores(response.data);
        } else {
          response = await axios.get("http://localhost:8080/score/getScore");
          setScores(response.data);
          setFilteredScores(response.data);

          const topics = [...new Set(response.data.map(score => score.topicName))];
          setAllTopics(["All", ...topics]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchScore();
  }, [topicFromLiveTest]);

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    setDropdownOpen(false);
    if (topic === "All") {
      setFilteredScores(scores);
    } else {
      setFilteredScores(scores.filter(score => score.topicName === topic));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 min-h-screen">
      <div className="flex justify-between my-10">
      <h1 className="text-3xl font-bold text-center text-blue-900">🏆 Leaderboard</h1>

      {/* Custom Dropdown for Topic Filter */}
      {!topicFromLiveTest && (
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
              id="menu-button"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              {selectedTopic === "All" ? "Filter by Topic" : selectedTopic}
              <svg
                className="-mr-1 size-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {dropdownOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                {allTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTopicChange(topic)}
                    className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                      selectedTopic === topic ? "font-semibold text-blue-700" : ""
                    }`}
                    role="menuitem"
                    tabIndex="-1"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      </div>

      {/* Leaderboard List */}
      <div className="space-y-4">
        {filteredScores.map((score, index) => {
          const isCurrentUser = score.userName === currentUser;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex justify-between items-center p-4 rounded-lg shadow-md ${
                isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg font-semibold">{index + 1}.</span>
                {index === 0 && <Trophy className="text-yellow-500" size={20} />}
                {index === 1 && <Trophy className="text-gray-400" size={20} />}
                {index === 2 && <Trophy className="text-orange-400" size={20} />}
                <span className="text-lg font-semibold">{score.userName}</span>
              </div>
              <div className="text-right">
                <span className="block text-lg font-bold">{score.score} pts</span>
                <span className="text-sm text-gray-600">{score.topicName}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
