"use client";

import Image from "next/image";
import React from "react";

function MobilePreview() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">
            Experience <span className="text-indigo">Secrely</span> Everywhere
          </h2>
          <p className="text-richGray-700 max-w-2xl mx-auto">
            Our mobile-first design works beautifully on any device.
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
              {/* <div className="w-full h-full rounded-[32px] bg-mistWhite overflow-hidden">
                <div className="h-12 bg-indigo flex items-center justify-center text-white font-bold">
                  Secrely
                </div>
                <div className="p-4">
             
                  <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-richGray-700">
                        Anonymous • 5m ago
                      </span>
                      <div className="h-6 w-6 rounded-full bg-indigo/20 flex items-center justify-center text-xs">
                        💭
                      </div>
                    </div>
                    <p className="text-sm">
                      Your photography skills are amazing! The sunset pic you posted yesterday was breathtaking.
                    </p>
                    <div className="mt-3 flex justify-between">
                      <button className="px-3 py-1 rounded-lg bg-gray-100 text-xs font-medium">
                        Reply
                      </button>
                      <div className="flex space-x-1">
                        <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                          ❤️
                        </button>
                        <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                          🙏
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-richGray-700">
                        Anonymous • 1h ago
                      </span>
                      <div className="h-6 w-6 rounded-full bg-indigo/20 flex items-center justify-center text-xs">
                        💭
                      </div>
                    </div>
                    <p className="text-sm">
                      I've always wanted to ask - where do you get your fashion inspiration from?
                    </p>
                    <div className="mt-3 flex justify-between">
                      <button className="px-3 py-1 rounded-lg bg-gray-100 text-xs font-medium">
                        Reply
                      </button>
                      <div className="flex space-x-1">
                        <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                          👍
                        </button>
                        <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                          😊
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
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
              <Image
                src={"/images/DetailChat.png"}
                fill
                alt="Logo Secrely"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobilePreview;
