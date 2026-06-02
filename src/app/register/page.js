// app/register/page.js
"use client"
import Link from "next/link";
import { use, useState } from "react";
import client from "react-dom/client";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullname || !email || !password) {
      setError("Semua field wajib diisi!");
    } else {
      setError("");
      alert("Registrasi berhasil (simulasi)");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Fullname */}
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="fullname"
              placeholder="Masukkan nama lengkap"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white"
              required
            />
          </div>

          {/* Pesan Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Tombol Register */}
          <button
            type="submit"
            className="w-full rounded-md bg-green-600 text-white py-2 font-semibold hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        {/* Link tambahan */}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
