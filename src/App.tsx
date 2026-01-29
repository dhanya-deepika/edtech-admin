import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import Users from "./pages/Users";

const isAuth = () => {
  return localStorage.getItem("admin") !== null;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={isAuth() ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/classes"
          element={isAuth() ? <Classes /> : <Navigate to="/login" />}
        />

        <Route
          path="/users"
          element={isAuth() ? <Users /> : <Navigate to="/login" />}
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
