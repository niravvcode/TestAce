import React from 'react';

const FAQ = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Frequently Asked Questions</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">How can I start a quiz?</h2>
          <p className="text-gray-700">Go to the topic page, choose your desired topic and subtopic, and click the "Start Quiz" button.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Is this platform free?</h2>
          <p className="text-gray-700">Yes, our MCQ practice platform is completely free to use.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">How is my score calculated?</h2>
          <p className="text-gray-700">Scores are based on correct answers, and in live tests, the time taken may also influence your rank.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;