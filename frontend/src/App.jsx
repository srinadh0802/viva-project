import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/roles" element={<RoleSelectionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;