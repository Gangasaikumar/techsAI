import { Routes, Route, Navigate } from "react-router-dom";
import PortfolioPage from "../pages/PortfolioPage";
import HomePage from "../pages/HomePage";

const AllRoutes = () => {
  return (
    <Routes>
      {/* Landing / Coming Soon */}
      <Route path="/" element={<HomePage />} />

      {/* Main Portfolio */}
      <Route path="/gangsaikumar" element={<PortfolioPage />} />

      {/* Wildcard redirect (optional, keeps user on track) */}
      <Route path="*" element={<Navigate to="/gangsaikumar" replace />} />
    </Routes>
  );
};

export default AllRoutes;
