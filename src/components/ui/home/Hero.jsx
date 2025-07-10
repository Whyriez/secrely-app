"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

function Hero() {
  const t = useTranslations("Hero");
  return (
    <>
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            {/* Kiri */}
            <div className="md:w-1/2 z-10">
              <h1 className="font-space font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                {t("heading")}, <br />
                <span className="text-indigo">{t("heading1")}</span>
              </h1>
              <p
                id="typing-text"
                className="text-xl md:text-2xl text-richGray-700 mb-8 typing-effect"
              >
                {t("subheading")}
              </p>
              <button className="neo-button text-white px-8 py-4 rounded-xl font-bold text-lg">
                {t("buttonCreateLink")}
                <span className="ml-2">→</span>
              </button>
              <div className="mt-8 flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-green-400 flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <span className="ml-2 text-sm">{t("feature1")}</span>
                </div>
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-green-400 flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <span className="ml-2 text-sm">{t("feature2")}</span>
                </div>
              </div>
            </div>

            {/* Kanan */}
            <div className="md:w-1/2 mt-12 md:mt-0 relative">
              <div className="relative z-10">
                {/* Kartu 1 */}
                <div className="glass-card rounded-3xl p-6 shadow-lg max-w-xs mx-auto transform rotate-3 hover:rotate-0 transition-all duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Image
                        src={"/Logo-circular.png"}
                        width={50}
                        height={50}
                        alt="Logo Secrely"
                      />
                      <span className="ml-2 font-bold">Secrely</span>
                    </div>
                    <div className="text-sm text-richGray-700">
                      {t("section1Time")}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                    <p className="text-richGray-700">{t("section1Title")}</p>
                  </div>
                  <div className="flex justify-between">
                    <button className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium hover:bg-gray-200 transition-colors">
                      {t("sectionButton")}
                    </button>
                    <div className="flex space-x-2">
                      <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        ❤️
                      </button>
                      <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        🙏
                      </button>
                    </div>
                  </div>
                </div>

                {/* Kartu 2 */}
                <div className="absolute top-20 -right-4 glass-card rounded-3xl p-6 shadow-lg max-w-xs transform -rotate-6 hover:rotate-0 transition-all duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Image
                        src={"/Logo-circular.png"}
                        width={50}
                        height={50}
                        alt="Logo Secrely"
                      />
                      <span className="ml-2 font-bold">Secrely</span>
                    </div>
                    <div className="text-sm text-richGray-700">
                      {" "}
                      {t("section2Time")}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                    <p className="text-richGray-700">{t("section2Title")}</p>
                  </div>
                  <div className="flex justify-between">
                    <button className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium hover:bg-gray-200 transition-colors">
                      {t("sectionButton")}
                    </button>
                    <div className="flex space-x-2">
                      <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        👍
                      </button>
                      <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        😊
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bubble efek */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="message-bubble absolute top-[10%] left-[20%] h-16 w-16 rounded-full bg-softPink opacity-40" />
                <div
                  className="message-bubble absolute top-[60%] left-[70%] h-12 w-12 rounded-full bg-indigo opacity-30"
                  style={{ animationDelay: "1s" }}
                />
                <div
                  className="message-bubble absolute top-[30%] left-[80%] h-20 w-20 rounded-full bg-purple-300 opacity-20"
                  style={{ animationDelay: "2s" }}
                />
                <div
                  className="message-bubble absolute top-[80%] left-[30%] h-14 w-14 rounded-full bg-blue-300 opacity-30"
                  style={{ animationDelay: "1.5s" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Kedua */}
      <section className="py-20 px-6 md:px-12 lg:px-24 relative bg-gradient-to-b from-mistWhite to-softPink/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">
              {t("experienceTitle1")}{" "}
              <span className="text-indigo">{t("experienceTitle2")}</span>
            </h2>
            <p className="text-richGray-700 max-w-2xl mx-auto">
              {t("experienceDescription")}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Card 1 */}
            <div
              className="glass-card rounded-3xl p-6 max-w-sm w-full scroll-reveal"
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="bg-indigo/10 rounded-xl p-4 mb-6">
                <div className="flex items-center mb-4">
                  <Image
                    src={"/Logo-circular.png"}
                    width={50}
                    height={50}
                    alt="Logo Secrely"
                  />
                  <span className="ml-2 font-bold">{t("card1Title")}</span>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="font-bold mb-2">{t("card1Name")}</h3>
                  <p className="text-sm text-richGray-700 mb-4">
                    {t("card1Description")}
                  </p>
                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-indigo shimmer"></div>
                  </div>
                  <div className="mt-2 text-xs text-right text-richGray-700">
                    {t("card1Progress")}
                  </div>
                </div>
              </div>
              <button className="w-full neo-button text-white py-3 rounded-xl font-bold">
                {t("card1Button")}
              </button>
            </div>

            {/* Card 2 */}
            <div
              className="glass-card rounded-3xl p-6 max-w-sm w-full scroll-reveal"
              style={{ transitionDelay: "0.4s" }}
            >
              <div className="bg-indigo/10 rounded-xl p-4 mb-6">
                <div className="flex items-center mb-4">
                  <Image
                    src={"/Logo-circular.png"}
                    width={50}
                    height={50}
                    alt="Logo Secrely"
                  />
                  <span className="ml-2 font-bold">{t("card2Title")}</span>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center mb-4">
                    <input
                      type="text"
                      value={t("card2InputValue")}
                      readOnly
                      className="bg-gray-50 rounded-l-lg px-4 py-2 w-full text-sm border border-gray-200 focus:outline-none"
                    />
                    <button className="bg-indigo text-white px-4 py-2 rounded-r-lg text-sm font-medium">
                      {t("card2ButtonCopy")}
                    </button>
                  </div>
                  <div className="flex justify-center space-x-4">
                    {/* Icon buttons tetap sama, bisa dipecah ke komponen terpisah jika ingin */}
                    <button className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                      {/* Facebook Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-2c-.442 0-.623.23-.623.659v1.341h3l-.361 3h-2.639v7h-3v-7h-2v-3h2v-2.19c0-2.316 1.134-3.41 3.447-3.41h3.053v3z" />
                      </svg>
                    </button>

                    <button className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600 transition-colors">
                      {/* Instagram Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.204-.012 3.584-.07 4.85-0.148 3.252-1.691 4.771-4.919 4.919-1.266.058-1.645.069-4.849.069-3.204 0-3.584-.012-4.85-.07-3.252-0.148-4.771-1.691-4.919-4.919-0.058-1.265-0.069-1.645-0.069-4.849 0-3.204.012-3.584.07-4.85 0.148-3.252 1.691-4.771 4.919-4.919 1.266-0.057 1.645-0.069 4.849-0.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-0.059 1.281-0.073 1.689-0.073 4.948 0 3.259.014 3.668.072 4.948 0.2 4.358 2.618 6.78 6.98 6.98 1.281 0.058 1.689 0.072 4.948 0.072 3.259 0 3.668-0.014 4.948-0.072 4.354-0.2 6.782-2.618 6.979-6.98 0.059-1.28.073-1.689.073-4.948 0-3.259-0.014-3.667-0.072-4.947-0.196-4.354-2.617-6.78-6.979-6.98-1.281-0.059-1.69-0.073-4.949-0.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </button>

                    <button className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-colors">
                      {/* WhatsApp Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.964 0-6.502 5.27-11.772 11.773-11.772 3.047 0 5.923 1.18 8.056 3.219 2.132 2.038 3.311 4.916 3.311 7.962 0 6.502-5.271 11.772-11.773 11.772-.045 0-.089 0-.134 0l-6.188 1.684zm11.773-23.057c-6.136 0-11.127 4.99-11.127 11.126 0 2.195.642 4.318 1.86 6.096l-1.347 4.908 5.029-1.376c1.688 1.042 3.65 1.605 5.725 1.605 6.136 0 11.127-4.99 11.127-11.126s-4.991-11.126-11.127-11.126zm-4.148 5.159c-.27-.674-.539-.817-.899-.817-.36 0-.779-.136-1.158-.136-.38 0-1.002.146-1.362.684-.36.539-1.35 1.761-1.35 4.298 0 2.536 1.391 3.732 1.591 4.001.2.269 2.628 4.265 6.392 5.795 3.764 1.53 3.764 1.026 4.437.959.674-.069 2.132-.876 2.483-1.724.351-.848.24-1.571-.12-2.195-.36-.624-.899-.959-1.259-1.189-.36-.23-.779-.345-1.158-.12-.38.23-.789.959-1.039 1.229-.249.269-.499.309-.92.08-.42-.23-1.779-.658-2.69-1.657-.911-.999-1.524-2.583-1.693-2.853-.169-.269-.018-.415.1-.644.108-.23.24-.442.36-.674.12-.23.06-.42-.029-.624-.089-.204-.818-1.957-1.127-2.668z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <button className="w-full neo-button text-white py-3 rounded-xl font-bold">
                {t("card2ButtonShare")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
