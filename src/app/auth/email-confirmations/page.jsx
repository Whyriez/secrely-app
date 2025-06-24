"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Separate component that uses useSearchParams
function EmailConfirmationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      setError(null);
      let accessToken = null;
      let refreshToken = null;
      let type = null;
      let tokenHash = null;

      if (typeof window !== "undefined" && window.location.hash) {
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );

        accessToken = hashParams.get("access_token");
        refreshToken = hashParams.get("refresh_token");
        type = hashParams.get("type");
        tokenHash = hashParams.get("token_hash");

        // Convert to query param for cleaner URL
        const queryParams = new URLSearchParams();
        if (accessToken) queryParams.set("access_token", accessToken);
        if (refreshToken) queryParams.set("refresh_token", refreshToken);
        if (type) queryParams.set("type", type);
        if (tokenHash) queryParams.set("token_hash", tokenHash);

        const cleanUrl = `${window.location.origin}${
          window.location.pathname
        }?${queryParams.toString()}`;
        window.history.replaceState(null, "", cleanUrl);
      }

      // Also check query params (in case tokens are already in query)
      if (!accessToken) {
        accessToken = searchParams.get("access_token");
        refreshToken = searchParams.get("refresh_token");
        type = searchParams.get("type");
        tokenHash = searchParams.get("token_hash");
      }

      if (type === "signup" && accessToken && refreshToken) {
        try {
          // Set the session with the tokens from email confirmation
          const { data: sessionData, error: sessionError } =
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

          if (sessionError) {
            console.error("Error setting session:", sessionError);
            setError(
              "Failed to verify email confirmation link. The link may be expired or invalid."
            );
            setLoading(false);
            return;
          }

          // Get user data
          if (sessionData?.user) {
            setUserEmail(sessionData.user.email || "");
            setSuccess(true);
          } else {
            setError("Failed to retrieve user information.");
          }

          setLoading(false);
        } catch (e) {
          console.error("Exception during email confirmation:", e);
          setError(
            "An error occurred while confirming your email. Please try again."
          );
          setLoading(false);
        }
      } else if (type === "signup") {
        setError(
          "The email confirmation link is invalid or has been used. Please request a new confirmation email."
        );
        setLoading(false);
      } else {
        setError(
          "This page can only be accessed via the email confirmation link."
        );
        setLoading(false);
      }
    };

    if (searchParams.toString() && loading) {
      handleEmailConfirmation();
    } else if (!searchParams.toString() && loading) {
      setError(
        "This page can only be accessed via the email confirmation link."
      );
      setLoading(false);
    }
  }, [searchParams, loading]);

  const handleResendConfirmation = async () => {
    if (!userEmail) {
      setError("No email address found. Please try signing up again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: userEmail,
      });

      if (resendError) {
        throw resendError;
      }

      setError(null);
      // Could show a success message here
      alert("Confirmation email resent successfully!");
    } catch (e) {
      console.error("Error resending confirmation:", e);
      setError("Failed to resend confirmation email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Confirming your email...</p>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="glass-card rounded-3xl p-8 w-full max-w-md text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="font-space font-bold text-2xl mb-4">
              Email Confirmed Successfully! 🎉
            </h2>
            <p className="text-richGray-700 mb-6">
              {userEmail && (
                <>
                  Your email address <strong>{userEmail}</strong> has been
                  successfully verified. Your account is now active and you can
                  start using our services.
                </>
              )}
              {!userEmail && (
                <>
                  Your email address has been successfully verified. Your
                  account is now active and you can start using our services.
                </>
              )}
            </p>
          </div>
          {/* <button
            onClick={() => router.push("/login")}
            className="neo-button text-white px-6 py-3 rounded-xl font-bold w-full mb-3"
          >
            Go to Login
          </button> */}
          <button
            onClick={() => router.push("/")}
            className="text-richGray-600 hover:text-richGray-800 font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="glass-card rounded-3xl p-8 w-full max-w-md text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="font-space font-bold text-2xl mb-4">
              Email Confirmation Failed 😔
            </h2>
            <p className="text-red-700 mb-6">{error}</p>
          </div>
          
          <div className="space-y-3">
            {userEmail && (
              <button
                onClick={handleResendConfirmation}
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
                    Sending...
                  </>
                ) : (
                  "Resend Confirmation Email"
                )}
              </button>
            )}
            
            {/* <button
              onClick={() => router.push("/signup")}
              className="w-full px-6 py-3 border border-richGray-300 rounded-xl font-medium text-richGray-700 hover:bg-richGray-50 transition-colors"
            >
              Back to Sign Up
            </button>
             */}
            <button
              onClick={() => router.push("/")}
              className="text-richGray-600 hover:text-richGray-800 font-medium"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Loading component for Suspense fallback
function EmailConfirmationLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
}

// Main component wrapped with Suspense
export default function EmailConfirmationPage() {
  return (
    <Suspense fallback={<EmailConfirmationLoading />}>
      <EmailConfirmationForm />
    </Suspense>
  );
}