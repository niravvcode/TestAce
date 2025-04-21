import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { MoveLeft, MoveRight, X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const QuizComponent = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showModal, setShowModal] = useState(true); // Show modal on page load
  const [showSummary, setShowSummary] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showSubmit, setShowSubmit] = useState(false);
  const [exitModel, setExitModel] = useState(false);
  const [noOfQuestion, setnoOfQuestion] = useState(0);
  const [duration, setDuration] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isLiveTest = location.state?.testTopicName !== undefined;
  const topicName = isLiveTest
    ? location.state.testTopicName
    : localStorage.getItem("selectedTopic");

  const liveTestData = location.state?.test;
  const [timeLeft, setTimeLeft] = useState(
    isLiveTest ? (liveTestData?.duration || 10) * 60 : 600
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLiveTest) {
          setnoOfQuestion(liveTestData.noOfQuestion);
          console.log(liveTestData.noOfQuestion)
          setDuration(liveTestData.duration);
          const response = await axios.get(
            `http://localhost:8080/question/getQuestion?topicName=${topicName}&noOfQuestions=${liveTestData.noOfQuestion}`
          );
          setQuestions(response.data);
        } else {
          setnoOfQuestion(25);
          setDuration(10);
          const response = await axios.get(
            `http://localhost:8080/question/getQuestion?topicName=${topicName}&noOfQuestions=25`
          );
          setQuestions(response.data);
        }
      } catch (error) {
        console.log("Error fetching questions:", error);
      }
    };

    fetchData();

    let timer;
    if (!showModal) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // required for Chrome
    };

    const handlePopState = (e) => {
      e.preventDefault();
      setExitModel(true);
      window.history.pushState(null, "", window.location.pathname);
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => {
      clearInterval(timer);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [showModal]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedAnswer(null);
    }
  };

  const submitResult = async () => {
    try {
      const fullDuration = isLiveTest
        ? (liveTestData?.duration || 10) * 60
        : 600;
      const durationInSeconds = fullDuration - timeLeft;
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = durationInSeconds % 60;
      const formattedDuration = `${minutes}m ${seconds}s`;
  
      if (!isLiveTest) {
        setShowSummary(true);
  
        const requestBody = {
          userName: localStorage.getItem("userName"),
          topicName: localStorage.getItem("selectedTopic"),
          score: answers.filter((a) => a.isTrue).length,
          attemptedDate: new Date().toISOString(),
          duration: formattedDuration,
        };
  
        const response = await axios.post(
          "http://localhost:8080/score/addScore",
          requestBody
        );
        console.log(response.data);
      } else {
        const requestBody = {
          userName: localStorage.getItem("userName"),
          testTopic: topicName,
          score: answers.filter((a) => a.isTrue).length,
          submittedAt: new Date().toISOString(),
          duration: formattedDuration,
        };
  
        const response = await axios.post(
          "http://localhost:8080/api/test/submitTest",
          requestBody
        );
        console.log(response);
        setShowSubmit(false);
  
        // ✅ Redirect to home after submission
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleQuestionSelect = (index) => {
    setCurrentQuestion(index);
    setSelectedAnswer(null);
  };

  const handleSubmit = () => {
    setShowSubmit(true);
  };

  const setUserAnswers = (questionId, questionText, correctAnswer, option) => {
    const isTrue = correctAnswer === option;

    setAnswers((prev) => {
      const filteredAnswer = answers.filter((a) => a.questionId != questionId);
      return [
        ...filteredAnswer,
        { questionId, questionText, correctAnswer, option, isTrue },
      ];
    });
  };

  return (
    <>
      {exitModel && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-gray-900">TestAce says</h2>
            <p className="mt-2 text-gray-700">
              Are you sure you want to leave the quiz?
            </p>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => {
                  setExitModel(false);
                }}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Leave Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {showSubmit && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-3 rounded-lg shadow-lg w-96 flex flex-col">
            <button
              className="self-end text-md text-gray-600"
              onClick={() => setShowSubmit(false)}
            >
              <X />
            </button>
            <h2 className="text-xl font-semibold my-4 text-center text-gray-900">
              Are you sure want to Submit?
            </h2>

            <button
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              onClick={() => submitResult()}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-gray-900">
              Test Instructions
            </h2>
            <p className="mt-2 text-gray-700">
              - You have {noOfQuestion} questions to answer.
            </p>
            <p className="text-gray-700">- Time limit: {duration} minutes.</p>
            <p className="text-gray-700">
              - Once you start, the timer will begin.
            </p>
            <button
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              onClick={() => setShowModal(false)}
            >
              Start Test
            </button>
          </div>
        </div>
      )}

      {showSummary && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-gray-900">Test Summary</h2>
            <p className="mt-2 text-gray-700">
              - Questions Answered: {answers.length}
            </p>
            <p className="text-gray-700">
              - Questions Skipped: {questions.length - answers.length}
            </p>
            <p className="text-gray-700">
              - True: {answers.filter((a) => a.isTrue === true).length}
            </p>
            <p className="text-gray-700">
              - False: {answers.filter((a) => a.isTrue === false).length}
            </p>
            <button
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              onClick={() =>
                navigate("/questionDetail", { state: { answers } })
              }
            >
              See details
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row min-h-screen p-2 sm:p-6 bg-transparent">
        {/* Left Panel - Timer & Questions */}
        <div className="w-full md:w-1/4 p-4 bg-transparent shadow-lg rounded-2xl flex flex-col items-center">
          <div className="relative flex flex-col items-center">
            <CircularProgress
              variant="determinate"
              value={(timeLeft / 600) * 100}
              size={80}
              thickness={4}
              className="text-orange-500"
              sx={{ color: "#1E3A8A" }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-800">
              {formatTime(timeLeft)}
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">{`${
            currentQuestion + 1
          }/${questions.length}`}</div>

          {/* Question Navigation */}
          <div className="grid w-full grid-cols-4 gap-2 mt-6">
            {questions.map((_, index) => {
              const isAnswered = answers.some(
                (a) => a.questionId === questions[index]?.questionId
              );
              return (
                <button
                  key={index}
                  className={`p-2 w-full font-medium border rounded-full ${
                    isAnswered
                      ? "bg-blue-900 text-white" // Answered questions
                      : currentQuestion === index
                      ? "bg-blue-900 text-white" // Currently selected question
                      : "bg-transparent text-blue-900 border-blue-900" // Unanswered questions
                  }`}
                  onClick={() => handleQuestionSelect(index)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel - Question & Options */}
        <div className="w-full md:w-3/4 p-2 sm:p-6 bg-transparent shadow-lg rounded-2xl md:ml-6">
          <h2 className="mt-3 sm:mt-0 text-xl sm:text-2xl font-semibold text-gray-900">
            {questions.length > 0
              ? questions[currentQuestion]?.questionText
              : "Loading..."}
          </h2>

          {/* ✅ Define options inside JSX */}
          {questions.length > 0 && (
            <div className="mt-4 space-y-3">
              {[
                questions[currentQuestion]?.optionA,
                questions[currentQuestion]?.optionB,
                questions[currentQuestion]?.optionC,
                questions[currentQuestion]?.optionD,
              ].map((option, index) => (
                <motion.div
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 border text-sm sm:text-md rounded-lg cursor-pointer ${
                    selectedAnswer === index
                      ? "border-blue-700"
                      : "bg-transparent border-gray-300"
                  }`}
                  onClick={() => {
                    setSelectedAnswer(index);
                    setUserAnswers(
                      questions[currentQuestion]?.questionId,
                      questions[currentQuestion]?.questionText,
                      questions[currentQuestion]?.correctAnswer,
                      option
                    );
                    handleNext();
                  }}
                >
                  {option}
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button
              className={`px-4 py-2 flex gap-3 text-gray-900 font-medium rounded-lg bg-transparent ${
                currentQuestion > 0 ? "" : " cursor-not-allowed"
              }`}
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <MoveLeft /> Previous
            </button>
            {currentQuestion < questions.length - 1 ? (
              <button
                className="px-4 py-2 flex gap-3 text-gray-900 bg-transparent font-medium rounded-lg"
                onClick={handleNext}
              >
                Next <MoveRight />
              </button>
            ) : (
              <button
                className="px-4 py-2 text-gray-900 font-medium rounded-lg"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizComponent;
