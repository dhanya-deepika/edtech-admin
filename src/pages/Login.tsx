import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await axios.post(`${API}/admin/login`, {
      username,
      password,
    });

    console.log("LOGIN SUCCESS:", res.data);

    localStorage.setItem("admin", JSON.stringify(res.data.admin));
    navigate("/dashboard");
  } catch (error: any) {
    console.log("LOGIN ERROR:", error.response?.data);
    alert(error.response?.data?.message || "Invalid credentials");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200
">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
