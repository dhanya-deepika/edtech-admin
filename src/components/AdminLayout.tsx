import { Link, useNavigate } from "react-router-dom";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
     
      <aside className="w-64 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 p-6">
        <h1 className="text-xl font-bold mb-8">EdTech Admin</h1>

        <nav className="space-y-4">
          <Link to="/dashboard" className="block hover:font-semibold">
            📊 Dashboard
          </Link>
          <Link to="/classes" className="block hover:font-semibold">
            📚 Classes
          </Link>
          <Link to="/users" className="block hover:font-semibold">
            👤 Users
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

     
      <main className="flex-1">
      
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          <span className="text-sm text-gray-500">Welcome Admin 👋</span>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
