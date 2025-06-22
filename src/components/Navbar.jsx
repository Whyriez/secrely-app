"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["how-it-works", "testimonials"];
      let currentActiveHash = "";

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight * 0.2 &&
            rect.bottom >= window.innerHeight * 0.2
          ) {
            currentActiveHash = `#${sectionId}`;
            break; 
          }
        }
      }

      if (
        pathname === "/" &&
        currentActiveHash === "" &&
        window.scrollY < 100
      ) {
        setActiveHash("/");
      } else {
        setActiveHash(currentActiveHash);
      }
    };

    if (pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    } else {
      setActiveHash("");
    }

    return () => {
      if (pathname === "/") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [pathname]);

  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === "/" && (activeHash === "" || activeHash === "/");
    }
    if (href.includes("#")) {
      const [baseHref, hash] = href.split("#");
      return pathname === baseHref && activeHash === `#${hash}`;
    }
    return pathname === href;
  };

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
            className={`font-medium hover:text-indigo transition-colors ${
              isActiveLink(item.href)
                ? "text-indigo border-b-2 border-indigo"
                : "" // Contoh style untuk active link
            }`}
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

      <div
        className={`absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 md:hidden transition-all duration-300 ease-in-out origin-top transform ${
          isOpen
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0 pointer-events-none"
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
