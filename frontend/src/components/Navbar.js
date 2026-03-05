import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-400">
          Licitator
        </Link>

        {/* Search */}
        <div className="flex-1 mx-8">
          <input
            type="text"
            placeholder="Pretraži aukcije..."
            className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Menu */}
        <div className="flex items-center gap-4">

          <Link
            to="/"
            className="text-gray-300 hover:text-white transition"
          >
            Aukcije
          </Link>

          <Link
            to="/login"
            className="border border-gray-500 px-4 py-2 rounded-lg hover:bg-slate-700 transition text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition text-white"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}