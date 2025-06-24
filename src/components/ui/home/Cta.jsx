'use client'

import React from 'react'

function Cta() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 relative bg-gradient-to-b from-indigo/5 to-softPink/20">
      <div className="max-w-3xl mx-auto text-center">
        <div className="scroll-reveal">
          <h2 className="font-space font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            Ready to hear what they think about you?
          </h2>
          <p className="text-richGray-700 text-lg mb-8">
            Join over 1 million users discovering honest thoughts and building
            deeper connections.
          </p>
          <button className="neo-button text-white px-10 py-4 rounded-xl font-bold text-lg mx-auto">
            Start Receiving Messages Now
            <span className="ml-2">→</span>
          </button>

          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {/* Item 1 */}
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo/20 flex items-center justify-center text-indigo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <span className="ml-2 text-sm font-medium">1M+ messages sent</span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo/20 flex items-center justify-center text-indigo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span className="ml-2 text-sm font-medium">99% anonymous</span>
            </div>

            {/* Item 3 */}
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo/20 flex items-center justify-center text-indigo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
              </div>
              <span className="ml-2 text-sm font-medium">24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cta
