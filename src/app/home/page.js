import Navbar from "../components/navbar/page"
export default function Home () {
    return(
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
      {Navbar()}

      <main className="flex-grow max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            Informasi Les Privat
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Belajar lebih mudah dengan bimbingan guru berpengalaman. 
            Tersedia untuk berbagai mata pelajaran dan jenjang pendidikan.
          </p>
        </section>

        {/* Daftar Mata Pelajaran */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Mata Pelajaran yang Tersedia
          </h2>
          <ul className="grid grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
            <li className="p-4 bg-white dark:bg-zinc-800 rounded shadow">Matematika
              <action><a href=""></a></action>
            </li>
            <li className="p-4 bg-white dark:bg-zinc-800 rounded shadow">Fisika
              <action><a href=""></a></action>
            </li>
            <li className="p-4 bg-white dark:bg-zinc-800 rounded shadow">Kimia
              <action><a href=""></a></action>
            </li>
            <li className="p-4 bg-white dark:bg-zinc-800 rounded shadow">Bahasa Inggris
              <action><a href=""></a></action>
            </li>
            <li className="p-4 bg-white dark:bg-zinc-800 rounded shadow">Bahasa Indonesia
              <action><a href=""></a></action>
            </li>
            <li className="p-4 bg-white dark:bg-zinc-800 rounded shadow">Biologi
              <action><a href=""></a></action>
            </li>
          </ul>
        </section>

        {/* Jadwal */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Jadwal Les
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Senin - Jumat: 16.00 - 20.00 WIB
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Sabtu - Minggu: 09.00 - 14.00 WIB
          </p>
        </section>
        </main>
    </div>
    )
  }
