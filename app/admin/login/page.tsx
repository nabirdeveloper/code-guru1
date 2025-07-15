"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const inputClass =
    "w-full bg-emerald-50/80 border border-emerald-200 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition text-base shadow-sm placeholder-gray-400 mb-1";
  const buttonClass =
    "w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition text-lg shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mt-2";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.user.role === "admin") {
          localStorage.setItem("isAdmin", "true");
          localStorage.setItem("user", JSON.stringify(data.user));
          router.push("/admin/dashboard");
        } else {
          setError("You are not an admin user.");
        }
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-2">
      <form onSubmit={handleSubmit} className="bg-gray-800/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-5 border border-emerald-900">
        <div className="flex flex-col items-center mb-2">
          <span className="bg-emerald-100 p-3 rounded-full mb-2"><Lock className="w-7 h-7 text-emerald-600" /></span>
          <h2 className="text-3xl font-extrabold text-emerald-700 mb-1 tracking-tight">Admin Login</h2>
          <p className="text-gray-500 text-sm">Sign in to your admin account</p>
        </div>
        {error && <div className="text-red-500 text-center text-sm font-medium bg-red-50 border border-red-200 rounded p-2">{error}</div>}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Email"
            className={inputClass}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="Password"
            className={inputClass}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={buttonClass}
        >
          Login
        </button>
      </form>
    </div>
  );
} 