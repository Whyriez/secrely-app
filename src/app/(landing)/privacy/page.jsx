"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";

function Privacy() {
  const t = useTranslations("PrivacyPolicy");

  const accordionKeys = Object.keys(t.raw('accordionContent'));

  useEffect(() => {
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

    const headers = document.querySelectorAll(".accordion-header");
    headers.forEach((header) => {
      header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector(".accordion-icon");

        const isOpen = content.classList.contains("active");

        document.querySelectorAll(".accordion-content").forEach((c) => {
          c.classList.remove("active");
          c.style.maxHeight = null;
        });
        document
          .querySelectorAll(".accordion-icon")
          .forEach((i) => i.classList.remove("active"));

        if (!isOpen) {
          content.classList.add("active");
          icon.classList.add("active");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });

    const firstAccordion = document.querySelector(".accordion-content");
    const firstIcon = document.querySelector(".accordion-icon");
    if (firstAccordion && firstIcon) {
      firstAccordion.classList.add("active");
      firstIcon.classList.add("active");
      firstAccordion.style.maxHeight = firstAccordion.scrollHeight + "px";
    }

    // Parallax effect (existing code)
    const handleMouseMove = (e) => {
      const elements = document.querySelectorAll(".parallax");
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      elements.forEach((el) => {
        const depth = parseFloat(el.getAttribute("data-depth") || 0.1);
        const moveX = mouseX * depth * 50;
        const moveY = mouseY * depth * 50;
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="font-inter text-richGray-800 overflow-hidden min-h-screen">
      <div className="page-wrapper overflow-hidden min-h-screen">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="gradient-blob blob-top-right w-[500px] h-[500px] top-[-100px] right-[-100px]"></div>
          <div className="gradient-blob blob-left-center w-[600px] h-[600px] bottom-[20%] left-[-200px]"></div>
          <div className="gradient-blob blob-bottom-right w-[200px] h-[200px] bottom-[15%] right-[20%]"></div>
        </div>

        <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo/10 to-softPink/20 z-0" />
              <div className="relative z-10">
                <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-indigo/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-indigo"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h1 className="font-space font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
                  {t("heroSection.title")}
                </h1>
                <p className="text-richGray-700 text-lg md:text-xl max-w-2xl mx-auto">
                  {t("heroSection.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16 px-6 md:px-12 lg:px-24 relative">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-8 scroll-reveal">
              <h2 className="font-space font-bold text-2xl mb-6 text-center">
                {t("whatYouNeedToKnow.title")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card rounded-2xl p-6 text-center icon-container">
                  <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-indigo/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-indigo privacy-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-space font-bold text-lg mb-2">
                    {t("whatYouNeedToKnow.endToEndPrivate.title")}
                  </h3>
                  <p className="text-richGray-700">
                    {t("whatYouNeedToKnow.endToEndPrivate.description")}
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-6 text-center icon-container">
                  <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-indigo/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-indigo privacy-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                  </div>
                  <h3 className="font-space font-bold text-lg mb-2">
                    {t("whatYouNeedToKnow.noDataSelling.title")}
                  </h3>
                  <p className="text-richGray-700">
                    {t("whatYouNeedToKnow.noDataSelling.description")}
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-6 text-center icon-container">
                  <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-indigo/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-indigo privacy-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-space font-bold text-lg mb-2">
                    {t("whatYouNeedToKnow.youAreInControl.title")}
                  </h3>
                  <p className="text-richGray-700">
                    {t("whatYouNeedToKnow.youAreInControl.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 px-6 md:px-12 lg:px-24 relative">
          <div className="max-w-4xl mx-auto">
            {/* Iterasi melalui kunci-kunci objek accordionContent */}
            {accordionKeys.map((key, index) => {
              const item = t.raw(`accordionContent.${key}`); // Mendapatkan seluruh objek item dari terjemahan
              const itemTitle = item.title;
              const itemIntro = item.intro;
              const itemIconPath = item.iconPath;
              const itemSections = item.sections;
              const itemMainItems = item.items; // Untuk Child Safety Policy section
              const itemFooter = item.footer; // Untuk Third-Party Services section

              // Dapatkan konten spesifik untuk setiap akordion
              let contentToRender;
              if (key === 'item0') { // What Data We Collect
                contentToRender = (
                  <>
                    <p className="mb-4">{itemIntro}</p>

                    <div className="pl-4 mb-4">
                      <h3 className="font-bold mb-2">{itemSections.accountInfo.title}</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {itemSections.accountInfo.items.map((subItem, subIdx) => (
                          <li key={subIdx}>{subItem}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pl-4 mb-4">
                      <h3 className="font-bold mb-2">{itemSections.messageContent.title}</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {itemSections.messageContent.items.map((subItem, subIdx) => (
                          <li key={subIdx}>{subItem}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pl-4 mb-4">
                      <h3 className="font-bold mb-2">{itemSections.deviceInfo.title}</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {itemSections.deviceInfo.items.map((subItem, subIdx) => (
                          <li key={subIdx}>{subItem}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pl-4">
                      <h3 className="font-bold mb-2">{itemSections.usageInfo.title}</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {itemSections.usageInfo.items.map((subItem, subIdx) => (
                          <li key={subIdx}>{subItem}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                );
              } else if (key === 'item1') { // How Your Data Is Used
                contentToRender = (
                  <>
                    <p className="mb-4">{itemIntro}</p>

                    <div className="pl-4 mb-4">
                      <h3 className="font-bold mb-2">{itemSections.provideService.title}</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {itemSections.provideService.items.map((subItem, subIdx) => (
                          <li key={subIdx}>{subItem}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pl-4 mb-4">
                      <h3 className="font-bold mb-2">{itemSections.improveService.title}</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {itemSections.improveService.items.map((subItem, subIdx) => (
                          <li key={subIdx}>{subItem}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pl-4 mb-4">
                      <h3 className="font-bold mb-2">{itemSections.keepSafe.title}</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {itemSections.keepSafe.items.map((subItem, subIdx) => (
                          <li key={subIdx}>{subItem}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pl-4">
                      <h3 className="font-bold mb-2">{itemSections.communicate.title}</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {itemSections.communicate.items.map((subItem, subIdx) => (
                          <li key={subIdx}>{subItem}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                );
              } else if (key === 'item2') { // Third-Party Services
                contentToRender = (
                  <>
                    <p className="mb-4">{itemIntro}</p>

                    <div className="pl-4 mb-4">
                      <h3 className="font-bold mb-2">{itemSections.cloudInfrastructure.title}</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <span className="font-medium">{itemSections.cloudInfrastructure.supabase.name}</span> {itemSections.cloudInfrastructure.supabase.description}
                        </li>
                        <li>
                          <span className="font-medium">{itemSections.cloudInfrastructure.vercel.name}</span> {itemSections.cloudInfrastructure.vercel.description}
                        </li>
                        <li>
                          <span className="font-medium">{itemSections.cloudInfrastructure.cloudflare.name}</span> {itemSections.cloudInfrastructure.cloudflare.description}
                        </li>
                      </ul>
                    </div>

                    <div className="pl-4 mb-4">
                      <h3 className="font-bold mb-2">{itemSections.analytics.title}</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <span className="font-medium">{itemSections.analytics.vercelAnalytics.name}</span> {itemSections.analytics.vercelAnalytics.description}
                        </li>
                        <li>
                          <span className="font-medium">{itemSections.analytics.cloudflareAnalytics.name}</span> {itemSections.analytics.cloudflareAnalytics.description}
                        </li>
                        <li>
                          <span className="font-medium">{itemSections.analytics.supabaseLogsMetrics.name}</span> {itemSections.analytics.supabaseLogsMetrics.description}
                        </li>
                      </ul>
                    </div>

                    <div className="pl-4 mb-4">
                      <h3 className="font-bold mb-2">{itemSections.mediaEmbedding.title}</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <span className="font-medium">{itemSections.mediaEmbedding.spotify.name}</span> {itemSections.mediaEmbedding.spotify.description}
                          <a
                            href="https://www.spotify.com/us/legal/privacy-policy/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo hover:underline"
                          >
                            {" "}
                            {itemSections.mediaEmbedding.spotify.policyLinkText}
                          </a>
                        </li>
                      </ul>
                    </div>

                    <p className="mt-4">{itemFooter}</p>
                  </>
                );
              } else if (key === 'item3') { // Your Rights & Control Options
                contentToRender = (
                  <>
                    <p className="mb-4">{itemIntro}</p>

                    <div className="pl-4 mb-4">
                      <h3 className="font-bold mb-2">{itemSections.deleteData.title}</h3>
                      <p className="mb-2">{itemSections.deleteData.description}</p>
                      <ul className="list-disc pl-5 space-y-2">
                        {itemSections.deleteData.steps.map((subItem, subIdx) => (
                          <li key={subIdx}>{subItem}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pl-4 mb-4">
                      <h3 className="font-bold mb-2">{itemSections.privacySettings.title}</h3>
                      <p className="mb-2">{itemSections.privacySettings.description}</p>
                      <ul className="list-disc pl-5 space-y-2">
                        {itemSections.privacySettings.items.map((subItem, subIdx) => (
                          <li key={subIdx} dangerouslySetInnerHTML={{ __html: subItem }}></li>
                        ))}
                      </ul>
                    </div>

                    <div className="pl-4">
                      <h3 className="font-bold mb-2">{itemSections.additionalRights.title}</h3>
                      <p className="mb-2">{itemSections.additionalRights.description}</p>
                      <ul className="list-disc pl-5 space-y-2">
                        {itemSections.additionalRights.items.map((subItem, subIdx) => (
                          <li key={subIdx}>{subItem}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                );
              } else if (key === 'item4') { // Child Safety & CSAE Protection Policy
                contentToRender = (
                  <>
                    <p className="mb-4">{itemIntro}</p>

                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      {itemMainItems.map((subItem, subIdx) => (
                        <li key={subIdx}>
                          <span className="font-medium">{subItem.title}</span>{" "}
                          {subItem.description}
                        </li>
                      ))}
                    </ul>

                    <p>
                      {item.contactPrompt}{" "}
                      <a
                        href="mailto:abuse-secrely@limapp.my.id"
                        className="text-indigo hover:underline"
                      >
                        {item.contactEmail}
                      </a>
                    </p>
                  </>
                );
              }

              return (
                <div
                  key={index}
                  className="glass-card rounded-3xl p-8 mb-8 scroll-reveal"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="accordion-header cursor-pointer flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-xl bg-indigo/10 flex items-center justify-center mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-indigo privacy-icon"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={itemIconPath}
                          />
                        </svg>
                      </div>
                      <h2 className="font-space font-bold text-xl md:text-2xl">
                        {itemTitle}
                      </h2>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo accordion-icon"
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
                  <div className="accordion-content mt-4 text-richGray-700 leading-relaxed">
                    {contentToRender}
                  </div>
                </div>
              );
            })}

            {/* Contact for Privacy Inquiries section - dirender terpisah karena struktur berbeda */}
            <div
              className="glass-card rounded-3xl p-8 scroll-reveal"
              style={{ transitionDelay: `${accordionKeys.length * 0.1}s` }}
            >
              <div className="accordion-header cursor-pointer flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-xl bg-indigo/10 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo privacy-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="font-space font-bold text-xl md:text-2xl">
                    {t("contactSection.title")}
                  </h2>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo accordion-icon"
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
              <div className="accordion-content mt-4 text-richGray-700 leading-relaxed">
                <p className="mb-4">{t("contactSection.intro")}</p>

                <div className="pl-4 mb-6">
                  <h3 className="font-bold mb-2">{t("contactSection.privacyTeam.title")}</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Email:{" "}
                      <a
                        href={`mailto:${t("contactSection.privacyTeam.email")}`}
                        className="text-indigo hover:underline"
                      >
                        {t("contactSection.privacyTeam.email")}
                      </a>
                    </li>
                    <li>{t("contactSection.privacyTeam.responseTime")}</li>
                  </ul>
                </div>

                <div className="pl-4 mb-6">
                  <h3 className="font-bold mb-2">{t("contactSection.dpo.title")}</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t("contactSection.dpo.name")}</li>
                    <li>
                      Email:{" "}
                      <a
                        href={`mailto:${t("contactSection.dpo.email")}`}
                        className="text-indigo hover:underline"
                      >
                        {t("contactSection.dpo.email")}
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="pl-4 mb-6">
                  <h3 className="font-bold mb-2">{t("contactSection.mailingAddress.title")}</h3>
                  <address className="not-italic pl-5">
                    {t("contactSection.mailingAddress.line1")}
                    <br />
                    {t("contactSection.mailingAddress.line2")}
                    <br />
                    {t("contactSection.mailingAddress.line3")}
                    <br />
                    {t("contactSection.mailingAddress.line4")}
                  </address>
                </div>

                <div className="bg-indigo/5 rounded-xl p-6 border border-indigo/20">
                  <h3 className="font-bold mb-2">{t("contactSection.policyUpdates.title")}</h3>
                  <p>{t("contactSection.policyUpdates.text")}</p>
                  <p className="mt-2">
                    <strong>
                      {
                        t("contactSection.policyUpdates.lastUpdated").split(
                          ":"
                        )[0]
                      }
                      :
                    </strong>{" "}
                    {t("contactSection.policyUpdates.lastUpdated")
                      .split(":")[1]
                      .trim()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Privacy;