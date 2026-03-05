import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Greška pri registraciji");
      }

      alert("Uspešna registracija!");
      window.location.href = "/login";
    } catch (error) {
      alert("Greška pri registraciji");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0f172a] to-[#020617]">
      <form
        onSubmit={handleRegister}
        className="bg-slate-800 p-8 rounded-xl shadow-xl w-96"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Register
        </h2>

        {/* USERNAME */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 rounded-lg bg-slate-700 text-white outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* PASSWORD */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-400"
            title={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition"
        >
          Register
        </button>

        <p className="text-gray-400 text-center mt-4">
          Već imaš nalog?{" "}
          <a href="/login" className="text-green-400 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;