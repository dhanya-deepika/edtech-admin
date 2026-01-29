import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import Users from "./pages/Users";

const isAuth = () => localStorage.getItem("admin");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuth() ? <Dashboard /> : <Login />} />
        <Route path="/classes" element={isAuth() ? <Classes /> : <Login />} />
        <Route path="/users" element={isAuth() ? <Users /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
