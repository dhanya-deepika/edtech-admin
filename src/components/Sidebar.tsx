import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-indigo-700 text-white p-5 min-h-screen">
      <h2 className="text-xl font-bold mb-6">EdTech Admin</h2>

      <nav className="space-y-3">
        <Link to="/dashboard" className="block p-2 rounded hover:bg-indigo-600">
          Dashboard
        </Link>
        <Link to="/classes" className="block p-2 rounded hover:bg-indigo-600">
          Classes
        </Link>
        <Link to="/users" className="block p-2 rounded hover:bg-indigo-600">
          Users
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
