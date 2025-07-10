"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { load } from "@fingerprintjs/fingerprintjs";

import dynamic from "next/dynamic";
import {
  getAuthToken,
  removeAuthToken,
  setAuthToken,
} from "../../helper/localStorage";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("SendMessagePage");

  const [isAllowReply, setIsAllowReply] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState("");

  const [selectedMusic, setSelectedMusic] = useState(null);

  const [user, setUser] = useState(null); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isHeaderLoading, setIsHeaderLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [header, setHeader] = useState(null);
  const [recipientPublicKey, setRecipientPublicKey] = useState(null);

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [senderFingerprint, setSenderFingerprint] = useState(null);
  const [isFingerprintLoading, setIsFingerprintLoading] = useState(true);

  const messageInputRef = useRef(null);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    if (checked && !isLoggedIn) {
      setIsModalOpen(true);
    } else {
      setIsAllowReply(checked);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoginLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login gagal.");
      }
      setAuthToken(data.token);
      setUser({ userId: data.userId, email: data.email, name: data.name });
      setIsLoggedIn(true);
      setIsModalOpen(false);
      setIsAllowReply(true);
    } catch (error) {
      setIsErrorModalOpen(true);
      setIsErrorMessage(t("errorLogin"));
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      removeAuthToken();
      setUser(null);
      setIsLoggedIn(false);
      setIsAllowReply(false);
    } catch (error) {
      setIsErrorModalOpen(true);
      setIsErrorMessage(t("errorLogout"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setIsErrorModalOpen(true);
      setIsErrorMessage(t("errorEmptyMessage"));
      return;
    }

    if (!header?.id) {
      setIsErrorModalOpen(true);
      setIsErrorMessage(t("errorNoHeader"));
      return;
    }

    if (!recipientPublicKey) {
      setIsErrorModalOpen(true);
      setIsErrorMessage(
        t("errorNoPublicKey")
      );
      return;
    }

    setIsSending(true);

    try {
      const aesKey = await crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );
      const aesKeyExported = await crypto.subtle.exportKey("raw", aesKey);

      const publicKeyBuffer = Uint8Array.from(atob(recipientPublicKey), (c) =>
        c.charCodeAt(0)
      ).buffer;
      const rsaPublicKey = await crypto.subtle.importKey(
        "spki",
        publicKeyBuffer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        false,
        ["encrypt"]
      );

      const encryptedAesKey = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        rsaPublicKey,
        aesKeyExported
      );
      const encryptedAesKeyBase64 = btoa(
        String.fromCharCode(...new Uint8Array(encryptedAesKey))
      );

      const iv = crypto.getRandomValues(new Uint8Array(12));
      const ivBase64 = btoa(String.fromCharCode(...iv));

      const encoder = new TextEncoder();
      const encodedMessage = encoder.encode(message.trim());
      const encryptedMessage = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        aesKey,
        encodedMessage
      );
      const encryptedMessageBase64 = btoa(
        String.fromCharCode(...new Uint8Array(encryptedMessage))
      );

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerId: header.userId,
          headerId: header.id,
          musicId: selectedMusic?.value || "",
          message: encryptedMessageBase64,
          encryptedSymmetricKey: encryptedAesKeyBase64,
          iv: ivBase64,
          isEncrypted: true,
          canReply: isAllowReply,
          senderId: isAllowReply && isLoggedIn ? user.userId : null,
          senderFingerprint: senderFingerprint,
        }),
      });

      console.log(res);
      if (!res.ok) {
        const errorData = await res.json();
        let errorMessage = t("errorGeneric");

        if (res.status === 403) {
          errorMessage = t("errorBlocked");
        } else if (res.status === 400) {
          errorMessage = t("errorInvalid");
        } else if (res.status === 404) {
          errorMessage = t("Recipient not found.");
        }

        throw new Error(errorMessage);
      }

      const data = await res.json();

      const notificationResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/notification/send-fcm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: header.token,
            title: "New Message!",
            body: "There's an incoming message for you!",
            data: {
              type: "refresh",
            },
          }),
        }
      );

      setIsSuccessModalOpen(true);
      setMessage(""); 
      setSelectedMusic(null);
      setIsAllowReply(false);
    } catch (err) {
      setIsErrorModalOpen(true);
      setIsErrorMessage(err.message);
    } finally {
      setIsSending(false);
    }
  };

  const closeLoginModal = () => {
    setIsModalOpen(false);
    setIsAllowReply(false); 
    setEmail("");
    setPassword("");
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const emojis = ["🙌", "❤️", "😊", "🎉", "👍", "✨", "🔥", "💯", "🤔", "😂"];
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);

  const handleEmojiClick = () => {
    const newEmoji = emojis[currentEmojiIndex];

    const emojiElement = document.createElement("div");
    emojiElement.className = "emoji-float-form";
    emojiElement.textContent = newEmoji;
    emojiElement.style.left = `${Math.random() * 80 + 10}%`;
    emojiElement.style.bottom = "100px";
    document.body.appendChild(emojiElement);

    if (messageInputRef.current) {
      const start = messageInputRef.current.selectionStart;
      const end = messageInputRef.current.selectionEnd;
      setMessage(
        (prev) => prev.substring(0, start) + newEmoji + prev.substring(end)
      );
      setTimeout(() => {
        messageInputRef.current.selectionStart =
          messageInputRef.current.selectionEnd = start + newEmoji.length;
      }, 0);
    }

    setCurrentEmojiIndex((prevIndex) => (prevIndex + 1) % emojis.length);

    setTimeout(() => {
      document.body.removeChild(emojiElement);
    }, 3000);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/users/me`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.ok) {
            const data = await res.json();
            setUser({
              userId: data.userId,
              email: data.email,
              name: data.name,
            });
            setIsLoggedIn(true);
          } else {
            removeAuthToken();
            setUser(null);
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error("Gagal verifikasi token:", error);
          removeAuthToken();
          setUser(null);
          setIsLoggedIn(false);
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const getFingerprint = async () => {
      try {
        setIsFingerprintLoading(true);
        const fp = await load();
        const result = await fp.get();
        setSenderFingerprint(result.visitorId);
      } catch (error) {
      } finally {
        setIsFingerprintLoading(false);
      }
    };

    getFingerprint();
  }, []);

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        setIsHeaderLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/headers/${name}`
        );
        const data = await res.json();
        if (!data || data.error || data.data.isActive === false) {
          router.push("/404");
          return;
        }
        setHeader(data.data);

        if (data.data.userPublicKey) {
          setRecipientPublicKey(data.data.userPublicKey);
        } else {
          console.warn(
            "Public key not found for this header. Messages may not be end-to-end encrypted."
          );
        }
      } catch (error) {
        console.error("Gagal fetch header:", error);
        // router.push("/404"); // Only uncomment if you want to redirect on any fetch error
      } finally {
        setIsHeaderLoading(false);
      }
    };

    if (name) {
      fetchHeader();
    }
  }, [name, router]); // Add router to dependency array

  return (
    <div className="font-inter text-richGray-800">
      <div className="page-wrapper overflow-hidden min-h-screen">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="gradient-blob blob-top-right w-[500px] h-[500px] top-[-100px] right-[-100px]"></div>
          <div className="gradient-blob blob-left-center w-[600px] h-[600px] bottom-[20%] left-[-200px]"></div>
          <div className="gradient-blob blob-bottom-right w-[200px] h-[200px] bottom-[15%] right-[20%]"></div>
        </div>
        {/* Main Content */}
        <main className="pt-10 pb-20 px-6 md:px-12 lg:px-24 min-h-screen">
          <div className="max-w-3xl mx-auto">
            {/* Profile Card */}
            {isHeaderLoading ? (
              <div className="profile-card rounded-3xl p-8 mb-8 relative overflow-hidden animate-pulse">
                <div className="relative z-10 flex flex-col md:flex-row items-center">
                  <div className="h-24 w-24 rounded-full avatar-gradient flex items-center justify-center mb-6 md:mb-0 md:mr-6 bg-gray-300"></div>
                  <div className="text-center md:text-left w-full">
                    <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-full"></div>
                    <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                      <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                      <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              header && (
                <div className="profile-card rounded-3xl p-8 mb-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo/5 to-softPink/10 z-0"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center">
                    <div className="h-24 w-24 rounded-full avatar-gradient flex items-center justify-center mb-6 md:mb-0 md:mr-6 floating">
                      <span className="text-4xl text-white font-bold">
                        {name ? name.charAt(0).toUpperCase() : "U"}
                      </span>
                    </div>
                    <div className="text-center md:text-left">
                      <h1 className="font-space font-bold text-3xl md:text-4xl mb-2">
                        @{name}
                      </h1>
                      <p className="text-richGray-700 text-lg">
                        {header.text || "Ask me anything!"}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}

            {/* Message Intro Card */}
            <div className="glass-card rounded-3xl p-6 mb-8 relative overflow-hidden">
              <div className="flex items-start">
                <div className="h-12 w-12 rounded-full bg-indigo/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-xl">💬</span>
                </div>
                <div>
                  <h2 className="font-space font-bold text-xl mb-2">
                    {t("title")}
                  </h2>
                  <p className="text-richGray-700">
                    {t("description", { name })}
                  </p>
                </div>
              </div>
            </div>

            {/* Message Form */}
            <div className="glass-card rounded-3xl p-8 mb-8">
              <form id="message-form" onSubmit={handleSubmit}>
                {/* Message Input */}
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block font-medium text-richGray-800 mb-2"
                  >
                    {t("yourMessageLabel")}
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      rows="5"
                      className="glass-input w-full !border !border-gray-200 rounded-2xl px-4 py-3 text-richGray-800 focus:outline-none resize-none"
                      placeholder={t("yourMessagePlaceholder")}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      ref={messageInputRef}
                    ></textarea>
                    <div className="absolute bottom-3 right-3 flex space-x-2">
                      <button
                        type="button"
                        id="emoji-button"
                        className="h-8 w-8 rounded-full bg-indigo/10 flex items-center justify-center hover:bg-indigo/20 transition-colors"
                        onClick={handleEmojiClick}
                      >
                        <span>😊</span>
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-richGray-700 flex items-center">
                    <span className="mr-1">✨</span>
                    <span className="italic">{t("anonymousNote")}</span>
                  </div>
                </div>

                {/* Music Selection */}
                <div className="mb-6">
                  <label
                    htmlFor="music"
                    className="block font-medium text-richGray-800 mb-2 flex items-center"
                  >
                    <span>{t("musicLabel")}</span>
                  </label>
                  <div className="relative">
                    {/* Using standard select here, MusicSelect component is still available if preferred */}
                    <MusicSelect
                      value={selectedMusic}
                      onChange={(option) => setSelectedMusic(option)}
                    />
                  </div>

                  {/* Music Preview */}
                  <div
                    id="music-preview"
                    className={`music-preview rounded-2xl bg-white/50 border border-white/60 ${
                      selectedMusic ? "active" : ""
                    }`}
                  >
                    {selectedMusic?.preview_url && (
                      <div className="flex items-center">
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
                  </div>
                </div>

                {/* Anonymous Reply Toggle */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <label
                        htmlFor="anonymous-reply"
                        className="block font-medium text-richGray-800"
                      >
                        {t("allowReplyLabel")}
                      </label>
                      <p className="text-xs text-richGray-700 mt-1">
                        {t("allowReplyNote", { name })}
                      </p>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input
                        type="checkbox"
                        name="anonymous-reply"
                        id="anonymous-reply"
                        checked={isAllowReply}
                        onChange={handleCheckboxChange}
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-200 appearance-none cursor-pointer transition-all duration-300 ease-in-out"
                      />
                      <label
                        htmlFor="anonymous-reply"
                        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out"
                      ></label>
                    </div>
                  </div>
                  {isLoggedIn && user ? (
                    <div className="bg-indigo-100 text-indigo-700 text-sm px-4 py-2 rounded-xl flex items-center justify-between mt-4">
                      <span>
                        🔓 Login as <strong>{user.email}</strong>
                      </span>
                      <button
                        onClick={handleLogout}
                        type="button"
                        className="ml-4 text-xs px-2 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
                      >
                        {t("logoutButton")}
                      </button>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 text-yellow-700 text-sm px-4 py-2 rounded-xl mt-4">
                      {t("notLoggedInWarning")}
                    </div>
                  )}
                </div>

                {/* Send Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    id="send-button"
                    disabled={isSending || !recipientPublicKey}
                    className="neo-button text-white px-8 py-4 rounded-xl font-bold text-lg w-full md:w-auto flex items-center justify-center"
                  >
                    {isSending ? (
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
                        {t("sendButtonLoading")}
                      </>
                    ) : (
                      <>
                        {t("sendButton")}
                        <span className="ml-2">🚀</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Additional Info Card */}
            <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-softPink/10 to-indigo/10 z-0"></div>
              <div className="relative z-10">
                <h3 className="font-space font-bold text-xl mb-4 flex items-center">
                  <span className="mr-2">🔒</span>
                  <span>{t("privacyTitle")}</span>
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-indigo/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-xs">✓</span>
                    </div>
                    <p className="text-richGray-700">{t("privacyBullet1")}</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-indigo/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-xs">✓</span>
                    </div>
                    <p className="text-richGray-700">{t("privacyBullet2")}</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-indigo/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-xs">✓</span>
                    </div>
                    <p className="text-richGray-700">{t("privacyBullet3")}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        {/* Login Modal */}
        <div
          id="login-modal"
          className={`modal-overlay fixed inset-0 z-50 flex items-center justify-center p-6 ${
            isModalOpen ? "active" : ""
          }`}
          onClick={(e) => e.target.id === "login-modal" && closeLoginModal()}
        >
          <div className="modal-container glass-card rounded-3xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-space font-bold text-2xl flex items-center">
                <span className="mr-2">🔐</span>
                <span>{t("loginTitle")}</span>
              </h2>
              <button
                id="close-modal"
                className="h-8 w-8 rounded-full bg-indigo/10 flex items-center justify-center hover:bg-indigo/20 transition-colors"
                onClick={closeLoginModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form id="login-form" onSubmit={handleLogin}>
              <div className="mb-4">
                <p>{t("loginNote", { name })}</p>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block font-medium text-richGray-800 mb-2"
                >
                  {t("emailLabel")}
                </label>
                <input
                  type="email"
                  id="email"
                  className="glass-input w-full rounded-xl px-4 py-3 text-richGray-800 focus:outline-none"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block font-medium text-richGray-800 mb-2"
                >
                  {t("passwordLabel")}
                </label>
                <input
                  type="password"
                  id="password"
                  className="glass-input w-full rounded-xl px-4 py-3 text-richGray-800 focus:outline-none"
                  placeholder={t("passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {/* <div className="mt-2 text-right">
                  <a href="#" className="text-sm text-indigo hover:underline">
                    Lupa kata sandi?
                  </a>
                </div> */}
              </div>

              <button
                type="submit"
                id="login-submit"
                disabled={isLoginLoading}
                className="neo-button text-white px-6 py-3 rounded-xl font-bold w-full flex items-center justify-center"
              >
                {isLoginLoading ? (
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
                    {t("loginSubmitLoading")}
                  </>
                ) : (
                  <span>{t("loginSubmit")}</span>
                )}
              </button>

              <div className="mt-6 text-center text-sm text-richGray-700">
                <p>
                  {t("downloadPrompt")} {""}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.whyriez.secrely.android"
                    className="text-indigo hover:underline"
                    target="_blank"
                  >
                    {t("downloadLink")}
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Success Modal */}
        <div
          id="success-modal"
          className={`modal-overlay fixed inset-0 z-50 flex items-center justify-center p-6 ${
            isSuccessModalOpen ? "active" : ""
          }`}
          onClick={(e) =>
            e.target.id === "success-modal" && closeSuccessModal()
          }
        >
          <div className="modal-container glass-card rounded-3xl p-8 w-full max-w-md text-center">
            <div className="h-20 w-20 rounded-full bg-indigo/10 flex items-center justify-center mx-auto mb-6 floating">
              <span className="text-4xl">✨</span>
            </div>
            <h2 className="font-space font-bold text-2xl mb-4">
              {t("successTitle")}
            </h2>
            <p className="text-richGray-700 mb-6">
              {t("successDescription", { name })}
            </p>
            <button
              id="close-success"
              className="neo-button text-white px-6 py-3 rounded-xl font-bold w-full flex items-center justify-center"
              onClick={closeSuccessModal}
            >
              <span>{t("sendAnother")}</span>
            </button>
          </div>
        </div>

        <div
          id="error-modal"
          className={`modal-overlay fixed inset-0 z-50 flex items-center justify-center p-6 ${
            isErrorModalOpen ? "active" : ""
          }`}
          onClick={(e) => e.target.id === "error-modal" && closeErrorModal()}
        >
          <div className="modal-container glass-card rounded-3xl p-8 w-full max-w-md text-center">
            <div className="h-20 w-20 rounded-full bg-indigo/10 flex items-center justify-center mx-auto mb-6 floating">
              <span className="text-4xl">✨</span>
            </div>
            <h2 className="font-space font-bold text-2xl mb-4">
              {t("errorTitle")}
            </h2>
            <p className="text-richGray-700 mb-6">{isErrorMessage}</p>
            <button
              id="close-success"
              className="neo-button text-white px-6 py-3 rounded-xl font-bold w-full flex items-center justify-center"
              onClick={closeErrorModal}
            >
              <span>{t("errorOk")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
