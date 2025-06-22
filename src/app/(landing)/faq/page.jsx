// src/app/faq/page.jsx
"use client";

import React, { useEffect } from "react";
import "@/app/globals.css";

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
                    Secrely is a modern messaging app designed for Gen Z that
                    allows you to communicate with friends, family, and new
                    connections with varying levels of anonymity.
                  </p>
                  <p className="text-richGray-700 leading-relaxed">
                    Our platform lets you choose how you appear to others - from
                    fully identified to completely anonymous - giving you
                    control over your digital identity while still enjoying
                    meaningful conversations.
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
                    Your level of anonymity is completely up to you! Secrely
                    offers three identity modes:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                    <li>
                      <span className="font-medium">Full Identity:</span> Your
                      profile name and photo are visible to recipients.
                    </li>
                    <li>
                      <span className="font-medium">Partial Anonymity:</span> Only
                      your username is visible, but not your full profile.
                    </li>
                    <li>
                      <span className="font-medium">Complete Anonymity:</span>
                      Recipients cannot see any identifying information about
                      you.
                    </li>
                  </ul>
                  <p className="text-richGray-700 leading-relaxed">
                    You can set a default mode or change it for each
                    conversation. Remember that while we do everything possible
                    to maintain anonymity, no digital system is 100% foolproof,
                    so always be mindful of the information you share.
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
                    Absolutely! Secrely gives you complete control over who can
                    contact you through several privacy settings:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                    <li>
                      <span className="font-medium">Open:</span> Anyone can send you
                      messages (including anonymous ones)
                    </li>
                    <li>
                      <span className="font-medium">Friends Only:</span> Only people
                      you've added as friends can message you
                    </li>
                    <li>
                      <span className="font-medium">Verified Only:</span> Only users
                      with verified accounts can contact you
                    </li>
                    <li>
                      <span className="font-medium">Approval Required:</span> You
                      must approve message requests before conversations begin
                    </li>
                  </ul>
                  <p className="text-richGray-700 leading-relaxed">
                    You can adjust these settings anytime in your Privacy
                    preferences. We recommend starting with stricter settings
                    and adjusting as needed for your comfort level.
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
                    Yes! Secrely is designed for two-way conversations. When you
                    receive a message, you have several options:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                    <li>
                      Reply directly while maintaining your current anonymity
                      level
                    </li>
                    <li>
                      Reply with a different anonymity level than your original
                      setting
                    </li>
                    <li>Choose not to reply and archive the conversation</li>
                    <li>
                      Block the sender if you don't wish to receive further
                      messages
                    </li>
                  </ul>
                  <p className="text-richGray-700 leading-relaxed">
                    For anonymous messages, you can reply without revealing your
                    identity, creating a safe space for honest conversations.
                    You can also "reveal" your identity later if you choose to.
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
                      <span className="font-medium">Note:</span> Even for anonymous
                      messages, we maintain encrypted records that can be used
                      to identify and ban users who violate our community
                      guidelines. Your safety is our priority.
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
                      <span className="font-medium">iOS:</span> Available on the App
                      Store for iPhone and iPad running iOS 13 or later
                    </li>
                    <li>
                      <span className="font-medium">Android:</span> Available on
                      Google Play Store for devices running Android 8.0 or later
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
                      className="flex items-center justify-center bg-richGray-800 text-white py-3 px-6 rounded-xl hover:bg-richGray-700 transition-colors"
                    >
                      <svg
                        className="w-6 h-6 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.5 12.3c0-3.1 2.5-4.5 2.6-4.6-1.4-2.1-3.6-2.3-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-.9 0-2.4-1.1-4-1-2 0-3.9 1.2-5 3-2.1 3.7-.5 9.1 1.5 12.1 1 1.5 2.2 3.1 3.8 3 1.5-.1 2.1-1 3.9-1s2.4.9 4 .9 2.7-1.5 3.7-2.9c1.2-1.7 1.6-3.3 1.7-3.4-.1-.1-3.2-1.3-3.2-4.8zm-3-8.9c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.5 1.8-.8.9-1.5 2.3-1.3 3.7 1.4.1 2.8-.7 3.6-1.7z" />
                      </svg>
                      App Store
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-center bg-richGray-800 text-white py-3 px-6 rounded-xl hover:bg-richGray-700 transition-colors"
                    >
                      <svg
                        className="w-6 h-6 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3.9 12c0-3.1 2.6-5.6 5.7-5.6.7 0 1.3.1 1.9.3L18.1 0v7.1l-7.8 8.7V24l-2.9-3.2c-2.1-1-3.5-3.1-3.5-5.6V12z" />
                        <path d="M14 7.4V0l7.8 6.6c-.3.2-.6.5-.9.8-2 2.3-2.8 5.3-2.8 8.4v.1c0 3 .9 5.9 2.8 8.2.3.4.7.7 1 1l-7.9 6.6v-7.5c0-3.1-.7-6.1-1.8-8.9L14 7.4z" />
                      </svg>
                      Google Play
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
                    <li>Download the app from the App Store or Google Play</li>
                    <li>Open the app and tap "Sign Up"</li>
                    <li>
                      Enter your email address or phone number for verification
                    </li>
                    <li>Create a username and password</li>
                    <li>
                      Verify your email or phone number with the code we send
                    </li>
                    <li>
                      Set up your profile (optional - you can keep it minimal
                      for more privacy)
                    </li>
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
                      <span className="font-medium">Text messages:</span> Standard
                      text with support for emojis
                    </li>
                    <li>
                      <span className="font-medium">Photos:</span> Share images from
                      your gallery or camera
                    </li>
                    <li>
                      <span className="font-medium">Voice messages:</span> Record
                      and send audio clips
                    </li>
                    <li>
                      <span className="font-medium">Disappearing messages:</span>{" "}
                      Set messages to vanish after being viewed
                    </li>
                    <li>
                      <span className="font-medium">Reactions:</span> React to
                      messages with emojis
                    </li>
                    <li>
                      <span className="font-medium">Polls:</span> Create quick polls
                      for friends to vote on
                    </li>
                  </ul>
                  <p className="text-richGray-700 leading-relaxed">
                    All message types work with our privacy features, so you can
                    send any kind of content while maintaining your preferred
                    level of anonymity.
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
                      <span className="font-medium">End-to-end encryption:</span>{" "}
                      All messages are encrypted so only you and the recipient
                      can read them
                    </li>
                    <li>
                      <span className="font-medium">No message storage:</span>
                      Messages are deleted from our servers once delivered
                      (unless reported for abuse)
                    </li>
                    <li>
                      <span className="font-medium">Screenshot detection:</span>
                      You're notified if someone takes a screenshot of your
                      conversation
                    </li>
                    <li>
                      <span className="font-medium">
                        Two-factor authentication:
                      </span>
                      Add an extra layer of security to your account
                    </li>
                  </ul>
                  <div className="bg-indigo/5 rounded-xl p-4 border border-indigo/20 mb-4">
                    <p className="text-richGray-700 leading-relaxed">
                      <span className="font-medium">Security Tip:</span> While we
                      implement strong security measures, remember that the
                      recipient of your messages could still share their content
                      through other means. Always be mindful of what you send,
                      even in "secure" conversations.
                    </p>
                  </div>
                  <p className="text-richGray-700 leading-relaxed">
                    We regularly undergo security audits and update our systems
                    to maintain the highest standards of message protection.
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
                        <li>Unlimited messaging</li>
                        <li>Basic anonymity features</li>
                        <li>Standard security protections</li>
                        <li>Up to 3 custom privacy profiles</li>
                        <li>Basic media sharing</li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-indigo/10 to-softPink/20 rounded-xl p-4 border border-indigo/20">
                      <h4 className="font-bold mb-2">
                        Secrely Premium ($3.99/month)
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-richGray-700">
                        <li>All free features</li>
                        <li>Advanced anonymity controls</li>
                        <li>Message scheduling</li>
                        <li>Unlimited privacy profiles</li>
                        <li>Enhanced media sharing</li>
                        <li>Priority support</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-richGray-700 leading-relaxed">
                    We believe privacy should be accessible to everyone, which
                    is why our free plan includes all the essential features you
                    need. Premium simply adds extra convenience and
                    customization options.
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
                  <button className="neo-button text-white px-8 py-3 rounded-xl font-bold flex items-center">
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
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
