import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaRocket } from "react-icons/fa";

const LiveTest = () => {
  const [tests, setTests] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all live tests
    axios
      .get("http://localhost:8080/api/test/getAll")
      .then((res) => setTests(res.data))
      .catch((err) => console.error("Error fetching tests:", err));
  }, []);

  // Update current time every second for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (startTime) => {
    const diff = new Date(startTime) - currentTime;
    if (diff <= 0) return "Test Started";
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const isTestStarted = (startTime) => new Date(startTime) <= currentTime;

  const isTestExpired = (startTime, duration) => {
    const endTime = new Date(new Date(startTime).getTime() + duration * 60000);
    return currentTime > endTime;
  };

  return (
    <div className="min-h-screen bg-transparent px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 flex items-center justify-center gap-3">
          <FaRocket /> Upcoming Live Tests
        </h1>
        <p className="mt-2 text-gray-600">Join exciting tests and challenge your skills!</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <AnimatePresence>
          {tests.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full bg-white shadow-lg rounded-xl p-8 text-center"
            >
              <p className="text-gray-600 text-lg">No live tests available at the moment.</p>
              <p className="mt-2 text-gray-500">
                Check back later or contact an admin to schedule a test!
              </p>
            </motion.div>
          )}
          {tests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative bg-white shadow-xl rounded-xl p-6 flex flex-col justify-between border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
            >
              <div>
                <h2 className="text-xl font-semibold text-center mb-4 text-blue-900">
                  {test.title}
                </h2>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Topic:</strong> {test.topicName}
                  </p>
                  <p>
                    <strong>Start:</strong>{" "}
                    {new Date(test.startTime).toLocaleString()}
                  </p>
                  <p>
                    <strong>Duration:</strong> {test.duration} minutes
                  </p>
                  <p>
                    <strong>Questions:</strong> {test.noOfQuestions || test.noOfQuestion}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full">
                    <FaClock />
                    {formatCountdown(test.startTime)}
                  </span>
                </div>
              </div>
              <div className="mt-6">
                {isTestExpired(test.startTime, test.duration) ? (
                  <button
                    className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold py-2 rounded-lg hover:scale-105 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-green-300"
                    onClick={() =>
                      navigate("/leaderboard", {
                        state: {
                          testTopicName: test.topicName,
                          test,
                        },
                      })
                    }
                  >
                    See Result
                  </button>
                ) : isTestStarted(test.startTime) ? (
                  <button
                    className="w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold py-2 rounded-lg hover:scale-105 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={() =>
                      navigate("/mcq-test", {
                        state: { testTopicName: test.topicName, test },
                      })
                    }
                  >
                    Start Test
                  </button>
                ) : (
                  <button
                    className="w-full bg-gray-300 text-gray-600 font-semibold py-2 rounded-lg cursor-not-allowed"
                    disabled
                  >
                    Waiting...
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveTest;