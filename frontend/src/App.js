import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import CounsellingQuizPage from "./pages/CounsellingQuizPage";
import CounsellingResult from "./pages/CounsellingResult";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import SkillApiTesting from "./pages/SkillApiTesting";
import QuesType1 from "./components/QuesType1";
import QuesType2 from "./components/QuesType2";
import QuesType3 from "./components/QuesType3";
import SkillRoadmap from "./pages/SkillRoadmap";
import Roadmap from "./pages/Roadmap";
import CareerQuiz from "./pages/CareerQuiz";
import Aptitude_form from "./pages/Aptitude_form";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/*Layout ke andar header, footer hai */}
          <Route index element={<Home />} />
          <Route
            path="/counselling-quiz"
            index
            element={<CounsellingQuizPage />}
          />
          <Route
            path="/counselling-result"
            index
            element={<CounsellingResult />}
          />
          <Route path="/chatbot" index element={<Chatbot />} />
          <Route
            path="/skill-api-testing"
            index
            element={<SkillApiTesting />}
          />
          <Route path="/form" index element={<Aptitude_form />} />
          <Route path="/roadmap" element={<SkillRoadmap />}>
            <Route path="result" index element={<Roadmap />} />
          </Route>
          <Route path="/quiz" index element={<CareerQuiz />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
