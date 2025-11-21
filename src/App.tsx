import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import AdminPage from "./pages/admin/index.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
