import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

const Classes = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchClasses = async () => {
    setLoading(true);
    const res = await axios.get(`${API}/class`);
    setClasses(res.data);
    setLoading(false);
  };

  const addClass = async () => {
    if (!name || !description) return toast.error("Fill all fields");

    await axios.post(`${API}/class`, { name, description });
    toast.success("Class added");
    setName("");
    setDescription("");
    fetchClasses();
  };

  const deleteClass = async (id: number) => {
    await axios.delete(`${API}/class/${id}`);
    toast.success("Class deleted");
    fetchClasses();
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Classes</h1>

      <div className="bg-white p-6 rounded-lg shadow w-full max-w-md mb-8">
        <h2 className="font-semibold mb-4">Add Class</h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Class Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-3 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={addClass}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add Class
        </button>
      </div>

      {loading ? <Loader /> : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Description</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{c.id}</td>
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.description}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteClass(c.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
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

export default Classes;
