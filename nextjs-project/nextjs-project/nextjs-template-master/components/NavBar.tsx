"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

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
          >
            QuoraGram
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className="text-[13px] font-medium text-gray-900 hover:text-gray-700"
            >
              Home
            </a>
            <a
              href="/explore"
              className="text-[13px] font-medium text-gray-900 hover:text-gray-700"
            >
              Explore
            </a>

            {user ? (
              <>
                <span className="text-sm font-medium text-gray-700">
                  Hey, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/auth/login"
                  className="ml-4 px-5 py-2 rounded-xl bg-gray-950 text-white text-sm font-medium hover:bg-gray-800 transition"
                >
                  Login
                </a>
                <a
                  href="/auth/register"
                  className="px-5 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                >
                  Register
                </a>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 text-gray-600"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-8 md:hidden">
          <div className="flex flex-col gap-6">
            <a href="/">Home</a>
            <a href="/explore">Explore</a>

            {user ? (
              <>
                <span className="text-gray-700 font-medium">
                  Hey, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="mt-4 px-5 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/auth/login"
                  className="mt-6 px-5 py-2 rounded-xl bg-gray-950 text-white text-sm font-medium hover:bg-gray-800 transition"
                >
                  Login
                </a>
                <a
                  href="/auth/register"
                  className="px-5 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}