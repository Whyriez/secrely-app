"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ResetPasswordPage() {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const handlePasswordResetFlow = async () => {
      setError(null);
      let accessToken = null;
      let refreshToken = null;
      let type = null;

      if (typeof window !== "undefined") {
        setTimeout(() => {
          const hash = window.location.hash;
          const query = new URLSearchParams(window.location.search);

          if (hash) {
            const hashParams = new URLSearchParams(hash.substring(1));
            accessToken = hashParams.get("access_token");
            refreshToken = hashParams.get("refresh_token");
            type = hashParams.get("type");

            if (accessToken && refreshToken && type === "recovery") {
              const newQuery = new URLSearchParams({
                access_token,
                refresh_token,
                type,
              });

              const cleanUrl = `${window.location.origin}${
                window.location.pathname
              }?${newQuery.toString()}`;
              window.history.replaceState(null, "", cleanUrl);
            } else {
              setError("Link reset tidak valid atau sudah digunakan.");
              setLoading(false);
            }
          } else {
            // fallback: ambil dari search params
            accessToken = query.get("access_token");
            refreshToken = query.get("refresh_token");
            type = query.get("type");
          }

          if (accessToken && refreshToken && type === "recovery") {
            supabase.auth
              .setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              })
              .then(({ error: sessionError }) => {
                if (sessionError) {
                  console.error("Error setting session:", sessionError);
                  setError("Link tidak valid atau sudah kedaluwarsa.");
                } else {
                  setIsFormVisible(true);
                }
                setLoading(false);
              });
          } else {
            setError("Link reset tidak valid. Silakan minta ulang.");
            setLoading(false);
          }
        }, 100); // Delay 100ms
      }
    };

    handlePasswordResetFlow();
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Kata sandi baru tidak cocok. Mohon periksa kembali.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Kata sandi minimal harus 6 karakter.");
      return;
    }

    setLoading(true);
    try {
      const { data, error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        throw updateError;
      }

      setSuccess(true);
    } catch (e) {
      console.error("Error resetting password:", e);
      setError(
        e.message || "Gagal mengatur ulang kata sandi. Silakan coba lagi."
      );
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  if (loading && !isFormVisible) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Memuat...</p>
      </div>
    );
  }

  // Tampilan sukses
  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="glass-card rounded-3xl p-8 w-full max-w-md text-center">
          <h2 className="font-space font-bold text-2xl mb-4">
            Kata Sandi Berhasil Direset! 🎉
          </h2>
          <p className="text-richGray-700 mb-6">
            Kata sandi Anda telah berhasil diperbarui. Silakan login dengan kata
            sandi baru Anda.
          </p>
          {/* <button
            onClick={() => router.push("/login")}
            className="neo-button text-white px-6 py-3 rounded-xl font-bold w-full"
          >
            Kembali ke Login
          </button> */}
        </div>
      </div>
    );
  }

  if (error && !isFormVisible && !success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="glass-card rounded-3xl p-8 w-full max-w-md text-center">
          <h2 className="font-space font-bold text-2xl mb-4">
            Terjadi Kesalahan 😔
          </h2>
          <p className="text-red-700 mb-6">{error}</p>
          {/* <button
            onClick={() => router.push("/forgot-password")}
            className="neo-button text-white px-6 py-3 rounded-xl font-bold w-full"
          >
            Minta Link Baru
          </button> */}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="glass-card rounded-3xl p-8 w-full max-w-md">
        <h2 className="font-space font-bold text-2xl mb-6 text-center">
          Atur Ulang Kata Sandi
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label
              htmlFor="new-password"
              className="block font-medium text-richGray-800 mb-2"
            >
              Kata Sandi Baru
            </label>
            <input
              type="password"
              id="new-password"
              className="glass-input w-full rounded-xl px-4 py-3 text-richGray-800 focus:outline-none"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6} // Sesuaikan dengan kebijakan password Supabase Anda
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block font-medium text-richGray-800 mb-2"
            >
              Konfirmasi Kata Sandi Baru
            </label>
            <input
              type="password"
              id="confirm-password"
              className="glass-input w-full rounded-xl px-4 py-3 text-richGray-800 focus:outline-none"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="neo-button text-white px-6 py-3 rounded-xl font-bold w-full flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Mengatur ulang...
              </>
            ) : (
              <span>Atur Ulang Kata Sandi</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
