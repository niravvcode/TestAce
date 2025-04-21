import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import HomePage from "./Pages/HomePage";
import { AuthProvider } from "./Context/AuthContext";
import ProtctedRoutes from "./Context/ProtctedRoutes";
import TopicDetails from "./Components/TopicDetails";
import Navbarr from "./Components/Navbarr";
import QuizComponent from "./Components/QuizComponent";
import QuizDetails from "./Components/QuizDetails";
import LiveTest from "./Components/LiveTest";
import FAQ from "./Components/FAQ";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsAndConditions from "./Components/TermsAndConditions";
import AdminPanel from "./Components/AdminPanel";
import Leaderboard from "./Components/Leaderboard";
import Profile from "./Components/Profile";
import EditProfile from "./Components/EditProfile";
import AdminProtected from "./Components/AdminProtected";

function App() {
  return (
    <div className="relative">
      {/* <div className="absolute top-[-50px] left-[-50px] h-100 w-100 bg-cyan-100 -z-10 blur-3xl rounded-full "></div>
      <div className="absolute bottom-[-50px] right-[-50px] h-100 w-100 bg-purple-100 -z-10 blur-3xl rounded-full "></div> */}
      <AuthProvider>
        <Navbarr />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtctedRoutes />}>
            <Route path="/question" element={<TopicDetails />} />
            <Route path="/mcq-test" element={<QuizComponent />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/questionDetail" element={<QuizDetails />} />
            <Route path="/liveTest" element={<LiveTest />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/Terms-Condition" element={<TermsAndConditions />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/editProfile" element={<EditProfile/>} />
          </Route>
          <Route element={<AdminProtected/>}>
            <Route path="/admin" element={<AdminPanel/>} />
          </Route>
          
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
