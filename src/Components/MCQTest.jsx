import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const MCQTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(900);
  const [showResult, setShowResult] = useState(false);

  const {userName} = useAuth()

  useEffect(() => {
    const selectedTopic = localStorage.getItem("selectedTopic");
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/question/getQuestion?topicName=${selectedTopic}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (question, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [question.questionId]: option }));
    setCurrentIndex((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
  };

  const difficultyColors = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-red-500",
  };

  const submitScore = async () => {
    const requestBody = {
      userName: userName,
      topicName: localStorage.getItem("selectedTopic"),
      duration: `${Math.floor((900 - timeLeft) / 60)}m ${((900 - timeLeft) % 60)}s`,
      score: Object.values(selectedAnswers).filter(
        (ans, index) => ans === questions[index].correctAnswer
      ).length,
      attemptedDate: new Date().toISOString(), // Converts date to a proper format
    };
  
    try {
      const response = await axios.post("http://localhost:8080/score/addScore", requestBody);
      console.log("Score submitted successfully:", response.status);
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 min-h-screen">
      {showResult ? (
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-blue-900">Test Completed</h1>
          <p className="text-xl">
            Your Score: <strong>{Object.values(selectedAnswers).filter(
              (ans, index) => ans === questions[index].correctAnswer
            ).length} / {questions.length}</strong>
          </p>

          <div className="space-y-4">
            {questions.map((q) => (
              <div key={q.questionId} className="border rounded-xl p-4 shadow-md bg-white">
                <h2 className="text-lg font-semibold text-blue-900">{q.questionText}</h2>
                <p className="text-sm">Correct Answer: <strong className="text-green-600">{q.correctAnswer}</strong></p>
                <p className={`text-sm ${selectedAnswers[q.questionId] === q.correctAnswer ? "text-green-600" : "text-red-600"}`}>
                  Your Answer: <strong>{selectedAnswers[q.questionId] || "Not Answered"}</strong>
                </p>
                {selectedAnswers[q.questionId] && selectedAnswers[q.questionId] !== q.correctAnswer && (
                  <p className="text-sm text-red-600">❌ Wrong Answer: {selectedAnswers[q.questionId]}</p>
                )}
              </div>
            ))}
          </div>

          <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
            Retake Test
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center text-blue-800 font-semibold text-lg">
            <span>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</span>
            <span>Question {currentIndex + 1} / {questions.length}</span>
          </div>

          {questions.length > 0 && (
            <div className="border rounded-xl shadow-md bg-white p-5">
              <div className="flex justify-end mb-2">
                <span className={`px-3 py-1 text-white text-xs rounded-lg ${difficultyColors[questions[currentIndex].difficultyLevel] || "bg-gray-500"}`}>
                  {questions[currentIndex].difficultyLevel}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-blue-900">{questions[currentIndex].questionText}</h2>
              <div className="space-y-3 mt-4">
                {["optionA", "optionB", "optionC", "optionD"].map((key, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleAnswerSelect(questions[currentIndex], questions[currentIndex][key])}
                    whileTap={{ scale: 0.9 }}
                    className={`w-full p-3 text-left rounded-lg border ${selectedAnswers[questions[currentIndex].questionId] === questions[currentIndex][key] ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                  >
                    {questions[currentIndex][key]}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 justify-center">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${currentIndex === index ? "bg-blue-700 text-white" : "bg-gray-300"}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))}
              disabled={currentIndex === 0}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => {
                setShowResult(currentIndex === questions.length - 1);
                submitScore()
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {currentIndex === questions.length - 1 ? "Submit Test" : "Next"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MCQTest;
