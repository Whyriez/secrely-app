"use client";

import Image from "next/image";

function Hero() {
  return (
    <>
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            {/* Kiri */}
            <div className="md:w-1/2 z-10">
              <h1 className="font-space font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                Say Everything, <br />
                <span className="text-indigo">Stay Anonymous</span>
              </h1>
              <p
                id="typing-text"
                className="text-xl md:text-2xl text-richGray-700 mb-8 typing-effect"
              >
                Confessions, compliments, secrets... all in one link.
              </p>
              <button className="neo-button text-white px-8 py-4 rounded-xl font-bold text-lg">
                Create Your Anonymous Link
                <span className="ml-2">→</span>
              </button>
              <div className="mt-8 flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-green-400 flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <span className="ml-2 text-sm">No sign-up required</span>
                </div>
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-green-400 flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <span className="ml-2 text-sm">100% anonymous</span>
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
                    <div className="text-sm text-richGray-700">2m ago</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                    <p className="text-richGray-700">
                      I've always admired your creativity and how you're not
                      afraid to be yourself. You inspire me more than you know!
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <button className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium hover:bg-gray-200 transition-colors">
                      Reply
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
                    <div className="text-sm text-richGray-700">5m ago</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                    <p className="text-richGray-700">
                      Your presentation yesterday was amazing! You seemed so
                      confident. Any tips?
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <button className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium hover:bg-gray-200 transition-colors">
                      Reply
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
              Experience the <span className="text-indigo">Magic</span>
            </h2>
            <p className="text-richGray-700 max-w-2xl mx-auto">
              See how Secrely transforms anonymous messaging into meaningful
              connections.
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
                         alt="Logo Secrely" />
                  <span className="ml-2 font-bold">Your Secrely Profile</span>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="font-bold mb-2">Alex Johnson</h3>
                  <p className="text-sm text-richGray-700 mb-4">
                    Send me anonymous messages! I promise to reply to the
                    interesting ones 😊
                  </p>
                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-indigo shimmer"></div>
                  </div>
                  <div className="mt-2 text-xs text-right text-richGray-700">
                    75% complete
                  </div>
                </div>
              </div>
              <button className="w-full neo-button text-white py-3 rounded-xl font-bold">
                Customize Your Profile
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
                        alt="Logo Secrely" />
                  <span className="ml-2 font-bold">Share Your Link</span>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center mb-4">
                    <input
                      type="text"
                      value="secrely.app/alex_j"
                      readOnly
                      className="bg-gray-50 rounded-l-lg px-4 py-2 w-full text-sm border border-gray-200 focus:outline-none"
                    />
                    <button className="bg-indigo text-white px-4 py-2 rounded-r-lg text-sm font-medium">
                      Copy
                    </button>
                  </div>
                  <div className="flex justify-center space-x-4">
                    {/* Icon buttons tetap sama, bisa dipecah ke komponen terpisah jika ingin */}
                    <button className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                      {/* Facebook Icon */}
                    </button>
                    <button className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600 transition-colors">
                      {/* Instagram Icon */}
                    </button>
                    <button className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-colors">
                      {/* WhatsApp Icon */}
                    </button>
                  </div>
                </div>
              </div>
              <button className="w-full neo-button text-white py-3 rounded-xl font-bold">
                Share Your Link
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
