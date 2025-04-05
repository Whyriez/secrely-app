"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../utils/firebase";

import dynamic from "next/dynamic";
const MusicSelect = dynamic(() => import("../../components/MusicSelect"), {
  ssr: false,
  loading: () => (
    <div className="w-full py-4 px-3 border border-gray-200 rounded-lg bg-white animate-pulse">
      <div className="h-5 bg-gray-300 rounded w-1/2 mb-3"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  ),
});

export default function Header() {
  const { name } = useParams();
  const router = useRouter();

  const [isAllowReply, setIsAllowReply] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedMusic, setSelectedMusic] = useState(null);

  const [user, setUser] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isHeaderLoading, setIsHeaderLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [header, setHeader] = useState("");

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    if (checked && !isLoggedIn) {
      setIsModalOpen(true);
    } else {
      setIsAllowReply(checked);
    }
  };

  const handleLogin = async () => {
    setIsLoginLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("Login berhasil!");
      setIsModalOpen(false);
      setIsAllowReply(true);
    } catch (error) {
      console.error("Login gagal:", error);
      alert("Email atau password salah!");
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logout berhasil!");
      setIsAllowReply(false);
      setUser([]);
    } catch (error) {
      console.error("Gagal logout:", error);
      alert("Terjadi kesalahan saat logout.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("Pesan tidak boleh kosong.");
      return;
    }

    if (!selectedMusic?.value.trim()) {
      alert("Music tidak boleh kosong.");
      return;
    }

    if (!header?.id) {
      alert("Header belum tersedia.");
      return;
    }

    setIsSending(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            headerId: header.id,
            musicId: selectedMusic?.value || "",
            message: message.trim(),
            canReply: isAllowReply,
            senderId: isAllowReply ? userId : null
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Gagal mengirim pesan.");
      }

      const data = await res.json();
      alert("Pesan berhasil dikirim!");
      setMessage(""); // reset pesan
      setSelectedMusic(null); // reset music
      setIsAllowReply(false); // reset toggle
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim pesan.");
    } finally {
      setIsSending(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAllowReply(false);
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        setIsHeaderLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/headers/${name}`
        );
        const data = await res.json();
        if (!data || data.error) {
            router.push('/404'); // atau bisa juga window.location.href = '/404';
          }
          
        setHeader(data);
      } catch (error) {
        console.error("Gagal fetch header:", error);
        router.push("/404");
      } finally {
        setIsHeaderLoading(false);
      }
    };

    if (name) {
      fetchHeader();
    }
  }, [name]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-8 sm:p-10 space-y-6 transition-all duration-300">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            ✉️ Kirim Pesan Anonim
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {name} tidak akan tahu siapa yang mengirim pesan ini. Tetap anonim &
            aman.
          </p>
        </div>
        {isHeaderLoading ? (
          <div className="w-full py-4 px-3 border border-gray-200 rounded-lg bg-white animate-pulse">
            <div className="h-5 bg-gray-300 rounded w-1/2 mb-3"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ) : (
          header && (
            <div className="mt-6 relative bg-white border-l-4 border-indigo-500 shadow-lg p-5 rounded-xl text-left space-y-2 animate-fade-in-up">
              <div className="absolute -top-3 -left-3 w-16 h-16 bg-indigo-100 opacity-20 rounded-full blur-xl"></div>
              <div className="flex items-start gap-3 relative z-10">
                <div className="text-indigo-500 text-2xl">💬</div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-indigo-600">
                      {name}
                    </span>{" "}
                    ingin menyampaikan:
                  </p>
                  <blockquote className="mt-1 text-gray-800 italic border-l-2 border-indigo-400 pl-4">
                    “{header.text}”
                  </blockquote>
                </div>
              </div>
            </div>
          )
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <textarea
            placeholder="Tulis pesan rahasia kamu di sini..."
            className="w-full h-36 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-white/90 text-gray-800 placeholder-gray-400 resize-none transition"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Pilih Musik Latar
            </label>
            <MusicSelect
              value={selectedMusic}
              onChange={(option) => setSelectedMusic(option)}
            />
          </div>
          {selectedMusic?.preview_url && (
            <div className="mt-4">
              <iframe
                src={selectedMusic.preview_url}
                width="100%"
                height="80"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl shadow-md"
              ></iframe>
            </div>
          )}

          <div className="flex items-center justify-between px-1 py-1">
            <span className="text-sm text-gray-700 font-medium">
              Izinkan penerima membalas secara anonim
            </span>

            <label
              htmlFor="allow-chat"
              className="relative inline-block w-12 h-6 cursor-pointer"
            >
              <input
                type="checkbox"
                id="allow-chat"
                checked={isAllowReply}
                onChange={handleCheckboxChange}
                className="peer sr-only"
              />
              <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-indigo-500 transition-colors"></div>
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all peer-checked:translate-x-6"></div>
            </label>
          </div>
          {isLoggedIn ? (
            <div className="bg-indigo-100 text-indigo-700 text-sm px-4 py-2 rounded-xl flex items-center justify-between mt-4">
              <span>
                🔓 Login sebagai <strong>{user.email}</strong>
              </span>
              <button
                onClick={handleLogout}
                type="button"
                className="ml-4 text-xs px-2 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="bg-yellow-50 text-yellow-700 text-sm px-4 py-2 rounded-xl mt-4">
              ⚠️ Kamu belum login. Beberapa fitur akan dibatasi.
            </div>
          )}

          <button
            type="submit"
            disabled={isSending}
            className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-md transition duration-200"
          >
            {isSending ? "Mengirim..." : "🚀 Kirim Pesan Sekarang"}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center italic">
          Pesan ini akan dikirim secara anonim & dijamin rahasia ✨
        </p>
      </div>

      {/* MODAL LOGIN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm px-4 sm:px-0">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 relative animate-fadeIn space-y-6 border border-gray-100">
            <div className="text-center space-y-2">
              <div className="flex justify-center text-indigo-500 text-4xl">
                🔒
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Login Diperlukan
              </h2>
              <p className="text-sm text-gray-600">
                Untuk menerima balasan dari pengguna, kamu harus login terlebih
                dahulu.
              </p>
              <p className="text-xs text-gray-500 italic mt-1">
                Identitasmu{" "}
                <span className="font-medium text-indigo-600">100% anonim</span>
                . Penerima tidak akan tahu siapa kamu. ✨
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <input
                type="email"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border text-gray-800 border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border text-gray-800 border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex justify-end items-center gap-3 pt-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition"
              >
                Batal
              </button>
              <button
                onClick={handleLogin}
                disabled={isLoginLoading}
                className={`px-4 py-2 text-sm rounded-md transition ${
                  isLoginLoading
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-500 hover:bg-indigo-600 text-white"
                }`}
              >
                {isLoginLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Login Sekarang"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
