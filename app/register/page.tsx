"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isAdminReg = searchParams?.get("admin") === "1";
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: isAdminReg ? "admin" : "user",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isAdminReg) {
      setForm((prev) => ({ ...prev, role: "user" }));
    }
  }, [isAdminReg]);

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        router.push("/login");
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [success, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setSuccess("Registration successful! Redirecting to login...");
      setForm({ name: "", email: "", password: "", role: isAdminReg ? "admin" : "user" });
    } else {
      setError(data.error || "Registration failed");
    }
  };

  const inputClass =
    "w-full bg-emerald-50/80 border border-emerald-200 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition text-base shadow-sm placeholder-gray-400 mb-1 text-gray-900";
  const selectClass =
    "w-full bg-emerald-50/80 border border-emerald-200 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition text-base shadow-sm mb-1 text-gray-900";
  const buttonClass =
    "w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition text-lg shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mt-2";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-2">
      <form onSubmit={handleSubmit} className="bg-gray-800/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-5 border border-emerald-900">
        <div className="flex flex-col items-center mb-2">
          <span className="bg-emerald-100 p-3 rounded-full mb-2"><UserPlus className="w-7 h-7 text-emerald-600" /></span>
          <h2 className="text-3xl font-extrabold text-emerald-700 mb-1 tracking-tight">Create Account</h2>
          <p className="text-gray-500 text-sm">Sign up to get started</p>
        </div>
        {error && <div className="text-red-500 text-center text-sm font-medium bg-red-50 border border-red-200 rounded p-2">{error}</div>}
        {success && <div className="text-green-600 text-center text-sm font-medium bg-green-50 border border-green-200 rounded p-2">{success}</div>}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            required
            placeholder="Your Name"
            style={{ color: '#111827' }}
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            required
            placeholder="you@email.com"
            style={{ color: '#111827' }}
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className={inputClass}
            required
            placeholder="••••••••"
            style={{ color: '#111827' }}
          />
        </div>
        {isAdminReg && (
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className={selectClass}
              style={{ color: '#111827' }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}
        <button
          type="submit"
          className={buttonClass}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
} 