import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/navbar/page";
import Navbar2 from "./navbar2/pages";

export default function Home() {
  return (
    <div className="">
      {Navbar2()}

      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-20 bg-white dark:bg-black sm:items-start m-auto">

        {/* Bagian Login */}
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
          <h3 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Login
          </h3>
          <form action="/home" method="get" className="w-full space-y-6">
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
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white"
                required
              />
            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 transition">
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
