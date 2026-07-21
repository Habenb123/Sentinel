"use client";

import { ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="bg-gray-50 py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
            Contact & Support
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-950 leading-tight">
            Join Sentinel
            <br />
            Ask, Share, Connect!
          </h2>

          <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
            Have questions, feedback, or need help? Reach out to our team for support or partnership inquiries. We're here to help you share knowledge safely.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/auth/register"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gray-950 text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Join Now
              <ArrowRight size={16} strokeWidth={2} />
            </a>

            <a
              href="mailto:info@sentinel.com"
              className="inline-flex items-center gap-1.5 px-7 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-white transition-colors duration-200"
            >
              info@sentinel.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
