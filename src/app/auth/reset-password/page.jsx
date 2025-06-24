"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Separate component that uses useSearchParams
function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

      if (typeof window !== "undefined" && window.location.hash) {
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );

        accessToken = hashParams.get("access_token");
        refreshToken = hashParams.get("refresh_token");
        type = hashParams.get("type");

        // Convert to query param
        const queryParams = new URLSearchParams();
        queryParams.set("access_token", accessToken);
        queryParams.set("refresh_token", refreshToken);
        queryParams.set("type", type);

        const cleanUrl = `${window.location.origin}${
          window.location.pathname
        }?${queryParams.toString()}`;
        window.history.replaceState(null, "", cleanUrl);
      }

      if (accessToken && refreshToken && type === "recovery") {
        try {
          const { data: sessionData, error: sessionError } =
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

          if (sessionError) {
            console.error("Error setting session:", sessionError);
            setError(
              "Failed to verify password reset link. The link may be expired or invalid."
            );
            setLoading(false);
            return;
          }

          setIsFormVisible(true);
          setLoading(false);
        } catch (e) {
          console.error("Exception setting session:", e);
          setError(
            "An error occurred while processing the link. Please try again."
          );
          setLoading(false);
        }
      } else if (type === "recovery") {
        setError(
          "The password reset link is invalid or has been used. Please request a new reset link."
        );
        setLoading(false);
      } else {
        setError(
          "This page can only be accessed via the password reset link from email."
        );
        setLoading(false);
      }
    };

    if (searchParams.toString() && loading) {
      handlePasswordResetFlow();
    } else if (!searchParams.toString() && loading) {
      setError(
        "Halaman ini hanya dapat diakses melalui link reset kata sandi dari email."
      );
      setLoading(false);
    }
  }, [searchParams, loading]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("New password does not match. Please check again.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
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
      setError(e.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
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
            Password Reset Successfully! 🎉
          </h2>
          <p className="text-richGray-700 mb-6">
            Your password has been successfully updated. Please login with your
            new password.
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
            There is an error 😔
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
          Reset Password
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
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              className="glass-input w-full rounded-xl px-4 py-3 text-richGray-800 focus:outline-none"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block font-medium text-richGray-800 mb-2"
            >
              Confirm New Password
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
                Resetting...
              </>
            ) : (
              <span>Reset Password</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function ResetPasswordLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p>Load...</p>
    </div>
  );
}

// Main component wrapped with Suspense
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
