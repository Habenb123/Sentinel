"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-white flex items-center"
    >
      <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-28 w-full">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-sm font-medium text-gray-400 tracking-wide uppercase mb-6">
              Moderated Social Media Platform
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] text-gray-950">
              Share. Ask. Connect.
              <br />
              <span className="text-gray-400">
                Safe, Community-Driven Content.
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Welcome to a platform where you can ask questions, share knowledge, post images, and connect with others. Strict moderation keeps the community safe and respectful.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/explore"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gray-950 text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                Explore Feed
                <ArrowRight size={16} strokeWidth={2} />
              </a>

              <a
                href="/auth/register"
                className="inline-flex items-center gap-1.5 px-7 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Join Now
              </a>
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-gray-400"
          >
            <span>Strict Moderation</span>
            <span className="hidden sm:inline text-gray-200">|</span>
            <span>Community-Driven</span>
            <span className="hidden sm:inline text-gray-200">|</span>
            <span>No Adult Content</span>
          </motion.div>

          {/* Metrics strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            <div className="text-center">
              <p className="text-3xl font-semibold text-gray-950">0</p>
              <p className="mt-1 text-xs text-gray-400">Adult Content</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="text-3xl font-semibold text-gray-950">100%</p>
              <p className="mt-1 text-xs text-gray-400">Community Moderation</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-gray-950">∞</p>
              <p className="mt-1 text-xs text-gray-400">Knowledge Shared</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-100" />
    </section>
  );
}
