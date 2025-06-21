"use client";

import Hero from "../../components/ui/home/Hero.jsx";
import HowItWork from "../../components/ui/home/HowItWork.jsx";
import Testimonials from "../../components/ui/home/Testimonials.jsx";
import MobilePreview from "../../components/ui/home/MobilePreview.jsx";
import Cta from "../../components/ui/home/Cta.jsx";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Typing effect
    const typingText = document.getElementById("typing-text");
    if (typingText) {
      const text = typingText.textContent;
      typingText.textContent = "";
      let i = 0;
      function typeWriter() {
        if (i < text.length) {
          typingText.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        }
      }
      setTimeout(typeWriter, 1000);
    }

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

  return (
    <div className="font-inter text-richGray-800 overflow-x-hidden mt-20">
      <div className="page-wrapper overflow-hidden min-h-screen">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="gradient-blob blob-top-right w-[500px] h-[500px] top-[-100px] right-[-100px]"></div>
          <div className="gradient-blob blob-left-center w-[600px] h-[600px] bottom-[20%] left-[-200px]"></div>
          <div className="gradient-blob blob-bottom-right w-[200px] h-[200px] bottom-[15%] right-[20%]"></div>
        </div>

        <main>
          <Hero />
          <HowItWork />
          <Testimonials />
          <MobilePreview />
          <Cta />
        </main>
      </div>
    </div>
  );
}
