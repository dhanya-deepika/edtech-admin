import AdminLayout from "../components/AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [classCount, setClassCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    axios.get(`${API}/class`).then(res => setClassCount(res.data.length));
    axios.get(`${API}/user`).then(res => setUserCount(res.data.length));
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3>Total Classes</h3>
          <p className="text-3xl font-bold">{classCount}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3>Total Users</h3>
          <p className="text-3xl font-bold">{userCount}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3>Status</h3>
          <p className="text-xl font-semibold text-green-600">Active</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
