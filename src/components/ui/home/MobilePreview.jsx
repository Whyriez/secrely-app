"use client";

import Image from "next/image";
import React from "react";
import { useTranslations } from "use-intl";

function MobilePreview() {
  const t = useTranslations("MobilePreview");
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 relative">
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

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Mobile Card 1 */}
          <div
            className="relative scroll-reveal"
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="w-[280px] h-[560px] rounded-[40px] bg-richGray-800 p-3 shadow-xl">
              <Image src={"/images/MainHome.png"} fill alt="Logo Secrely" />
            </div>
          </div>

          {/* Mobile Card 2 */}
          <div
            className="relative scroll-reveal"
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="w-[280px] h-[560px] rounded-[40px] bg-richGray-800 p-3 shadow-xl">
              <Image
                src={"/images/DetailMessage.png"}
                fill
                alt="Logo Secrely"
              />
            </div>
          </div>
          {/* Mobile Card 3 */}
          <div
            className="relative scroll-reveal"
            style={{ transitionDelay: "0.5s" }}
          >
            <div className="w-[280px] h-[560px] rounded-[40px] bg-richGray-800 p-3 shadow-xl">
              <Image src={"/images/DetailChat.png"} fill alt="Logo Secrely" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobilePreview;
