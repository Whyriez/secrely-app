"use client";

import React from "react";
import { useTranslations } from "use-intl";

function Testimonials() {
  const t = useTranslations("Testimonials");

  return (
    <section
      id="testimonials"
      className="py-20 px-6 md:px-12 lg:px-24 relative bg-gradient-to-b from-mistWhite to-indigo/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">
            {t("sectionTitlePart1")}{" "}
            <span className="text-indigo"> {t("sectionTitlePart2")}</span>
          </h2>
          <p className="text-richGray-700 max-w-2xl mx-auto">
            {t("sectionDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div
            className="glass-card rounded-3xl p-6 scroll-reveal"
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo flex items-center justify-center text-white font-bold">
                {t("card1.initials")}
              </div>
              <div className="ml-3">
                <div className="font-bold">{t("card1.name")}</div>
                <div className="text-sm text-richGray-700">
                  {t("card1.occupation")}
                </div>
              </div>
            </div>
            <p className="text-richGray-700 mb-4">"{t("card1.quote")}"</p>
            <div className="flex">
              <div className="text-yellow-400">★★★★★</div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="glass-card rounded-3xl p-6 scroll-reveal"
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo flex items-center justify-center text-white font-bold">
                {t("card2.initials")}
              </div>
              <div className="ml-3">
                <div className="font-bold">{t("card2.name")}</div>
                <div className="text-sm text-richGray-700">
                  {t("card2.occupation")}
                </div>
              </div>
            </div>
            <p className="text-richGray-700 mb-4">"{t("card2.quote")}"</p>
            <div className="flex">
              <div className="text-yellow-400">★★★★★</div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="glass-card rounded-3xl p-6 scroll-reveal"
            style={{ transitionDelay: "0.6s" }}
          >
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-400 to-indigo flex items-center justify-center text-white font-bold">
                {t("card3.initials")}
              </div>
              <div className="ml-3">
                <div className="font-bold">{t("card3.name")}</div>
                <div className="text-sm text-richGray-700">
                  {t("card3.occupation")}
                </div>
              </div>
            </div>
            <p className="text-richGray-700 mb-4">"{t("card3.quote")}"</p>
            <div className="flex">
              <div className="text-yellow-400">★★★★★</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
