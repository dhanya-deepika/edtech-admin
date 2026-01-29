import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classId, setClassId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await axios.get(`${API}/user`);
    setUsers(res.data);
    setLoading(false);
  };

  const fetchClasses = async () => {
    const res = await axios.get(`${API}/class`);
    setClasses(res.data);
  };

  const addUser = async () => {
    if (!email || !password || !classId) return toast.error("Fill all fields");

    await axios.post(`${API}/user`, {
      email,
      password,
      classId: Number(classId),
    });

    toast.success("User added");
    setEmail("");
    setPassword("");
    setClassId("");
    fetchUsers();
  };

  const deleteUser = async (id: number) => {
    await axios.delete(`${API}/user/${id}`);
    toast.success("User deleted");
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
    fetchClasses();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div className="bg-white p-6 rounded-lg shadow w-full max-w-md mb-8">
        <h2 className="font-semibold mb-4">Add User</h2>

        <input className="border p-2 w-full mb-3 rounded" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="password" className="border p-2 w-full mb-3 rounded"
          placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} />

        <select className="border p-2 w-full mb-3 rounded"
          value={classId} onChange={(e) => setClassId(e.target.value)}>
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <button onClick={addUser}
          className="bg-indigo-600 text-white px-4 py-2 rounded">
          Add User
        </button>
      </div>

      {loading ? <Loader /> : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Email</th>
                <th className="p-3">Class</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{u.id}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.class?.name}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default Users;
