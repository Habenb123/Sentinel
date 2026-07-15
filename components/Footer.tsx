"use client";

import { Linkedin, Mail, Phone, MapPin, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 pb-14 border-b border-gray-800/60">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-white text-base font-semibold mb-4">
              QuoraGram
            </h3>
            <p className="text-sm leading-relaxed text-gray-500">
              A safe, moderated social media platform for knowledge sharing and visual posts. No adult content, just community-driven engagement.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                aria-label="LinkedIn"
                className="p-2 rounded-xl border border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-700 transition-colors duration-200"
              >
                <Linkedin size={16} strokeWidth={1.6} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 rounded-xl border border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-700 transition-colors duration-200"
              >
                <Instagram size={16} strokeWidth={1.6} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="p-2 rounded-xl border border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-700 transition-colors duration-200"
              >
                <Youtube size={16} strokeWidth={1.6} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li>Q&A Posting</li>
              <li>Image Sharing</li>
              <li>Community Moderation</li>
              <li>Privacy Controls</li>
              <li>Trending Topics</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li>About</li>
              <li>How It Works</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} strokeWidth={1.6} className="mt-0.5 shrink-0" />
                Chennai, India
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} strokeWidth={1.6} className="shrink-0" />
                +91 76039 99796
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} strokeWidth={1.6} className="shrink-0" />
                info@quoragram.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© {new Date().getFullYear()} QuoraGram. All rights reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="hover:text-gray-400 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
