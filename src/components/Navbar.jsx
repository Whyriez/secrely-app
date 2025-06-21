"use client";
import Link from "next/link";

export const navItems = [
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Privacy", href: "/privacy" },
  { name: "Term Of Use", href: "/term-of-use" },
  { name: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  return (
    <nav className="glass-card fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-xl bg-indigo flex items-center justify-center text-white font-bold text-xl">
          S
        </div>
        <span className="ml-2 font-space font-bold text-xl">Secrely</span>
      </div>
      <div className="hidden md:flex items-center space-x-8">
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
      <button className="neo-button text-white px-5 py-2 rounded-xl font-bold uppercase text-sm tracking-wider">
        Sign Up
      </button>
    </nav>
  );
}
