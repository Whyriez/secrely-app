// src/app/faq/page.jsx
"use client";

import React, { useEffect } from "react";
import "@/app/globals.css";
import Image from "next/image"; // Tetap pertahankan jika ada penggunaan Image komponen
import { useTranslations } from "next-intl";

export default function FaqPage() {
  const t = useTranslations("Faq");

  useEffect(() => {
    // Fungsi untuk mengelola logika FAQ accordion
    const setupFaqAccordions = () => {
      const faqHeaders = document.querySelectorAll(".faq-header");

      faqHeaders.forEach((header) => {
        const handleClick = () => {
          const content = header.nextElementSibling;
          const icon = header.querySelector(".faq-icon");
          content.classList.toggle("active");
          icon.classList.toggle("active");
        };
        header.addEventListener("click", handleClick);
        // Cleanup function for event listener
        return () => header.removeEventListener("click", handleClick);
      });

      // Buka FAQ pertama secara default
      const firstFaq = document.querySelector(".faq-content");
      const firstIcon = document.querySelector(".faq-icon");
      if (firstFaq && firstIcon) {
        firstFaq.classList.add("active");
        firstIcon.classList.add("active");
      }
    };

    // Fungsi untuk mengelola scroll reveal animation
    const setupScrollReveal = () => {
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
      // Cleanup function for IntersectionObserver
      return () => observer.disconnect();
    };

    // Fungsi untuk mengelola filter kategori
    const setupCategoryFilter = () => {
      const categoryButtons = document.querySelectorAll(".category-pill");
      const faqItems = document.querySelectorAll(".glass-card[data-category]");

      categoryButtons.forEach((button) => {
        const handleClick = () => {
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
        };
        button.addEventListener("click", handleClick);
        // Cleanup function for event listener
        return () => button.removeEventListener("click", handleClick);
      });
    };

    const cleanupFaq = setupFaqAccordions();
    const cleanupScroll = setupScrollReveal();
    const cleanupCategory = setupCategoryFilter();

    // Cleanup semua event listener saat komponen unmount
    return () => {
      if (cleanupFaq) cleanupFaq();
      if (cleanupScroll) cleanupScroll();
      if (cleanupCategory) cleanupCategory();
    };
  }, []);

  // Data kategori yang diambil dari terjemahan
  const categories = [
    { labelKey: "categories.allQuestions", value: "all" },
    { labelKey: "categories.general", value: "general" },
    { labelKey: "categories.privacy", value: "privacy" },
    { labelKey: "categories.features", value: "features" },
    { labelKey: "categories.technical", value: "technical" },
    { labelKey: "categories.account", value: "account" },
  ];

  // Data pertanyaan FAQ yang terstruktur untuk iterasi
  // Ini adalah representasi bagaimana Anda bisa menyusun data jika ingin lebih dinamis.
  // Untuk saat ini, kita akan tetap menggunakan hardcode key untuk mengambil dari JSON.
  const faqData = [
    {
      key: "whatIsSecrely",
      category: "general",
    },
    {
      key: "isMyIdentityAnonymous",
      category: "privacy",
    },
    {
      key: "canIControlWhoSendsMessages",
      category: "features",
    },
    {
      key: "canIReplyToMessages",
      category: "features",
    },
    {
      key: "howDoIReportAbuse",
      category: "privacy",
    },
    {
      key: "isThisAvailableOnAndroidIos",
      category: "technical",
    },
    {
      key: "howDoICreateAnAccount",
      category: "account",
    },
    {
      key: "whatMessageTypesDoesSecrelySupport",
      category: "features",
    },
    {
      key: "howSecureAreMyMessages",
      category: "privacy",
    },
    {
      key: "isSecrelyFreeToUse",
      category: "account",
    },
  ];

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
                    {t("header.emoji")}
                  </span>
                </div>
                <h1 className="font-space font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
                  {t("header.title")}
                </h1>
                <p className="text-richGray-700 text-lg md:text-xl max-w-2xl mx-auto">
                  {t("header.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pills (Categories) */}
        <section className="hidden md:block pb-8 px-6 md:px-12 lg:px-24 relative">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, idx) => (
                <button
                  key={idx}
                  className={`category-pill px-5 py-2 rounded-full font-medium text-sm ${
                    category.value === "all" ? "active" : ""
                  }`}
                  data-category={category.value}
                >
                  {t(category.labelKey)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="pb-20 px-6 md:px-12 lg:px-24 relative">
          <div className="max-w-4xl mx-auto">
            {faqData.map((faqItem) => (
              <div
                key={faqItem.key}
                className="glass-card rounded-3xl p-6 md:p-8 mb-6 scroll-reveal"
                data-category={faqItem.category}
              >
                <div className="faq-header cursor-pointer flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-xl bg-indigo/10 flex items-center justify-center mr-4">
                      <span className="text-2xl emoji-icon">
                        {t(`questions.${faqItem.key}.emoji`)}
                      </span>
                    </div>
                    <h3 className="font-space font-bold text-lg md:text-xl">
                      {t(`questions.${faqItem.key}.title`)}
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
                    {/* Render content based on faqItem.key */}
                    {faqItem.key === "whatIsSecrely" && (
                      <>
                        <p className="text-richGray-700 leading-relaxed mb-4">
                          {t("questions.whatIsSecrely.content1")}
                        </p>
                        <p className="text-richGray-700 leading-relaxed mb-4">
                          {t("questions.whatIsSecrely.content2")}
                        </p>
                        <p className="text-richGray-700 leading-relaxed">
                          {t("questions.whatIsSecrely.content3")}
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                          <li>
                            <span className="font-medium">
                              {t("questions.whatIsSecrely.listItem1.bold")}
                            </span>{" "}
                            {t("questions.whatIsSecrely.listItem1.text")}
                          </li>
                          <li>
                            <span className="font-medium">
                              {t("questions.whatIsSecrely.listItem2.bold")}
                            </span>{" "}
                            {t("questions.whatIsSecrely.listItem2.text")}
                          </li>
                          <li>
                            <span className="font-medium">
                              {t("questions.whatIsSecrely.listItem3.bold")}
                            </span>{" "}
                            {t("questions.whatIsSecrely.listItem3.text")}
                          </li>
                          <li>
                            <span className="font-medium">
                              {t("questions.whatIsSecrely.listItem4.bold")}
                            </span>{" "}
                            {t("questions.whatIsSecrely.listItem4.text")}
                          </li>
                        </ul>
                        <p className="text-richGray-700 leading-relaxed">
                          {t("questions.whatIsSecrely.content4")}
                        </p>
                      </>
                    )}

                    {faqItem.key === "isMyIdentityAnonymous" && (
                      <>
                        <p className="text-richGray-700 leading-relaxed mb-4">
                          {t("questions.isMyIdentityAnonymous.content1")}
                        </p>
                        <p className="text-richGray-700 leading-relaxed">
                          {t("questions.isMyIdentityAnonymous.content2")}
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                          <li>
                            <span className="font-medium">
                              {t(
                                "questions.isMyIdentityAnonymous.listItem1.bold"
                              )}
                            </span>{" "}
                            {t(
                              "questions.isMyIdentityAnonymous.listItem1.text"
                            )}
                          </li>
                          <li>
                            <span className="font-medium">
                              {t(
                                "questions.isMyIdentityAnonymous.listItem2.bold"
                              )}
                            </span>{" "}
                            {t(
                              "questions.isMyIdentityAnonymous.listItem2.text"
                            )}
                          </li>
                          <li>
                            <span className="font-medium">
                              {t(
                                "questions.isMyIdentityAnonymous.listItem3.bold"
                              )}
                            </span>{" "}
                            {t(
                              "questions.isMyIdentityAnonymous.listItem3.text"
                            )}
                          </li>
                        </ul>
                        <p className="text-richGray-700 leading-relaxed">
                          {t("questions.isMyIdentityAnonymous.content3")}
                        </p>
                      </>
                    )}

                    {faqItem.key === "canIControlWhoSendsMessages" && (
                      <>
                        <p className="text-richGray-700 leading-relaxed mb-4">
                          {t("questions.canIControlWhoSendsMessages.content1")}
                        </p>
                        <p className="text-richGray-700 leading-relaxed">
                          {t("questions.canIControlWhoSendsMessages.content2")}
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                          <li>
                            <span className="font-medium">
                              {t(
                                "questions.canIControlWhoSendsMessages.listItem1.bold"
                              )}
                            </span>{" "}
                            {t(
                              "questions.canIControlWhoSendsMessages.listItem1.text"
                            )}
                          </li>
                          <li>
                            <span className="font-medium">
                              {t(
                                "questions.canIControlWhoSendsMessages.listItem2.bold"
                              )}
                            </span>{" "}
                            {t(
                              "questions.canIControlWhoSendsMessages.listItem2.text"
                            )}
                          </li>
                        </ul>
                        <p className="text-richGray-700 leading-relaxed">
                          {t("questions.canIControlWhoSendsMessages.content3")}
                        </p>
                      </>
                    )}

                    {faqItem.key === "canIReplyToMessages" && (
                      <>
                        <p className="text-richGray-700 leading-relaxed mb-4">
                          {t("questions.canIReplyToMessages.content1")}
                        </p>
                        <p className="text-richGray-700 leading-relaxed">
                          {t("questions.canIReplyToMessages.content2")}
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                          <li>
                            <span className="font-medium">
                              {t(
                                "questions.canIReplyToMessages.listItem1.bold"
                              )}
                            </span>{" "}
                            {t("questions.canIReplyToMessages.listItem1.text")}
                          </li>
                          <li>
                            <span className="font-medium">
                              {t(
                                "questions.canIReplyToMessages.listItem2.bold"
                              )}
                            </span>{" "}
                            {t("questions.canIReplyToMessages.listItem2.text")}
                          </li>
                          <li>
                            <span className="font-medium">
                              {t(
                                "questions.canIReplyToMessages.listItem3.bold"
                              )}
                            </span>{" "}
                            {t("questions.canIReplyToMessages.listItem3.text")}
                          </li>
                          <li>
                            <span className="font-medium">
                              {t(
                                "questions.canIReplyToMessages.listItem4.bold"
                              )}
                            </span>{" "}
                            {t("questions.canIReplyToMessages.listItem4.text")}
                          </li>
                        </ul>
                        <p className="text-richGray-700 leading-relaxed">
                          {t("questions.canIReplyToMessages.content3")}
                        </p>
                      </>
                    )}

                    {faqItem.key === "howDoIReportAbuse" && (
                      <>
                        <p className="text-richGray-700 leading-relaxed mb-4">
                          {t("questions.howDoIReportAbuse.content1")}
                        </p>
                        <ol className="list-decimal pl-5 space-y-2 text-richGray-700 mb-4">
                          <li>{t("questions.howDoIReportAbuse.step1")}</li>
                          <li>{t("questions.howDoIReportAbuse.step2")}</li>
                          <li>{t("questions.howDoIReportAbuse.step3")}</li>
                          <li>{t("questions.howDoIReportAbuse.step4")}</li>
                          <li>{t("questions.howDoIReportAbuse.step5")}</li>
                        </ol>
                        <p className="text-richGray-700 leading-relaxed mb-4">
                          {t("questions.howDoIReportAbuse.content2")}
                        </p>
                        <div className="bg-indigo/5 rounded-xl p-4 border border-indigo/20">
                          <p className="text-richGray-700 leading-relaxed">
                            <span className="font-medium">
                              {t("questions.howDoIReportAbuse.note.bold")}
                            </span>{" "}
                            {t("questions.howDoIReportAbuse.note.text")}
                          </p>
                        </div>
                      </>
                    )}

                    {faqItem.key === "isThisAvailableOnAndroidIos" && (
                      <>
                        <p className="text-richGray-700 leading-relaxed mb-4">
                          {t("questions.isThisAvailableOnAndroidIos.content1")}
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                          <li>
                            <span className="font-medium">
                              {t(
                                "questions.isThisAvailableOnAndroidIos.platform1.bold"
                              )}
                            </span>{" "}
                            {t(
                              "questions.isThisAvailableOnAndroidIos.platform1.text"
                            )}
                          </li>
                          <li>
                            <span className="font-medium">
                              {t(
                                "questions.isThisAvailableOnAndroidIos.platform2.bold"
                              )}
                            </span>{" "}
                            {t(
                              "questions.isThisAvailableOnAndroidIos.platform2.text"
                            )}
                          </li>
                        </ul>
                        <p className="text-richGray-700 leading-relaxed mb-4">
                          {t("questions.isThisAvailableOnAndroidIos.content2")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                          <a
                            href="#"
                            className="flex items-center justify-center bg-richGray-800 text-white rounded-xl hover:bg-richGray-700 transition-colors"
                          >
                            <Image
                              src="/playstorelogo.png"
                              width={200}
                              height={200}
                              alt="Play Store Logo"
                            />
                          </a>
                        </div>
                      </>
                    )}

                    {faqItem.key === "howDoICreateAnAccount" && (
                      <>
                        <p className="text-richGray-700 leading-relaxed mb-4">
                          {t("questions.howDoICreateAnAccount.content1")}
                        </p>
                        <ol className="list-decimal pl-5 space-y-2 text-richGray-700 mb-4">
                          <li>{t("questions.howDoICreateAnAccount.step1")}</li>
                          <li>{t("questions.howDoICreateAnAccount.step2")}</li>
                          <li>{t("questions.howDoICreateAnAccount.step3")}</li>
                          <li>{t("questions.howDoICreateAnAccount.step4")}</li>
                          <li>{t("questions.howDoICreateAnAccount.step5")}</li>
                        </ol>
                        <p className="text-richGray-700 leading-relaxed">
                          {t("questions.howDoICreateAnAccount.content2")}
                        </p>
                      </>
                    )}

                    {faqItem.key === "whatMessageTypesDoesSecrelySupport" && (
                      <>
                        <p className="text-richGray-700 leading-relaxed mb-4">
                          {t(
                            "questions.whatMessageTypesDoesSecrelySupport.content1"
                          )}
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                          <li>
                            <span className="font-medium">
                              {t(
                                "questions.whatMessageTypesDoesSecrelySupport.type1.bold"
                              )}
                            </span>{" "}
                            <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                              <li>
                                <span className="font-medium">
                                  {t(
                                    "questions.whatMessageTypesDoesSecrelySupport.type1.subType1.bold"
                                  )}
                                </span>{" "}
                                {t(
                                  "questions.whatMessageTypesDoesSecrelySupport.type1.subType1.text"
                                )}
                              </li>
                              <li>
                                <span className="font-medium">
                                  {t(
                                    "questions.whatMessageTypesDoesSecrelySupport.type1.subType2.bold"
                                  )}
                                </span>{" "}
                                {t(
                                  "questions.whatMessageTypesDoesSecrelySupport.type1.subType2.text"
                                )}
                              </li>
                            </ul>
                          </li>
                          <li>
                            <span className="font-medium">
                              {t(
                                "questions.whatMessageTypesDoesSecrelySupport.type2.bold"
                              )}
                            </span>{" "}
                            <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                              <li>
                                <span className="font-medium">
                                  {t(
                                    "questions.whatMessageTypesDoesSecrelySupport.type2.subType1.bold"
                                  )}
                                </span>{" "}
                                {t(
                                  "questions.whatMessageTypesDoesSecrelySupport.type2.subType1.text"
                                )}
                              </li>
                            </ul>
                          </li>
                        </ul>
                        <p className="text-richGray-700 leading-relaxed">
                          <span className="font-medium">
                            {t(
                              "questions.whatMessageTypesDoesSecrelySupport.note.bold"
                            )}
                          </span>{" "}
                          {t(
                            "questions.whatMessageTypesDoesSecrelySupport.note.text"
                          )}
                        </p>
                      </>
                    )}

                    {faqItem.key === "howSecureAreMyMessages" && (
                      <>
                        <p className="text-richGray-700 leading-relaxed mb-4">
                          {t("questions.howSecureAreMyMessages.content1")}
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-richGray-700 mb-4">
                          <li>
                            <span className="font-medium">
                              {t(
                                "questions.howSecureAreMyMessages.listItem1.bold"
                              )}
                            </span>{" "}
                            {t(
                              "questions.howSecureAreMyMessages.listItem1.text"
                            )}
                          </li>
                          <li>
                            <span className="font-medium">
                              {t(
                                "questions.howSecureAreMyMessages.listItem2.bold"
                              )}
                            </span>
                            {t(
                              "questions.howSecureAreMyMessages.listItem2.text"
                            )}
                          </li>
                          <li>
                            <span className="font-medium">
                              {t(
                                "questions.howSecureAreMyMessages.listItem3.bold"
                              )}
                            </span>
                            {t(
                              "questions.howSecureAreMyMessages.listItem3.text"
                            )}
                          </li>
                        </ul>
                        <div className="bg-indigo/5 rounded-xl p-4 border border-indigo/20 mb-4">
                          <p className="text-richGray-700 leading-relaxed">
                            <span className="font-medium">
                              {t(
                                "questions.howSecureAreMyMessages.securityTip.bold"
                              )}
                            </span>{" "}
                            {t(
                              "questions.howSecureAreMyMessages.securityTip.text"
                            )}
                          </p>
                        </div>
                        <p className="text-richGray-700 leading-relaxed">
                          {t("questions.howSecureAreMyMessages.content2")}
                        </p>
                      </>
                    )}

                    {faqItem.key === "isSecrelyFreeToUse" && (
                      <>
                        <p className="text-richGray-700 leading-relaxed mb-4">
                          {t("questions.isSecrelyFreeToUse.content1")}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                          <div className="bg-indigo/5 rounded-xl p-4 border border-indigo/20">
                            <h4 className="font-bold mb-2">
                              {t("questions.isSecrelyFreeToUse.freePlan.title")}
                            </h4>
                            <ul className="list-disc pl-5 space-y-1 text-richGray-700">
                              <li>
                                <span className="font-medium">
                                  {t(
                                    "questions.isSecrelyFreeToUse.freePlan.listItem1.bold"
                                  )}
                                </span>{" "}
                                {t(
                                  "questions.isSecrelyFreeToUse.freePlan.listItem1.text"
                                )}
                              </li>
                              <li>
                                <span className="font-medium">
                                  {t(
                                    "questions.isSecrelyFreeToUse.freePlan.listItem2.bold"
                                  )}
                                </span>{" "}
                                {t(
                                  "questions.isSecrelyFreeToUse.freePlan.listItem2.text"
                                )}
                                <ul className="list-disc pl-5 space-y-1 text-richGray-700">
                                  <li>
                                    {t(
                                      "questions.isSecrelyFreeToUse.freePlan.listItem2.subListItem1"
                                    )}
                                  </li>
                                  <li>
                                    {t(
                                      "questions.isSecrelyFreeToUse.freePlan.listItem2.subListItem2"
                                    )}
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <span className="font-medium">
                                  {t(
                                    "questions.isSecrelyFreeToUse.freePlan.listItem3.bold"
                                  )}
                                </span>{" "}
                                {t(
                                  "questions.isSecrelyFreeToUse.freePlan.listItem3.text"
                                )}
                              </li>
                              <li>
                                {t(
                                  "questions.isSecrelyFreeToUse.freePlan.listItem4"
                                )}
                              </li>
                              <li>
                                {t(
                                  "questions.isSecrelyFreeToUse.freePlan.listItem5"
                                )}
                              </li>
                            </ul>
                          </div>
                          <div className="bg-gradient-to-br from-indigo/10 to-softPink/20 rounded-xl p-4 border border-indigo/20">
                            <h4 className="font-bold mb-2">
                              {t(
                                "questions.isSecrelyFreeToUse.premiumPlan.title"
                              )}
                            </h4>
                            <p className="text-richGray-700 leading-relaxed">
                              {t(
                                "questions.isSecrelyFreeToUse.premiumPlan.content"
                              )}
                            </p>
                          </div>
                        </div>
                        <p className="text-richGray-700 leading-relaxed">
                          {t("questions.isSecrelyFreeToUse.content2")}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-indigo/10 to-softPink/20 scroll-reveal">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <h2 className="font-space font-bold text-2xl mb-3">
                    {t("stillHaveQuestions.title")}
                  </h2>
                  <p className="text-richGray-700 leading-relaxed">
                    {t("stillHaveQuestions.description")}
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
                    {t("stillHaveQuestions.contactButton")}
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
