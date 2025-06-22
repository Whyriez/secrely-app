// src/app/term-of-use/page.tsx
"use client";
import React, { useEffect } from "react";
import "@/app/globals.css";

export default function TermOfUse() {
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
          // Cari .section-header di dalam target
          const header = targetElement.querySelector(".section-header");

          // Scroll ke header atau ke elemen utama jika header tidak ditemukan
          const scrollTarget = header || targetElement;

          // Ambil posisi aktual header terhadap page, bukan parent-nya
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
        const distance = Math.abs(rect.top - 130); // 130 = jarak offset

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
      title: "Acceptance of Terms",
      content: (
        <>
          <p className="mb-4">
            Welcome to Secrely! These Terms of Service ("Terms") govern your use
            of the Secrely application, website, and services (collectively, the
            "Service"). Please read these Terms carefully before using our
            Service.
          </p>

          <p className="mb-4">
            By accessing or using Secrely, you agree to be bound by these Terms.
            If you disagree with any part of the Terms, you may not access the
            Service.
          </p>

          <div className="bg-indigo/5 rounded-xl p-6 my-4 border border-indigo/20">
            <div className="flex items-start">
              <div className="mr-3 text-xl">✨</div>
              <div>
                <p className="font-medium">In simple terms:</p>
                <p>
                  By using our app, you're agreeing to follow these rules. If
                  you don't agree, please don't use Secrely.
                </p>
              </div>
            </div>
          </div>

          <p>
            These Terms apply to all visitors, users, and others who access or
            use the Service. By creating an account or using any part of the
            Service, you're entering into a legal agreement with Secrely.
          </p>
        </>
      ),
    },
    {
      id: "section-2",
      title: "Use of the Service",
      content: (
        <>
          <h3 className="font-bold text-lg mb-3">2.1 Account Registration</h3>
          <p className="mb-4">
            To use certain features of the Service, you may need to create an
            account. You agree to provide accurate, current, and complete
            information during the registration process and to update such
            information to keep it accurate, current, and complete.
          </p>

          <h3 className="font-bold text-lg mb-3">2.2 Account Security</h3>
          <p className="mb-4">
            You are responsible for safeguarding the password that you use to
            access the Service and for any activities or actions under your
            password. We encourage you to use "strong" passwords (passwords that
            use a combination of upper and lower case letters, numbers, and
            symbols) with your account.
          </p>

          <h3 className="font-bold text-lg mb-3">2.3 Age Restrictions</h3>
          <p className="mb-4">
            You must be at least 13 years old to use the Service. By using the
            Service, you represent and warrant that you are over the age of 13.
            If you are under 18, you must have your parent or guardian's
            permission to use the Service.
          </p>

          <div className="bg-indigo/5 rounded-xl p-6 my-4 border border-indigo/20">
            <div className="flex items-start">
              <div className="mr-3 text-xl">🔑</div>
              <div>
                <p className="font-medium">In simple terms:</p>
                <p>
                  Keep your account info accurate and your password secure. You
                  must be at least 13 years old to use Secrely, and if you're
                  under 18, get your parent's permission.
                </p>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-lg mb-3">2.4 Service Availability</h3>
          <p>
            We strive to keep the Service up and running; however, all online
            services experience occasional disruptions and outages, and Secrely
            is no exception. We're not liable for any disruption or loss you may
            suffer as a result. We encourage you to maintain copies of your
            important content.
          </p>
        </>
      ),
    },
    {
      id: "section-3",
      title: "User Content & Anonymity",
      content: (
        <>
          <h3 className="font-bold text-lg mb-3">3.1 Your Content</h3>
          <p className="mb-4">
            Our Service allows you to post, link, store, share and otherwise
            make available certain information, text, or other
            material ("Content"). You are responsible for the Content that you
            post on or through the Service, including its legality, reliability,
            and appropriateness.
          </p>

          <h3 className="font-bold text-lg mb-3">3.2 Content License</h3>
          <p className="mb-4">
            By posting Content on or through the Service, you grant us the right
            to use, modify, publicly perform, publicly display, reproduce, and
            distribute such Content on and through the Service. You retain any
            and all of your rights to any Content you submit, post, or display
            on or through the Service and you are responsible for protecting
            those rights.
          </p>

          <h3 className="font-bold text-lg mb-3">3.3 Anonymity Features</h3>
          <p className="mb-4">
            Secrely provides features that allow users to send and receive
            anonymous messages. While we take steps to maintain anonymity as
            described in our features, we cannot guarantee absolute anonymity.
            Technical limitations, legal requirements, and other factors may
            limit our ability to ensure complete anonymity.
          </p>

          <div className="bg-indigo/5 rounded-xl p-6 my-4 border border-indigo/20">
            <div className="flex items-start">
              <div className="mr-3 text-xl">🔒</div>
              <div>
                <p className="font-medium">In simple terms:</p>
                <p>
                  You own your content, but we can display it through our
                  service. While we try to keep anonymous features truly
                  anonymous, we can't guarantee perfect anonymity in all
                  circumstances.
                </p>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-lg mb-3">3.4 Content Removal</h3>
          <p>
            We reserve the right to remove any Content from the Service at any
            time, for any reason (including, but not limited to, if someone
            claims you don't own the Content or the Content violates these
            Terms), without prior notice.
          </p>
        </>
      ),
    },
    {
      id: "section-4",
      title: "Prohibited Conduct",
      content: (
        <>
          <p className="mb-4">You agree not to use the Service to:</p>

          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Harass, bully, intimidate, or harm any other user</li>
            <li>
              Post or share content that is illegal, fraudulent, defamatory,
              obscene, pornographic, or otherwise objectionable
            </li>
            <li>
              Impersonate any person or entity, or falsely state or misrepresent
              your affiliation with a person or entity
            </li>
            <li>
              Interfere with or disrupt the Service or servers or networks
              connected to the Service
            </li>
            <li>
              Attempt to gain unauthorized access to parts of the Service that
              are restricted
            </li>
            <li>
              Use the Service for any illegal purpose, or in violation of any
              local, state, national, or international law
            </li>
            <li>
              Collect or store personal data about other users without their
              consent
            </li>
            <li>Promote or enable illegal activities</li>
            <li>
              Exploit the Service for commercial purposes without our express
              consent
            </li>
            <li>Distribute malware, spyware, or other harmful code</li>
          </ul>

          <div className="bg-indigo/5 rounded-xl p-6 my-4 border border-indigo/20">
            <div className="flex items-start">
              <div className="mr-3 text-xl">🚫</div>
              <div>
                <p className="font-medium">In simple terms:</p>
                <p>
                  Don't use Secrely to harm others, break the law, or mess with
                  our service. Be respectful and use the platform responsibly.
                </p>
              </div>
            </div>
          </div>

          <p>
            Violation of these prohibitions may result in termination of your
            access to the Service, and you may be reported to law enforcement
            authorities.
          </p>
        </>
      ),
    },
    {
      id: "section-5",
      title: "Account Termination",
      content: (
        <>
          <h3 className="font-bold text-lg mb-3">5.1 Termination by You</h3>
          <p className="mb-4">
            You may delete your account at any time by following the
            instructions in the app or by contacting our support team. Upon
            deletion, your profile and other personal information will be
            removed from view. We may retain certain information as required by
            law or for legitimate business purposes.
          </p>

          <h3 className="font-bold text-lg mb-3">5.2 Termination by Us</h3>
          <p className="mb-4">
            We may terminate or suspend your account immediately, without prior
            notice or liability, for any reason, including without limitation if
            you breach the Terms. Upon termination, your right to use the
            Service will immediately cease.
          </p>

          <div className="bg-indigo/5 rounded-xl p-6 my-4 border border-indigo/20">
            <div className="flex items-start">
              <div className="mr-3 text-xl">🔄</div>
              <div>
                <p className="font-medium">In simple terms:</p>
                <p>
                  You can delete your account anytime. We can also terminate
                  your account if you violate these terms. Either way, some data
                  might be retained as required by law.
                </p>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-lg mb-3">5.3 Effects of Termination</h3>
          <p>
            All provisions of the Terms which by their nature should survive
            termination shall survive termination, including, without
            limitation, ownership provisions, warranty disclaimers, indemnity,
            and limitations of liability.
          </p>
        </>
      ),
    },
    {
      id: "section-6",
      title: "Modifications to Terms",
      content: (
        <>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will try to
            provide at least 30 days' notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our
            sole discretion.
          </p>

          <p className="mb-4">
            By continuing to access or use our Service after those revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, please stop using the Service.
          </p>

          <div className="bg-indigo/5 rounded-xl p-6 my-4 border border-indigo/20">
            <div className="flex items-start">
              <div className="mr-3 text-xl">📝</div>
              <div>
                <p className="font-medium">In simple terms:</p>
                <p>
                  We might update these terms sometimes. If we make big changes,
                  we'll let you know in advance. By continuing to use Secrely
                  after changes, you're agreeing to the new terms.
                </p>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "section-7",
      title: "Disclaimers & Limitations",
      content: (
        <>
          <h3 className="font-bold text-lg mb-3">
            7.1 Disclaimer of Warranties
          </h3>
          <p className="mb-4">
            THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS.
            SECRELY AND ITS AFFILIATES, SUPPLIERS AND PARTNERS EXPRESSLY
            DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED,
            INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT.
          </p>

          <p className="mb-4">
            SECRELY MAKES NO WARRANTY THAT (i) THE SERVICE WILL MEET YOUR
            REQUIREMENTS, (ii) THE SERVICE WILL BE UNINTERRUPTED, TIMELY,
            SECURE, OR ERROR-FREE, OR (iii) THE QUALITY OF ANY PRODUCTS,
            SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY
            YOU THROUGH THE SERVICE WILL MEET YOUR EXPECTATIONS.
          </p>

          <h3 className="font-bold text-lg mb-3">
            7.2 Limitation of Liability
          </h3>
          <p className="mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL
            SECRELY, ITS AFFILIATES, AGENTS, DIRECTORS, EMPLOYEES, SUPPLIERS OR
            LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION
            DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA OR OTHER INTANGIBLE
            LOSSES, THAT RESULT FROM THE USE OF, OR INABILITY TO USE, THIS
            SERVICE.
          </p>

          <p className="mb-4">
            UNDER NO CIRCUMSTANCES WILL SECRELY BE RESPONSIBLE FOR ANY DAMAGE,
            LOSS OR INJURY RESULTING FROM HACKING, TAMPERING OR OTHER
            UNAUTHORIZED ACCESS OR USE OF THE SERVICE OR YOUR ACCOUNT OR THE
            INFORMATION CONTAINED THEREIN.
          </p>

          <div className="bg-indigo/5 rounded-xl p-6 my-4 border border-indigo/20">
            <div className="flex items-start">
              <div className="mr-3 text-xl">⚖️</div>
              <div>
                <p className="font-medium">In simple terms:</p>
                <p>
                  We provide Secrely "as is" without any warranties. We're not
                  responsible for damages that might occur from using our
                  service. This is standard legal language that basically says
                  you use the app at your own risk.
                </p>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-lg mb-3">7.3 Indemnification</h3>
          <p>
            You agree to defend, indemnify and hold harmless Secrely and its
            licensee and licensors, and their employees, contractors, agents,
            officers and directors, from and against any and all claims,
            damages, obligations, losses, liabilities, costs or debt, and
            expenses (including but not limited to attorney's fees), resulting
            from or arising out of (i) your use and access of the Service, or
            (ii) a breach of these Terms.
          </p>
        </>
      ),
    },
    {
      id: "section-8",
      title: "Contact Us",
      content: (
        <>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              Email:
              <a
                href="mailto:legal-secrely@limapp.my.id"
                className="text-indigo hover:underline"
              >
                legal-secrely@limapp.my.id
              </a>
            </li>
            <li>
              Address: Secrely Legal Department, Jl Kasmat Lahay, Gorontalo, Indonesian
            </li>
          </ul>

          <div className="bg-indigo/5 rounded-xl p-6 my-4 border border-indigo/20">
            <div className="flex items-start">
              <div className="mr-3 text-xl">💬</div>
              <div>
                <p className="font-medium">In simple terms:</p>
                <p>
                  Have questions? We're here to help! Reach out to our team
                  using the contact information above.
                </p>
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
                  {/* SVG icon */}
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
                  Terms of Use
                </h1>
                <p className="text-richGray-700 text-lg md:text-xl max-w-2xl mx-auto">
                  By using Secrely, you agree to the following terms.
                </p>
                <p className="text-richGray-700 mt-4">
                  Last Updated: June 15, 2023
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
                      Contents
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

                {/* The "Still have questions?" section can remain static or be added to termsData */}
                <div
                  className="glass-card rounded-3xl p-8 bg-gradient-to-br from-indigo/10 to-softPink/20 scroll-reveal"
                  style={{ transitionDelay: `${termsData.length * 0.1}s` }}
                >
                  <div className="text-center">
                    <h2 className="font-space font-bold text-2xl mb-4">
                      Still have questions?
                    </h2>
                    <p className="text-richGray-700 mb-6">
                      Our team is here to help you understand our terms and
                      policies.
                    </p>
                    <a  href="mailto:support-secrely@limapp.my.id" className="neo-button text-white px-8 py-3 rounded-xl font-bold mx-auto">
                      Contact Support
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
