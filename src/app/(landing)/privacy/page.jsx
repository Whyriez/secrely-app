"use client";

import React, { useEffect } from "react";

function Privacy() {
  useEffect(() => {
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

    const headers = document.querySelectorAll(".accordion-header");
    headers.forEach((header) => {
      header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector(".accordion-icon");

        const isOpen = content.classList.contains("active");

        // Tutup semua
        document.querySelectorAll(".accordion-content").forEach((c) => {
          c.classList.remove("active");
          c.style.maxHeight = null;
        });
        document
          .querySelectorAll(".accordion-icon")
          .forEach((i) => i.classList.remove("active"));

        // Buka jika sebelumnya belum terbuka
        if (!isOpen) {
          content.classList.add("active");
          icon.classList.add("active");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });

    // Default buka pertama
    const firstAccordion = document.querySelector(".accordion-content");
    const firstIcon = document.querySelector(".accordion-icon");
    if (firstAccordion && firstIcon) {
      firstAccordion.classList.add("active");
      firstIcon.classList.add("active");
      firstAccordion.style.maxHeight = firstAccordion.scrollHeight + "px";
    }

    // Parallax effect
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

  const accordionData = [
    {
      title: "What Data We Collect",
      iconPath:
        "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      content: (
        <>
          <p className="mb-4">
            To provide you with the best experience on Secrely, we collect
            certain information. Here's what we collect:
          </p>

          <div className="pl-4 mb-4">
            <h3 className="font-bold mb-2">Account Information</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Username or display name (which can be anonymous)</li>
              <li>Email address (for account recovery and notifications)</li>
              <li>Password (stored as a hashed value by Supabase)</li>
            </ul>
          </div>

          <div className="pl-4 mb-4">
            <h3 className="font-bold mb-2">Message Content</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>The content of messages you send and receive</li>
              <li>Timestamps of when messages are sent</li>
              <li>Read receipts</li>
            </ul>
          </div>

          <div className="pl-4 mb-4">
            <h3 className="font-bold mb-2">Device Information</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Device fingerprint (for spam detection and user blocking)</li>
              <li>Operating system</li>
              <li>App version</li>
            </ul>
          </div>

          <div className="pl-4">
            <h3 className="font-bold mb-2">Usage Information</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>How you interact with the app (features used, time spent)</li>
              <li>Error reports</li>
              <li>Performance analytics</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      title: "How Your Data Is Used",
      iconPath:
        "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
      content: (
        <>
          <p className="mb-4">We use your data for the following purposes:</p>

          <div className="pl-4 mb-4">
            <h3 className="font-bold mb-2">To Provide Our Service</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Delivering messages between users</li>
              <li>Maintaining your account and preferences</li>
              <li>Enabling the anonymous messaging features</li>
              <li>Providing customer support</li>
            </ul>
          </div>

          <div className="pl-4 mb-4">
            <h3 className="font-bold mb-2">To Improve Our Service</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Analyzing how users interact with features</li>
              <li>Identifying and fixing bugs</li>
              <li>Developing new features based on user behavior</li>
              <li>Optimizing app performance</li>
            </ul>
          </div>

          <div className="pl-4 mb-4">
            <h3 className="font-bold mb-2">To Keep You Safe</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Detecting and preventing abuse or violations of our terms</li>
              <li>Identifying and addressing security threats</li>
              <li>Complying with legal obligations</li>
            </ul>
          </div>

          <div className="pl-4">
            <h3 className="font-bold mb-2">To Communicate With You</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Sending important updates about the service</li>
              <li>Notifying you about new features (if you opt in)</li>
              <li>Responding to your inquiries</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      title: "Third-Party Services",
      iconPath:
        "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
      content: (
        <>
          <p className="mb-4">
            We partner with trusted third parties to help provide and improve
            our service. Here are the types of third parties we work with:
          </p>

          <div className="pl-4 mb-4">
            <h3 className="font-bold mb-2">Cloud Infrastructure</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Supabase:</span> For secure data
                storage and authentication
              </li>
              <li>
                <span className="font-medium">Vercel:</span> For server hosting
                and content delivery
              </li>
              <li>
                <span className="font-medium">Cloudflare:</span> For web
                performance, security, and to facilitate secure WebSocket
                connections, enhancing the stability and speed of our real-time
                features.
              </li>
            </ul>
          </div>

          <div className="pl-4 mb-4">
            <h3 className="font-bold mb-2">Analytics</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Vercel Analytics:</span> To
                monitor website performance, traffic patterns, and overall
                application health.
              </li>
              <li>
                <span className="font-medium">Cloudflare Analytics:</span> For
                insights into network traffic, security threats, and content
                delivery performance.
              </li>
              <li>
                <span className="font-medium">Supabase Logs & Metrics:</span> To
                track database performance, API usage, and identify potential
                issues within our backend services.
              </li>
            </ul>
          </div>

          <div className="pl-4 mb-4">
            <h3 className="font-bold mb-2">Media & Content Embedding</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Spotify:</span> To provide
                embedded music content. When you interact with or view embedded
                Spotify players on our site, Spotify may collect data according
                to their privacy policy.
                <a
                  href="https://www.spotify.com/us/legal/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo hover:underline"
                >
                  {" "}
                  (See Spotify's Privacy Policy)
                </a>
              </li>
            </ul>
          </div>
          {/* <div className="pl-4 mb-4">
            <h3 className="font-bold mb-2">Customer Support</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Zendesk:</span> For managing
                support tickets and inquiries
              </li>
              <li>
                <span className="font-medium">Intercom:</span> For in-app
                messaging and support
              </li>
            </ul>
          </div>

          <div className="pl-4">
            <h3 className="font-bold mb-2">Security</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">reCAPTCHA:</span> To prevent spam
                and abuse
              </li>
              <li>
                <span className="font-medium">Auth0:</span> For secure
                authentication services
              </li>
            </ul>
          </div> */}

          <p className="mt-4">
            All third parties we work with are bound by strict data protection
            agreements and are carefully selected to ensure they maintain high
            privacy standards.
          </p>
        </>
      ),
    },
    {
      title: "Your Rights & Control Options",
      iconPath:
        "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      content: (
        <>
          <p className="mb-4">
            At Secrely, we believe you should have control over your data. Here
            are the rights and options available to you:
          </p>

          {/* <div className="pl-4 mb-4">
            <h3 className="font-bold mb-2">Access Your Data</h3>
            <p className="mb-2">
              You can request a copy of all the personal data we have about you.
              To do this:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Go to Settings &gt; Privacy &gt; Download My Data</li>
              <li>
                We'll provide your data in a machine-readable format within 30
                days
              </li>
            </ul>
          </div> */}

          <div className="pl-4 mb-4">
            <h3 className="font-bold mb-2">Delete Your Data</h3>
            <p className="mb-2">
              You can delete your account and associated data at any time:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Go to Settings &gt; Others &gt; Delete Account</li>
              <li>Confirm your choice (this action cannot be undone)</li>
              <li>We'll permanently delete your data within 30 days</li>
            </ul>
          </div>

          <div className="pl-4 mb-4">
            <h3 className="font-bold mb-2">Control Your Privacy Settings</h3>
            <p className="mb-2">
              Customize who can contact you and manage your preferences for a
              safer experience:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Go to Settings &gt; Privacy to adjust who can send you messages.
              </li>
              <li>
                In Settings &gt; Privacy, you can also manage your{" "}
                <span className="font-medium">Blocked Users list</span> (which
                shows users you have blocked from specific chat details).
              </li>
              <li>
                Manage your{" "}
                <span className="font-medium">Hidden Words list</span> in
                Settings &gt; Privacy, allowing you to add or remove words that
                you wish to hide from your messages.
              </li>
              <li>
                Go to Settings &gt; Preference to manage notification
                preferences.
              </li>
            </ul>
          </div>

          {/* <div className="pl-4 mb-4">
            <h3 className="font-bold mb-2">Opt Out of Analytics</h3>
            <p className="mb-2">You can choose not to share usage data:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Go to Settings &gt; Privacy &gt; Analytics</li>
              <li>Toggle off "Share Usage Data"</li>
            </ul>
          </div> */}

          <div className="pl-4">
            <h3 className="font-bold mb-2">Additional Rights</h3>
            <p className="mb-2">
              Depending on your location, you may have additional rights under
              local laws (such as GDPR or CCPA):
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Right to correction of inaccurate data</li>
              <li>Right to restriction of processing</li>
              <li>Right to object to processing</li>
              <li>Right to data portability</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      title: "Child Safety & CSAE Protection Policy",
      iconPath:
        "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      content: (
        <>
          <p className="mb-4">
            At Secrely, we have zero tolerance for child sexual abuse and
            exploitation (CSAE). We are committed to protecting children and
            young users on our platform through the following actions:
          </p>

          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <span className="font-medium">Content Moderation:</span> We use a
              combination of automated tools and manual review to detect and
              remove any content that may involve or promote child exploitation.
            </li>
            <li>
              <span className="font-medium">Reporting Tools:</span> Users can
              report messages or accounts suspected of abuse, which are reviewed
              promptly.
            </li>
            <li>
              <span className="font-medium">Immediate Action:</span> Accounts
              found violating our child safety policies are immediately
              suspended and investigated.
            </li>
            <li>
              <span className="font-medium">Law Enforcement Cooperation:</span>{" "}
              We fully cooperate with law enforcement and relevant child
              protection authorities where appropriate.
            </li>
            <li>
              <span className="font-medium">User Controls:</span> We provide
              features such as message filters, block/report tools, and privacy
              settings to help users protect themselves.
            </li>
          </ul>

          <p>
            If you encounter suspicious or harmful behavior, please report it
            immediately to{" "}
            <a
              href="mailto:abuse-secrely@limapp.my.id"
              className="text-indigo hover:underline"
            >
              abuse-secrely@limapp.my.id
            </a>
          </p>
        </>
      ),
    },
  ];
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
                  Your Privacy Matters
                </h1>
                <p className="text-richGray-700 text-lg md:text-xl max-w-2xl mx-auto">
                  We take your data seriously. Here's how we protect it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16 px-6 md:px-12 lg:px-24 relative">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-8 scroll-reveal">
              <h2 className="font-space font-bold text-2xl mb-6 text-center">
                What You Need to Know
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
                    End-to-End Private
                  </h3>
                  <p className="text-richGray-700">
                    Your messages are encrypted and private between you and your
                    recipients.
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
                    No Data Selling
                  </h3>
                  <p className="text-richGray-700">
                    We never sell your personal data to third parties. Ever.
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
                    You're In Control
                  </h3>
                  <p className="text-richGray-700">
                    You control your visibility and can delete your data at any
                    time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 px-6 md:px-12 lg:px-24 relative">
          <div className="max-w-4xl mx-auto">
            {accordionData.map((item, index) => (
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
                          d={item.iconPath}
                        />
                      </svg>
                    </div>
                    <h2 className="font-space font-bold text-xl md:text-2xl">
                      {item.title}
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
                  {item.content}
                </div>
              </div>
            ))}

            <div
              className="glass-card rounded-3xl p-8 scroll-reveal"
              style={{ transitionDelay: `${accordionData.length * 0.1}s` }}
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
                    Contact for Privacy Inquiries
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
                <p className="mb-4">
                  If you have any questions, concerns, or requests regarding
                  your privacy or this policy, we're here to help:
                </p>

                <div className="pl-4 mb-6">
                  <h3 className="font-bold mb-2">Contact Our Privacy Team</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Email:
                      <a
                        href="mailto:privacy-secrely@limapp.my.id"
                        className="text-indigo hover:underline"
                      >
                        privacy-secrely@limapp.my.id
                      </a>
                    </li>
                    <li>Response time: Within 2 business days</li>
                  </ul>
                </div>

                <div className="pl-4 mb-6">
                  <h3 className="font-bold mb-2">Data Protection Officer</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Name: Alim Suma</li>
                    <li>
                      Email:
                      <a
                        href="mailto:dpo-secrely@limapp.my.id"
                        className="text-indigo hover:underline"
                      >
                        dpo-secrely@limapp.my.id
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="pl-4 mb-6">
                  <h3 className="font-bold mb-2">Mailing Address</h3>
                  <address className="not-italic pl-5">
                    Secrely Privacy Team
                    <br />
                    Jl Kasmat Lahay
                    <br />
                    Gorontalo
                    <br />
                    Indonesian
                  </address>
                </div>

                <div className="bg-indigo/5 rounded-xl p-6 border border-indigo/20">
                  <h3 className="font-bold mb-2">Policy Updates</h3>
                  <p>
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the "Last Updated" date. For
                    significant changes, we will provide a more prominent notice
                    or email notification.
                  </p>
                  <p className="mt-2">
                    <strong>Last Updated:</strong> June 20, 2025
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
