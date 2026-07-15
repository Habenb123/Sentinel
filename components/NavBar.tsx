"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const sections = []; // Removed sections as they are no longer needed

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      // Removed section scroll logic as it is no longer needed
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const current = navRefs.current[active];
    if (current && indicatorRef.current) {
      indicatorRef.current.style.width = `${current.offsetWidth}px`;
      indicatorRef.current.style.left = `${current.offsetLeft}px`;
    }
  }, [active]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  }, []);

  return (
    <>
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
        <div
          className={`flex items-center justify-between rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-white/70 backdrop-blur-2xl shadow-sm border-gray-200/80 py-2.5 px-6"
              : "bg-white/50 backdrop-blur-xl border-gray-200/60 py-3 px-7"
          }`}
        >
          <a
            href="/"
            className="text-sm font-semibold tracking-tight text-gray-900 whitespace-nowrap"
            style={{ textDecoration: 'none' }}
          >
            QuoraGram
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className="text-[13px] font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="/explore"
              className="text-[13px] font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200"
            >
              Explore
            </a>
            <a
              href="/auth/login"
              className="ml-4 px-5 py-2 rounded-xl bg-gray-950 text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Login
            </a>
            <a
              href="/auth/register"
              className="px-5 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Register
            </a>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 text-gray-600"
            aria-label="Toggle menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-8 md:hidden">
          <div className="flex flex-col gap-6">
            <a
              href="/"
              className="text-left text-lg font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="/explore"
              className="text-left text-lg font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200"
            >
              Explore
            </a>
            <a
              href="/auth/login"
              className="mt-6 px-5 py-2 rounded-xl bg-gray-950 text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Login
            </a>
            <a
              href="/auth/register"
              className="px-5 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </>
  );
}
