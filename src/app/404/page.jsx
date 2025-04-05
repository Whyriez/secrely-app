// NotFound.tsx
export default function NotFound() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-10 space-y-6 transition-all duration-300 text-center">
          <div className="flex justify-center text-5xl text-indigo-500 animate-bounce">🚫</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
          </p>
          <a
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-md transition"
          >
            🔙 Kembali ke Beranda
          </a>
          <p className="text-xs text-gray-400 italic">
            Terus semangat dan jangan menyerah! 💫
          </p>
        </div>
      </div>
    );
  }
  