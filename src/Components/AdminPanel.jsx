import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaPlusCircle,
  FaUsers,
  FaFileAlt,
  FaHome,
  FaSignOutAlt,
  FaBars,
  FaEnvelope,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const [selected, setSelected] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [testData, setTestData] = useState({
    title: "",
    topicName: "",
    startTime: "",
    endTime: "",
    duration: "",
    noOfQuestions: "",
  });

  const [topicData, setTopicData] = useState({
    topicName: "",
    topicDesc: "",
    logo: "",
    subTopics: [],
  });

  const [question, setQuestion] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    difficultyLevel: "easy",
    topicName: "",
    subTopic: {
      subTopicId: "4",
    },
  });

  const handleTestInputChange = (e) => {
    setTestData({ ...testData, [e.target.name]: e.target.value });
  };

  const handleTopicChange = (e) => {
    const { name, value } = e.target;
    setTopicData({ ...topicData, [name]: value });
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    if (name === "subTopic") {
      setQuestion({
        ...question,
        subTopic: { subTopicId: value },
      });
    } else {
      setQuestion({
        ...question,
        [name]: value,
      });
    }
  };

  const handleSubmitQuestion = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/question/addOneQuestion",
        question
      );
      console.log("✅ Question added:", response.data);
      alert("Question added successfully!");
    } catch (error) {
      console.error("❌ Failed to add question:", error);
      alert("Failed to add question!");
    }
  };

  const addTopic = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/topic/add",
        topicData
      );
      alert("✅ Topic added successfully!");
      setTopicData({
        topicName: "",
        topicDesc: "",
        logo: "",
        subTopics: [],
      });
    } catch (error) {
      console.error("❌ Error adding topic:", error);
      alert("Failed to add topic.");
    }
  };

  const assignTest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/test/add",
        testData
      );
      alert("✅ Test assigned successfully!");
      setTestData({
        title: "",
        topicName: "",
        startTime: "",
        endTime: "",
        duration: "",
        noOfQuestions: "",
        isActive: false,
      });
    } catch (error) {
      console.error("❌ Error assigning test:", error);
      alert("Failed to assign test.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("sessionOn");
    localStorage.removeItem("userPhoto");
    localStorage.removeItem("role");
    localStorage.removeItem("registrationDate");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/getAllUser");
        setUsers(response.data);
      } catch (error) {
        console.error("❌ Error fetching users:", error);
      }
    };

    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/contact/all");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("❌ Error fetching feedbacks:", error);
      }
    };

    fetchUsers();
    fetchFeedbacks();
  }, []);

  const renderContent = () => {
    switch (selected) {
      case "dashboard":
        return (
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage users, topics, tests, questions, and feedbacks with ease.
            </p>
          </div>
        );
      case "users":
        return (
          <div className="bg-white shadow-lg rounded-xl p-6 w-full overflow-x-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <FaUsers /> List of Users
            </h1>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  {/* <th className="py-3 px-4 text-center">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr
                      key={user.userId}
                      className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                    >
                      <td className="py-3 px-4">{user.userId}</td>
                      <td className="py-3 px-4">{user.userName}</td>
                      <td className="py-3 px-4">{user.userEmail}</td>
                      <td className="py-3 px-4 capitalize">{user.userRole}</td>
                      <td className="py-3 px-4 text-center">
                        {/* <button
                          className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md mr-2 transition-transform duration-150 hover:scale-105"
                          onClick={() => alert("Edit user not implemented")}
                        >
                          Edit
                        </button>
                        <button
                          className="text-white bg-red-600 hover:bg-red-600 px-3 py-1 rounded-md transition-transform duration-150 hover:scale-105"
                          onClick={() => alert("Delete user not implemented")}
                        >
                          Delete
                        </button> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
      case "addTopic":
        return (
          <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <FaPlusCircle /> Add Topic
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Topic Name
                </label>
                <input
                  type="text"
                  name="topicName"
                  value={topicData.topicName}
                  placeholder="Enter topic name"
                  onChange={handleTopicChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="topicDesc"
                  value={topicData.topicDesc}
                  placeholder="Enter description"
                  rows="4"
                  onChange={handleTopicChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Topic Logo URL
                </label>
                <input
                  type="url"
                  name="logo"
                  value={topicData.logo}
                  placeholder="Enter logo URL"
                  onChange={handleTopicChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={addTopic}
                className="w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold py-2 rounded-lg hover:scale-105 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Add Topic
              </button>
            </div>
          </div>
        );
      case "assignTest":
        return (
          <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <FaFileAlt /> Assign Test
            </h1>
            <div className="space-y-4">
              {Object.entries(testData).map(([key, value]) =>
                key !== "isActive" && (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type={"text"}
                      name={key}
                      value={value}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                      onChange={handleTestInputChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )
              )}
              <button
                onClick={assignTest}
                className="w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold py-2 rounded-lg hover:scale-105 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Assign Test
              </button>
            </div>
          </div>
        );
      case "addQuestion":
        return (
          <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <FaFileAlt /> Add Question
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Question Text
                </label>
                <textarea
                  name="questionText"
                  value={question.questionText}
                  placeholder="Enter question"
                  rows="3"
                  onChange={handleQuestionChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Option A
                </label>
                <input
                  type="text"
                  name="optionA"
                  value={question.optionA}
                  placeholder="Option A"
                  onChange={handleQuestionChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Option B
                </label>
                <input
                  type="text"
                  name="optionB"
                  value={question.optionB}
                  placeholder="Option B"
                  onChange={handleQuestionChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Option C
                </label>
                <input
                  type="text"
                  name="optionC"
                  value={question.optionC}
                  placeholder="Option C"
                  onChange={handleQuestionChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Option D
                </label>
                <input
                  type="text"
                  name="optionD"
                  value={question.optionD}
                  placeholder="Option D"
                  onChange={handleQuestionChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Correct Answer
                </label>
                <input
                  type="text"
                  name="correctAnswer"
                  value={question.correctAnswer}
                  placeholder="Correct Answer"
                  onChange={handleQuestionChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Difficulty Level
                </label>
                <select
                  name="difficultyLevel"
                  value={question.difficultyLevel}
                  onChange={handleQuestionChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Topic Name
                </label>
                <input
                  type="text"
                  name="topicName"
                  value={question.topicName}
                  placeholder="Topic Name"
                  onChange={handleQuestionChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subtopic ID
                </label>
                <input
                  type="text"
                  name="subTopic"
                  value={question.subTopic.subTopicId}
                  placeholder="Subtopic ID"
                  onChange={handleQuestionChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleSubmitQuestion}
                className="w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold py-2 rounded-lg hover:scale-105 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Add Question
              </button>
            </div>
          </div>
        );
      case "feedback":
        return (
          <div className="bg-white shadow-lg rounded-xl p-6 w-full overflow-x-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <FaEnvelope /> Contact Feedbacks
            </h1>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Message</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.length > 0 ? (
                  feedbacks.map((feedback, index) => (
                    <tr
                      key={feedback.id}
                      className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                    >
                      <td className="py-3 px-4">{feedback.id}</td>
                      <td className="py-3 px-4">{feedback.name}</td>
                      <td className="py-3 px-4">{feedback.email}</td>
                      <td className="py-3 px-4 truncate max-w-xs">{feedback.message}</td>
                      
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500">
                      No feedback found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
      default:
        return (
          <div className="bg-white shadow-lg rounded-xl p-8">
            <p className="text-gray-600">Select an option from the sidebar</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-transparent">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-br from-indigo-600 to-purple-700 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static lg:shadow-lg`}
      >
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button
            className="lg:hidden text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaBars size={24} />
          </button>
        </div>
        <nav className="space-y-2 p-4">
          <SidebarItem
            icon={<FaHome />}
            label="Dashboard"
            onClick={() => setSelected("dashboard")}
            isSelected={selected === "dashboard"}
          />
          <SidebarItem
            icon={<FaUsers />}
            label="See Users"
            onClick={() => setSelected("users")}
            isSelected={selected === "users"}
          />
          <SidebarItem
            icon={<FaPlusCircle />}
            label="Add Topic"
            onClick={() => setSelected("addTopic")}
            isSelected={selected === "addTopic"}
          />
          <SidebarItem
            icon={<FaFileAlt />}
            label="Assign Test"
            onClick={() => setSelected("assignTest")}
            isSelected={selected === "assignTest"}
          />
          <SidebarItem
            icon={<FaFileAlt />}
            label="Add Question"
            onClick={() => setSelected("addQuestion")}
            isSelected={selected === "addQuestion"}
          />
          <SidebarItem
            icon={<FaEnvelope />}
            label="Show Feedback"
            onClick={() => setSelected("feedback")}
            isSelected={selected === "feedback"}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-transparent shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-gray-600"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FaBars size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">TestAce Admin</h1>
          </div>
          {/* <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-transform duration-150 hover:scale-105"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div> */}
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, onClick, isSelected }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
      isSelected
        ? "bg-white text-indigo-600 shadow-md"
        : "text-white hover:bg-indigo-500"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default AdminLayout;