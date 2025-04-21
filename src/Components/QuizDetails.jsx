import React from "react";
import { useLocation } from "react-router-dom";

const QuizDetails = () => {
  const location = useLocation();
  const answers = location.state?.answers || [];

  console.log(answers);
  return (
    <div className="p-2 sm:p-6 max-w-screen flex flex-col  items-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Details</h2>

      {answers.map((answer, index) => (
        <div key={answer.questionId} className="mb-6 p-4 border rounded-lg min-w-screen sm:min-w-3xl lg:min-w-4xl">
          <h3 className="text-lg font-medium">{`${index + 1}. ${
            answer.questionText
          }`}</h3>
          <p className="mt-2 font-light ">
            -Correct Answer:{" "}
            <span className="text-green-600">{answer.correctAnswer}</span>
          </p>
          
          <p className="mt-2 font-light">
            -Your Answer:{" "}
            <span className={`mt-1 font-semibold ${
              answer.isTrue ? "text-green-600" : "text-red-600"
            }`}>{answer.option}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuizDetails;
