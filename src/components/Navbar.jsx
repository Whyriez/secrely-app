"use client";
import { useState } from "react";
import Link from "next/link";

export const navItems = [
  { name: "Home", href: "/" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Privacy", href: "/privacy" },
  { name: "Term Of Use", href: "/term-of-use" },
  { name: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass-card fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-xl bg-indigo flex items-center justify-center text-white font-bold text-xl">
          S
        </div>
        <span className="ml-2 font-space font-bold text-xl">Secrely</span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center mx-auto space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="font-medium hover:text-indigo transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Hamburger Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-richGray-800 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Nav with animation */}
      <div
        className={`absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 md:hidden transition-all duration-300 ease-in-out origin-top transform ${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        }`}
        style={{ transformOrigin: "top" }}
      >
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="font-medium hover:text-indigo transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
