'use client'

import React from 'react'

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 px-6 md:px-12 lg:px-24 relative bg-gradient-to-b from-mistWhite to-indigo/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">
            People love honesty.
            <span className="text-indigo"> Even when it's anonymous.</span>
          </h2>
          <p className="text-richGray-700 max-w-2xl mx-auto">
            See what our users are saying about their Secrely experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div
            className="glass-card rounded-3xl p-6 scroll-reveal"
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo flex items-center justify-center text-white font-bold">
                JK
              </div>
              <div className="ml-3">
                <div className="font-bold">Jamie K.</div>
                <div className="text-sm text-richGray-700">Student</div>
              </div>
            </div>
            <p className="text-richGray-700 mb-4">
              "I was surprised by how many of my classmates actually admired my
              art projects. I never would have known without Secrely!"
            </p>
            <div className="flex">
              <div className="text-yellow-400">★★★★★</div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="glass-card rounded-3xl p-6 scroll-reveal"
            style={{ transitionDelay: '0.4s' }}
          >
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo flex items-center justify-center text-white font-bold">
                MT
              </div>
              <div className="ml-3">
                <div className="font-bold">Morgan T.</div>
                <div className="text-sm text-richGray-700">Content Creator</div>
              </div>
            </div>
            <p className="text-richGray-700 mb-4">
              "As a creator, I get honest feedback about my videos that people
              might be too shy to say publicly. It's helped me improve so
              much!"
            </p>
            <div className="flex">
              <div className="text-yellow-400">★★★★★</div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="glass-card rounded-3xl p-6 scroll-reveal"
            style={{ transitionDelay: '0.6s' }}
          >
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-400 to-indigo flex items-center justify-center text-white font-bold">
                AR
              </div>
              <div className="ml-3">
                <div className="font-bold">Alex R.</div>
                <div className="text-sm text-richGray-700">Teacher</div>
              </div>
            </div>
            <p className="text-richGray-700 mb-4">
              "My students use this to give me anonymous feedback on my lessons.
              It's been eye-opening and helped me become a better teacher."
            </p>
            <div className="flex">
              <div className="text-yellow-400">★★★★★</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
