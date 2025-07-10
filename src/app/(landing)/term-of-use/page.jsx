// src/app/term-of-use/page.tsx
"use client";
import React, { useEffect } from "react";
import "@/app/globals.css";
import { useTranslations } from "next-intl";

export default function TermOfUse() {
  const t = useTranslations("TermOfUse");

  useEffect(() => {
    const sectionHeaders = document.querySelectorAll(".section-header");

    sectionHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector(".section-icon");

        content.classList.toggle("active");
        icon.classList.toggle("active");

        if (content.classList.contains("active")) {
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.style.maxHeight = null;
        }
      });
    });

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

    const allSections = document.querySelectorAll(".section-content");
    const allIcons = document.querySelectorAll(".section-icon");

    allSections.forEach((section) => {
      section.classList.add("active");
      section.style.maxHeight = section.scrollHeight + "px";
    });

    allIcons.forEach((icon) => icon.classList.add("active"));

    const tocLinks = document.querySelectorAll(".toc-link");

    tocLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const header = targetElement.querySelector(".section-header");
          const scrollTarget = header || targetElement;

          const yOffset = -120;
          const y =
            scrollTarget.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;

          setTimeout(() => {
            window.scrollTo({ top: y, behavior: "smooth" });
          }, 300);

          tocLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    });

    const handleScroll = () => {
      const sections = document.querySelectorAll('div[id^="section-"]');
      const scrollPosition = window.scrollY;
      let closestSectionId = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const header = section.querySelector(".section-header");
        if (!header) return;

        const rect = header.getBoundingClientRect();
        const distance = Math.abs(rect.top - 130);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSectionId = section.getAttribute("id");
        }
      });
      if (closestSectionId) {
        const correspondingLink = document.querySelector(
          `a[href="#${closestSectionId}"]`
        );

        tocLinks.forEach((link) => link.classList.remove("active"));
        if (correspondingLink) {
          correspondingLink.classList.add("active");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      const header = el?.querySelector(".section-header");
      const scrollTarget = header || el;

      const yOffset = -100;
      const y =
        scrollTarget.getBoundingClientRect().top + window.pageYOffset + yOffset;

      setTimeout(() => {
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 300);
    }
  }, []);

  const termsData = [
    {
      id: "section-1",
      title: t("section1.title"),
      content: (
        <>
          <p className="mb-4">{t("section1.content1")}</p>
          <p className="mb-4">{t("section1.content2")}</p>
          <div className="bg-indigo/5 rounded-xl p-6 my-4 border border-indigo/20">
            <div className="flex items-start">
              <div className="mr-3 text-xl">✨</div>
              <div>
                <p className="font-medium">{t("simpleTerms")}</p>
                <p>{t("section1.simpleContent")}</p>
              </div>
            </div>
          </div>
          <p>{t("section1.content3")}</p>
        </>
      ),
    },
    {
      id: "section-2",
      title: t("section2.title"),
      content: (
        <>
          <h3 className="font-bold text-lg mb-3">{t("section2.subtitle1")}</h3>
          <p className="mb-4">{t("section2.content1")}</p>
          <h3 className="font-bold text-lg mb-3">{t("section2.subtitle2")}</h3>
          <p className="mb-4">{t("section2.content2")}</p>
          <h3 className="font-bold text-lg mb-3">{t("section2.subtitle3")}</h3>
          <p className="mb-4">{t("section2.content3")}</p>
          <div className="bg-indigo/5 rounded-xl p-6 my-4 border border-indigo/20">
            <div className="flex items-start">
              <div className="mr-3 text-xl">🔑</div>
              <div>
                <p className="font-medium">{t("simpleTerms")}</p>
                <p>{t("section2.simpleContent")}</p>
              </div>
            </div>
          </div>
          <h3 className="font-bold text-lg mb-3">{t("section2.subtitle4")}</h3>
          <p>{t("section2.content4")}</p>
        </>
      ),
    },
    {
      id: "section-3",
      title: t("section3.title"),
      content: (
        <>
          <h3 className="font-bold text-lg mb-3">{t("section3.subtitle1")}</h3>
          <p className="mb-4">{t("section3.content1")}</p>
          <h3 className="font-bold text-lg mb-3">{t("section3.subtitle2")}</h3>
          <p className="mb-4">{t("section3.content2")}</p>
          <h3 className="font-bold text-lg mb-3">{t("section3.subtitle3")}</h3>
          <p className="mb-4">{t("section3.content3")}</p>
          <div className="bg-indigo/5 rounded-xl p-6 my-4 border border-indigo/20">
            <div className="flex items-start">
              <div className="mr-3 text-xl">🔒</div>
              <div>
                <p className="font-medium">{t("simpleTerms")}</p>
                <p>{t("section3.simpleContent")}</p>
              </div>
            </div>
          </div>
          <h3 className="font-bold text-lg mb-3">{t("section3.subtitle4")}</h3>
          <p>{t("section3.content4")}</p>
        </>
      ),
    },
    {
      id: "section-4",
      title: t("section4.title"),
      content: (
        <>
          <p className="mb-4">{t("section4.content1")}</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            {Array(10).fill().map((_, i) => (
              <li key={i}>{t(`section4.listItem${i+1}`)}</li>
            ))}
          </ul>
          <div className="bg-indigo/5 rounded-xl p-6 my-4 border border-indigo/20">
            <div className="flex items-start">
              <div className="mr-3 text-xl">🚫</div>
              <div>
                <p className="font-medium">{t("simpleTerms")}</p>
                <p>{t("section4.simpleContent")}</p>
              </div>
            </div>
          </div>
          <p>{t("section4.content2")}</p>
        </>
      ),
    },
    {
      id: "section-5",
      title: t("section5.title"),
      content: (
        <>
          <h3 className="font-bold text-lg mb-3">{t("section5.subtitle1")}</h3>
          <p className="mb-4">{t("section5.content1")}</p>
          <h3 className="font-bold text-lg mb-3">{t("section5.subtitle2")}</h3>
          <p className="mb-4">{t("section5.content2")}</p>
          <div className="bg-indigo/5 rounded-xl p-6 my-4 border border-indigo/20">
            <div className="flex items-start">
              <div className="mr-3 text-xl">🔄</div>
              <div>
                <p className="font-medium">{t("simpleTerms")}</p>
                <p>{t("section5.simpleContent")}</p>
              </div>
            </div>
          </div>
          <h3 className="font-bold text-lg mb-3">{t("section5.subtitle3")}</h3>
          <p>{t("section5.content3")}</p>
        </>
      ),
    },
    {
      id: "section-6",
      title: t("section6.title"),
      content: (
        <>
          <p className="mb-4">{t("section6.content1")}</p>
          <p className="mb-4">{t("section6.content2")}</p>
          <div className="bg-indigo/5 rounded-xl p-6 my-4 border border-indigo/20">
            <div className="flex items-start">
              <div className="mr-3 text-xl">📝</div>
              <div>
                <p className="font-medium">{t("simpleTerms")}</p>
                <p>{t("section6.simpleContent")}</p>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "section-7",
      title: t("section7.title"),
      content: (
        <>
          <h3 className="font-bold text-lg mb-3">{t("section7.subtitle1")}</h3>
          <p className="mb-4">{t("section7.content1")}</p>
          <p className="mb-4">{t("section7.content2")}</p>
          <h3 className="font-bold text-lg mb-3">{t("section7.subtitle2")}</h3>
          <p className="mb-4">{t("section7.content3")}</p>
          <p className="mb-4">{t("section7.content4")}</p>
          <div className="bg-indigo/5 rounded-xl p-6 my-4 border border-indigo/20">
            <div className="flex items-start">
              <div className="mr-3 text-xl">⚖️</div>
              <div>
                <p className="font-medium">{t("simpleTerms")}</p>
                <p>{t("section7.simpleContent")}</p>
              </div>
            </div>
          </div>
          <h3 className="font-bold text-lg mb-3">{t("section7.subtitle3")}</h3>
          <p>{t("section7.content5")}</p>
        </>
      ),
    },
    {
      id: "section-8",
      title: t("section8.title"),
      content: (
        <>
          <p className="mb-4">{t("section8.content1")}</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              {t("section8.emailLabel")}:
              <a
                href="mailto:legal-secrely@limapp.my.id"
                className="text-indigo hover:underline"
              >
                legal-secrely@limapp.my.id
              </a>
            </li>
            <li>{t("section8.address")}</li>
          </ul>
          <div className="bg-indigo/5 rounded-xl p-6 my-4 border border-indigo/20">
            <div className="flex items-start">
              <div className="mr-3 text-xl">💬</div>
              <div>
                <p className="font-medium">{t("simpleTerms")}</p>
                <p>{t("section8.simpleContent")}</p>
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <main className="font-inter text-richGray-800">
      <div className="page-wrapper min-h-screen">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="gradient-blob blob-top-right w-[500px] h-[500px] top-[-100px] right-[-100px]"></div>
          <div className="gradient-blob blob-left-center w-[600px] h-[600px] bottom-[20%] left-[-200px]"></div>
          <div className="gradient-blob blob-bottom-right w-[200px] h-[200px] bottom-[15%] right-[20%]"></div>
        </div>

        {/* Header Section */}
        <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo/10 to-softPink/20 z-0"></div>
              <div className="relative z-10">
                <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-indigo/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-indigo terms-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h1 className="font-space font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
                  {t("pageTitle")}
                </h1>
                <p className="text-richGray-700 text-lg md:text-xl max-w-2xl mx-auto">
                  {t("pageSubtitle")}
                </p>
                <p className="text-richGray-700 mt-4">
                  {t("lastUpdated")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 px-6 md:px-12 lg:px-24 relative">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/4">
                <div className="hidden lg:block sticky top-24">
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="font-space font-bold text-xl mb-4">
                      {t("contentsTitle")}
                    </h3>
                    <ul className="space-y-3" id="toc">
                      {termsData.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="toc-link text-richGray-700 hover:text-indigo"
                          >
                            {item.id.replace("section-", "")}. {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:w-3/4">
                {termsData.map((item, index) => (
                  <div
                    key={item.id}
                    id={item.id}
                    className="glass-card rounded-3xl p-8 mb-8 scroll-reveal"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <div className="section-header cursor-pointer flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="number-badge mr-4">{index + 1}</div>{" "}
                        <h2 className="font-space font-bold text-xl md:text-2xl">
                          {item.title}
                        </h2>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-indigo section-icon"
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
                    <div className="section-content mt-4 text-richGray-700 leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                ))}

                <div
                  className="glass-card rounded-3xl p-8 bg-gradient-to-br from-indigo/10 to-softPink/20 scroll-reveal"
                  style={{ transitionDelay: `${termsData.length * 0.1}s` }}
                >
                  <div className="text-center">
                    <h2 className="font-space font-bold text-2xl mb-4">
                      {t("stillHaveQuestions")}
                    </h2>
                    <p className="text-richGray-700 mb-6">
                      {t("questionsHelp")}
                    </p>
                    <a href="mailto:support-secrely@limapp.my.id" className="neo-button text-white px-8 py-3 rounded-xl font-bold mx-auto">
                      {t("contactSupport")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}