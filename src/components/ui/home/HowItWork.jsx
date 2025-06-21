'use client'

function HowItWork() {
  return (
    <section id="how-it-works" className="py-20 px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="font-space font-bold text-3xl md:text-4xl mb-4">
            How <span className="text-indigo">Secrely</span> Works
          </h2>
          <p className="text-richGray-700 max-w-2xl mx-auto">
            Three simple steps to start receiving anonymous messages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div
            className="glass-card rounded-3xl p-8 text-center scroll-reveal"
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="h-16 w-16 rounded-full bg-indigo/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl emoji-float">🔗</span>
            </div>
            <h3 className="font-space font-bold text-xl mb-3">Share Your Link</h3>
            <p className="text-richGray-700">
              Create your unique Secrely link and share it on your social
              profiles or with friends.
            </p>
          </div>

          {/* Step 2 */}
          <div
            className="glass-card rounded-3xl p-8 text-center scroll-reveal"
            style={{ transitionDelay: '0.4s' }}
          >
            <div className="h-16 w-16 rounded-full bg-indigo/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl emoji-float">💌</span>
            </div>
            <h3 className="font-space font-bold text-xl mb-3">Receive Messages</h3>
            <p className="text-richGray-700">
              Get honest, anonymous messages from friends, followers, or
              anyone with your link.
            </p>
          </div>

          {/* Step 3 */}
          <div
            className="glass-card rounded-3xl p-8 text-center scroll-reveal"
            style={{ transitionDelay: '0.6s' }}
          >
            <div className="h-16 w-16 rounded-full bg-indigo/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl emoji-float">💬</span>
            </div>
            <h3 className="font-space font-bold text-xl mb-3">Reply Anonymously</h3>
            <p className="text-richGray-700">
              Choose to reply to messages while keeping both sides anonymous
              and safe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWork;
