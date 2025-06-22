// src/app/faq/page.jsx
"use client";

import React, { useEffect } from "react";
import "@/app/globals.css";
import Image from "next/image";

export default function FaqPage() {
  useEffect(() => {
    // Accordion
    const faqHeaders = document.querySelectorAll(".faq-header");

    faqHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector(".faq-icon");
        content.classList.toggle("active");
        icon.classList.toggle("active");
      });
    });

    // Open first FAQ
    const firstFaq = document.querySelector(".faq-content");
    const firstIcon = document.querySelector(".faq-icon");
    if (firstFaq && firstIcon) {
      firstFaq.classList.add("active");
      firstIcon.classList.add("active");
    }

    // Scroll reveal
    const elements = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));

    // Category filtering
    const categoryButtons = document.querySelectorAll(".category-pill");
    const faqItems = document.querySelectorAll(".glass-card[data-category]");

    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");

        categoryButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        faqItems.forEach((item) => {
          if (
            category === "all" ||
            item.getAttribute("data-category") === category
          ) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="font-inter text-richGray-800">
      <div className="page-wrapper min-h-screen overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="gradient-blob blob-top-right w-[500px] h-[500px] top-[-100px] right-[-100px]" />
          <div className="gradient-blob blob-left-center w-[600px] h-[600px] bottom-[20%] left-[-200px]" />
          <div className="gradient-blob blob-bottom-right w-[400px] h-[400px] bottom-[-100px] right-[20%]" />
        </div>

        {/* Header */}
        <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo/10 to-softPink/20 z-0" />
              <div className="relative z-10">
                <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-indigo/10 flex items-center justify-center">
                  <span className="text-4xl wave-animation inline-block">
                    👋
                  </span>
                </div>
                <h1 className="font-space font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
                  Need Help? We've Got You.
                </h1>
                <p className="text-richGray-700 text-lg md:text-xl max-w-2xl mx-auto">
                  Here are answers to the most common questions our users ask.
                  Still curious? Reach out!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pills */}
        <section className="hidden md:block pb-8 px-6 md:px-12 lg:px-24 relative">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "All Questions",
                "General",
                "Privacy",
                "Features",
                "Technical",
                "Account",
              ].map((label, idx) => {
                const value = label.toLowerCase().replace(/ /g, "");
                return (
                  <button
                    key={idx}
                    className={`category-pill px-5 py-2 rounded-full font-medium text-sm ${
                      value === "allquestions" ? "active" : ""
                    }`}
                    data-category={value === "allquestions" ? "all" : value}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="pb-20 px-6 md:px-12 lg:px-24 relative">
          <div className="max-w-4xl mx-auto">
            <div
              className="glass-card rounded-3xl p-6 md:p-8 mb-6 scroll-reveal"
              data-category="general"
            >
              <div className="faq-header cursor-pointer flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-indigo/10 flex items-center justify-center mr-4">
                    <span className="text-2xl emoji-icon">❓</span>
                  </div>
                  <h3 className="font-space font-bold text-lg md:text-xl">
                    What is Secrely?
                  </h3>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo faq-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="faq-content">
                <div className="pl-16">
                  <p className="text-richGray-700 leading-relaxed mb-4">
                    Secrely is the next-gen anonymous messaging app that
                    empowers your connections like never before. Forget basic
                    DMs – Secrely provides you with a unique, personal link.
                    Share it anywhere, and let anyone send you secret, anonymous
                    messages directly to your inbox.
                  </p>
                  <p className="text-richGray-700 leading-relaxed mb-4">
                    But here's where it gets truly interesting: If you're
                    intrigued by an anonymous message, and the sender has
                    enabled replies, you can step into a private, anonymous chat
                    right within the app. This means you can dive deeper into
                    meaningful conversations, explore new connections, or get
                    honest feedback, all while maintaining full control over
                    your identity until you choose to reveal it.
                  </p>
                  <p className="text-richGray-700 leading-relaxed">
                    Secrely lets you:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                    <li>
                      <span className="font-medium">
                        Receive anonymous messages:
                      </span>{" "}
                      Get unfiltered thoughts, compliments, or questions via
                      your unique personal link.
                    </li>
                    <li>
                      <span className="font-medium">Engage anonymously:</span>{" "}
                      If allowed by the sender, transform intriguing anonymous
                      messages into real-time, private, anonymous conversations.
                    </li>
                    <li>
                      <span className="font-medium">Control your reveal:</span>{" "}
                      Your identity stays secret until you decide to show it.
                    </li>
                    <li>
                      <span className="font-medium">
                        Connect authentically:
                      </span>{" "}
                      Experience deeper interactions, free from the pressures of
                      identity.
                    </li>
                  </ul>
                  <p className="text-richGray-700 leading-relaxed">
                    It's not just messaging; it's a new way to connect, explore,
                    and express yourself with genuine freedom.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="glass-card rounded-3xl p-6 md:p-8 mb-6 scroll-reveal"
              data-category="privacy"
            >
              <div className="faq-header cursor-pointer flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-indigo/10 flex items-center justify-center mr-4">
                    <span className="text-2xl emoji-icon">👤</span>
                  </div>
                  <h3 className="font-space font-bold text-lg md:text-xl">
                    Is my identity anonymous?
                  </h3>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo faq-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="faq-content">
                <div className="pl-16">
                  <p className="text-richGray-700 leading-relaxed mb-4">
                    Yes, your identity is automatically anonymous when you send
                    messages on Secrely. Our core design ensures that when you
                    send a message through a user's unique link, your identity
                    is not revealed to the recipient.
                  </p>
                  <p className="text-richGray-700 leading-relaxed">
                    Secrely is built around the principle of anonymity:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                    <li>
                      <span className="font-medium">
                        No identifying information:
                      </span>{" "}
                      Recipients will not see your name, profile picture, or any
                      personal details.
                    </li>
                    <li>
                      <span className="font-medium">Focus on the message:</span>{" "}
                      The conversation is centered purely on the content,
                      allowing for unfiltered and authentic interactions.
                    </li>
                    <li>
                      <span className="font-medium">Privacy by design:</span>
                      Our system is engineered to protect your identity from the
                      moment you send a message.
                    </li>
                  </ul>
                  <p className="text-richGray-700 leading-relaxed">
                    While we are committed to maintaining your anonymity, we
                    always advise users to be mindful of the information they
                    choose to share within their messages, as no digital system
                    can guarantee absolute foolproof privacy against
                    self-disclosure.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="glass-card rounded-3xl p-6 md:p-8 mb-6 scroll-reveal"
              data-category="features"
            >
              <div className="faq-header cursor-pointer flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-indigo/10 flex items-center justify-center mr-4">
                    <span className="text-2xl emoji-icon">🔒</span>
                  </div>
                  <h3 className="font-space font-bold text-lg md:text-xl">
                    Can I control who sends me messages?
                  </h3>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo faq-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="faq-content">
                <div className="pl-16">
                  <p className="text-richGray-700 leading-relaxed mb-4">
                    Yes, you have control over who can send you messages and how
                    you manage unwanted communication on Secrely.
                  </p>
                  <p className="text-richGray-700 leading-relaxed">
                    While you don't set granular pre-approval modes, you can
                    manage your incoming messages effectively:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                    <li>
                      <span className="font-medium">
                        Disable your anonymous link:
                      </span>{" "}
                      You can deactivate your unique Secrely link at any time if
                      you wish to stop receiving any new anonymous messages.
                    </li>
                    <li>
                      <span className="font-medium">
                        Report & Block unwanted senders:
                      </span>{" "}
                      If you receive messages containing harsh language or
                      anything inappropriate, you can easily report the sender.
                      Once reported, you also have the option to block them,
                      preventing them from sending you any further messages
                      until you choose to unblock them.
                    </li>
                  </ul>
                  <p className="text-richGray-700 leading-relaxed">
                    You can manage your blocked users list in Settings &gt;
                    Privacy. This empowers you to maintain a comfortable and
                    safe experience on Secrely.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="glass-card rounded-3xl p-6 md:p-8 mb-6 scroll-reveal"
              data-category="features"
            >
              <div className="faq-header cursor-pointer flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-indigo/10 flex items-center justify-center mr-4">
                    <span className="text-2xl emoji-icon">📬</span>
                  </div>
                  <h3 className="font-space font-bold text-lg md:text-xl">
                    Can I reply to messages?
                  </h3>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo faq-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="faq-content">
                <div className="pl-16">
                  <p className="text-richGray-700 leading-relaxed mb-4">
                    Yes, you can initiate a two-way conversation on Secrely,
                    provided the sender has enabled the reply option for their
                    anonymous message.
                  </p>
                  <p className="text-richGray-700 leading-relaxed">
                    When you receive a message:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                    <li>
                      <span className="font-medium">
                        Check for reply option:
                      </span>{" "}
                      Not all anonymous messages are designed for immediate
                      replies. If the sender has enabled it, you will see an
                      option to start reply a chat.
                    </li>
                    <li>
                      <span className="font-medium">Engage anonymously:</span>{" "}
                      If the reply option is available, you can respond, and the
                      conversation will continue as an anonymous chat,
                      maintaining your privacy.
                    </li>
                    <li>
                      <span className="font-medium">
                        Optional Identity Reveal:
                      </span>{" "}
                      Within an ongoing anonymous chat, you have the choice to
                      reveal your identity to the other party at any point,
                      should you feel comfortable doing so.
                    </li>
                    <li>
                      <span className="font-medium">
                        Manage unwanted messages:
                      </span>{" "}
                      You always have the option to choose not to reply and
                      archive the conversation, or block the sender if you do
                      not wish to receive further messages from them.
                    </li>
                  </ul>
                  <p className="text-richGray-700 leading-relaxed">
                    This ensures that while you can engage in deeper
                    conversations, the level of interaction is initially set by
                    the sender, giving them control over their anonymous
                    outreach.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="glass-card rounded-3xl p-6 md:p-8 mb-6 scroll-reveal"
              data-category="privacy"
            >
              <div className="faq-header cursor-pointer flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-indigo/10 flex items-center justify-center mr-4">
                    <span className="text-2xl emoji-icon">🚫</span>
                  </div>
                  <h3 className="font-space font-bold text-lg md:text-xl">
                    How do I report abuse?
                  </h3>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo faq-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="faq-content">
                <div className="pl-16">
                  <p className="text-richGray-700 leading-relaxed mb-4">
                    We take abuse seriously and have a zero-tolerance policy for
                    harassment, threats, and inappropriate content. To report
                    abuse:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-richGray-700 mb-4">
                    <li>Open the conversation with the problematic message</li>
                    <li>Tap the three dots (⋮) in the top right corner</li>
                    <li>Select "Report" from the menu</li>
                    <li>
                      Choose the reason for reporting and provide any additional
                      details
                    </li>
                    <li>Submit your report</li>
                  </ol>
                  <p className="text-richGray-700 leading-relaxed mb-4">
                    Our trust and safety team reviews all reports within 24
                    hours. You can also block users immediately to prevent
                    further contact.
                  </p>
                  <div className="bg-indigo/5 rounded-xl p-4 border border-indigo/20">
                    <p className="text-richGray-700 leading-relaxed">
                      <span className="font-medium">Note:</span> Even for
                      anonymous messages, we maintain encrypted records that can
                      be used to identify and ban users who violate our
                      community guidelines. Your safety is our priority.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="glass-card rounded-3xl p-6 md:p-8 mb-6 scroll-reveal"
              data-category="technical"
            >
              <div className="faq-header cursor-pointer flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-indigo/10 flex items-center justify-center mr-4">
                    <span className="text-2xl emoji-icon">📱</span>
                  </div>
                  <h3 className="font-space font-bold text-lg md:text-xl">
                    Is this available on Android/iOS?
                  </h3>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo faq-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="faq-content">
                <div className="pl-16">
                  <p className="text-richGray-700 leading-relaxed mb-4">
                    Yes! Secrely is available on both major mobile platforms:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                    <li>
                      <span className="font-medium">iOS:</span> The iOS version
                      for iPhone and iPad is currently under development and
                      will be available on the App Store soon. Stay tuned for
                      updates!
                    </li>
                    <li>
                      <span className="font-medium">Android:</span> Available on
                      Google Play Store for devices running Android 7.0 or later
                    </li>
                  </ul>
                  <p className="text-richGray-700 leading-relaxed mb-4">
                    We also have a web version at app.secrely.com that works on
                    most modern browsers, allowing you to access your messages
                    from your computer.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center bg-richGray-800 text-white rounded-xl hover:bg-richGray-700 transition-colors"
                    >
                      <img src="/playstorelogo.png" width={200} height={200} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="glass-card rounded-3xl p-6 md:p-8 mb-6 scroll-reveal"
              data-category="account"
            >
              <div className="faq-header cursor-pointer flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-indigo/10 flex items-center justify-center mr-4">
                    <span className="text-2xl emoji-icon">🔑</span>
                  </div>
                  <h3 className="font-space font-bold text-lg md:text-xl">
                    How do I create an account?
                  </h3>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo faq-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="faq-content">
                <div className="pl-16">
                  <p className="text-richGray-700 leading-relaxed mb-4">
                    Creating a Secrely account is quick and easy:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-richGray-700 mb-4">
                    <li>Download the app from the Google Play</li>
                    <li>Open the app and tap "Sign Up"</li>
                    <li>Enter your email address for verification</li>
                    <li>Create a username and password</li>
                    <li>Verify your email with the code we send</li>
                  </ol>
                  <p className="text-richGray-700 leading-relaxed">
                    That's it! You can start using Secrely immediately after
                    verification. Your account can be as detailed or as minimal
                    as you prefer, depending on how you want to appear to
                    others.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="glass-card rounded-3xl p-6 md:p-8 mb-6 scroll-reveal"
              data-category="features"
            >
              <div className="faq-header cursor-pointer flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-indigo/10 flex items-center justify-center mr-4">
                    <span className="text-2xl emoji-icon">💬</span>
                  </div>
                  <h3 className="font-space font-bold text-lg md:text-xl">
                    What message types does Secrely support?
                  </h3>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo faq-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="faq-content">
                <div className="pl-16">
                  <p className="text-richGray-700 leading-relaxed mb-4">
                    Secrely supports a variety of message types to make your
                    conversations engaging:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                    <li>
                      <span className="font-medium">
                        For Incoming Anonymous Messages (Inbox):
                      </span>{" "}
                      <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                        <li>
                          {" "}
                          <span className="font-medium">
                            Text messages:
                          </span>{" "}
                          Standard text with support for emojis.
                        </li>
                        <li>
                          {" "}
                          <span className="font-medium">Music:</span> Anonymous
                          messages can include embedded music content.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-medium">
                        For Anonymous Chats (Two-way conversations):
                      </span>{" "}
                      <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                        <li>
                          {" "}
                          <span className="font-medium">
                            Text messages:
                          </span>{" "}
                          Standard text with support for emojis, enabling fluid
                          dialogue.
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <p className="text-richGray-700 leading-relaxed">
                    <span className="font-medium">Important Note:</span> The
                    type of content you can send when initiating an anonymous
                    message (via a link) determines what the recipient receives
                    in their inbox. If an anonymous chat is established,
                    communication within that chat is primarily text-based with
                    emoji support to ensure a focused and private dialogue.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="glass-card rounded-3xl p-6 md:p-8 mb-6 scroll-reveal"
              data-category="privacy"
            >
              <div className="faq-header cursor-pointer flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-indigo/10 flex items-center justify-center mr-4">
                    <span className="text-2xl emoji-icon">🔐</span>
                  </div>
                  <h3 className="font-space font-bold text-lg md:text-xl">
                    How secure are my messages?
                  </h3>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo faq-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="faq-content">
                <div className="pl-16">
                  <p className="text-richGray-700 leading-relaxed mb-4">
                    Security is a top priority at Secrely. Here's how we protect
                    your messages:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                    <li>
                      <span className="font-medium">
                        End-to-end encryption:
                      </span>{" "}
                      All messages are encrypted so only you and the recipient
                      can read them
                    </li>
                    <li>
                      <span className="font-medium">
                        Encrypted message storage:
                      </span>
                      Messages are securely stored in our database in an
                      encrypted format. This means even if there were
                      unauthorized access to our database, the content of your
                      messages would remain unreadable.
                    </li>
                    <li>
                      <span className="font-medium">
                        Abuse Reporting Retention:
                      </span>
                      Messages reported for abuse may be retained temporarily in
                      an encrypted state for review by our trust and safety
                      team, in accordance with our Terms of Use.
                    </li>
                  </ul>
                  <div className="bg-indigo/5 rounded-xl p-4 border border-indigo/20 mb-4">
                    <p className="text-richGray-700 leading-relaxed">
                      <span className="font-medium">Security Tip:</span> While
                      we implement strong security measures, remember that the
                      recipient of your messages could still share their content
                      through other means. Always be mindful of what you send,
                      even in "secure" conversations.
                    </p>
                  </div>
                  <p className="text-richGray-700 leading-relaxed">
                    We are committed to continuously improving our security
                    measures to provide a safe and private messaging
                    environment.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="glass-card rounded-3xl p-6 md:p-8 mb-10 scroll-reveal"
              data-category="account"
            >
              <div className="faq-header cursor-pointer flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-indigo/10 flex items-center justify-center mr-4">
                    <span className="text-2xl emoji-icon">💰</span>
                  </div>
                  <h3 className="font-space font-bold text-lg md:text-xl">
                    Is Secrely free to use?
                  </h3>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo faq-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="faq-content">
                <div className="pl-16">
                  <p className="text-richGray-700 leading-relaxed mb-4">
                    Yes! Secrely offers both free and premium options:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="bg-indigo/5 rounded-xl p-4 border border-indigo/20">
                      <h4 className="font-bold mb-2">Free Plan</h4>
                      <ul className="list-disc pl-5 space-y-1 text-richGray-700">
                        <li>
                          <span className="font-medium">
                            Unlimited anonymous messages:
                          </span>{" "}
                          You can send and receive anonymous messages via links
                          without limit.
                        </li>
                        <li>
                          <span className="font-medium">Daily Star Limit:</span>{" "}
                          You receive 50 "Stars" daily, which reset every 24
                          hours.
                          <ul className="list-disc pl-5 space-y-1 text-richGray-700">
                            <li>Each message bubble in a chat costs 1 Star.</li>
                            <li>
                              Replying to an anonymous inbox message to create a
                              new chat room costs 5 Stars.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <span className="font-medium">
                            Chatting Limitations:
                          </span>{" "}
                          Once your daily Stars are depleted, you won't be able
                          to start new chat rooms or send further messages in
                          existing chats until the Stars reset the next day.
                        </li>
                        <li>Basic anonymity features</li>
                        <li>Basic media sharing</li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-indigo/10 to-softPink/20 rounded-xl p-4 border border-indigo/20">
                      <h4 className="font-bold mb-2">
                        Secrely Premium
                      </h4>
                      <p className="text-richGray-700 leading-relaxed">
                        We are actively working on a premium version of Secrely
                        that will offer enhanced features and remove daily Star
                        limitations for an even more seamless communication
                        experience. Stay tuned for updates on its launch!
                      </p>
                      {/* <ul className="list-disc pl-5 space-y-1 text-richGray-700">
                        <li>All free features</li>
                        <li>Advanced anonymity controls</li>
                        <li>Message scheduling</li>
                        <li>Unlimited privacy profiles</li>
                        <li>Enhanced media sharing</li>
                        <li>Priority support</li>
                      </ul> */}
                    </div>
                  </div>
                  <p className="text-richGray-700 leading-relaxed">
                    We believe privacy should be accessible to everyone, which
                    is why our free plan includes essential features. The
                    upcoming Premium plan will add extra convenience and
                    customization options for those who desire them.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-indigo/10 to-softPink/20 scroll-reveal">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <h2 className="font-space font-bold text-2xl mb-3">
                    Still have questions?
                  </h2>
                  <p className="text-richGray-700 leading-relaxed">
                    We're here to help! Our support team is ready to answer any
                    questions you might have about Secrely.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href="mailto:support-secrely@limapp.my.id"
                    className="neo-button text-white px-8 py-3 rounded-xl font-bold flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
