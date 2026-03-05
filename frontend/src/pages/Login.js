import { useState } from "react";
import { loginUser } from "../api";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await loginUser(username, password);

      localStorage.setItem("token", response.data.token);

      alert("Uspešno ste se prijavili!");
      window.location.href = "/";

    } catch (error) {

      alert("Pogrešan username ili password");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-slate-800 p-8 rounded-xl w-96 shadow-lg">

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-green-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 pr-10 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              title={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
            >
              {showPassword ? <FiEyeOff size={20}/> : <FiEye size={20}/>}
            </button>

</div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 p-3 rounded font-semibold"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}