"use client";

import { useTranslations } from "use-intl";

function HowItWork() {
  const t = useTranslations("HowItWork");
  return (
    <section
      id="how-it-works"
      className="py-20 px-6 md:px-12 lg:px-24 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">
            {t("titlePart1")} <span className="text-indigo">Secrely</span>{" "}
            {t("titlePart2")}
          </h2>
          <p className="text-richGray-700 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div
            className="glass-card rounded-3xl p-8 text-center scroll-reveal"
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="h-16 w-16 rounded-full bg-indigo/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl emoji-float">🔗</span>
            </div>
            <h3 className="font-space font-bold text-xl mb-3">
              {t("step1Title")}
            </h3>
            <p className="text-richGray-700">{t("step1Description")}</p>
          </div>

          {/* Step 2 */}
          <div
            className="glass-card rounded-3xl p-8 text-center scroll-reveal"
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="h-16 w-16 rounded-full bg-indigo/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl emoji-float">💌</span>
            </div>
            <h3 className="font-space font-bold text-xl mb-3">
              {t("step2Title")}
            </h3>
            <p className="text-richGray-700">{t("step2Description")}</p>
          </div>

          {/* Step 3 */}
          <div
            className="glass-card rounded-3xl p-8 text-center scroll-reveal"
            style={{ transitionDelay: "0.6s" }}
          >
            <div className="h-16 w-16 rounded-full bg-indigo/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl emoji-float">💬</span>
            </div>
            <h3 className="font-space font-bold text-xl mb-3">
              {t("step3Title")}
            </h3>
            <p className="text-richGray-700">{t("step3Description")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWork;
