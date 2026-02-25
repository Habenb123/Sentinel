"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center text-center py-32 px-6 bg-white">
      
      <p className="text-sm tracking-wide text-gray-400 uppercase mb-6">
        Moderated Social Media Platform
      </p>

      <h1 className="text-5xl md:text-7xl font-semibold text-gray-950 leading-tight">
        Share. Ask. Connect.
        <br />
        <span className="text-gray-400">
          Safe, Community-Driven Content.
        </span>
      </h1>

      <p className="mt-8 text-lg text-gray-500 max-w-2xl">
        Welcome to a platform where you can ask questions, share knowledge,
        post images, and connect with others. Strict moderation keeps the
        community safe and respectful.
      </p>

      <div className="mt-10 flex gap-4">
        <a
          href="/explore"
          className="px-7 py-3 rounded-xl bg-gray-950 text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          Explore Feed →
        </a>

        {isLoggedIn ? (
          <a
            href="/profile"
            className="px-7 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
          >
            Your Profile
          </a>
        ) : (
          <a
            href="/auth/register"
            className="px-7 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
          >
            Join Now
          </a>
        )}
      </div>
    </section>
  );
}