"use client";

import { ShieldCheck, Network, Cloud, ClipboardList } from "lucide-react";

const capabilities = [
  {
    title: "Q&A Knowledge Sharing",
    description:
      "Ask questions, get answers, and share expertise in a moderated, respectful community.",
    icon: ShieldCheck,
  },
  {
    title: "Image & Visual Posts",
    description:
      "Post images and visual content to engage, inspire, and connect with others.",
    icon: Network,
  },
  {
    title: "Strict Moderation",
    description:
      "Automated and community-driven moderation keeps the platform safe and free from adult or harmful content.",
    icon: Cloud,
  },
  {
    title: "Privacy & Security",
    description:
      "Your data and privacy are protected with robust controls and transparent policies.",
    icon: ClipboardList,
  },
];

export default function CoreExpertise() {
  return (
    <section id="core-expertise" className="bg-gray-50 py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
            Platform Features
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-950 leading-tight">
            Social Q&A & Visual Sharing
            <br />
            Moderated for Safety
          </h2>

          <p className="mt-6 text-lg text-gray-500 leading-relaxed">
            Discover, ask, and share in a platform that blends Quora and Instagram, with strict moderation and privacy-first design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex items-start gap-5 p-6 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-colors duration-200"
              >
                <div className="shrink-0 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <Icon
                    size={22}
                    strokeWidth={1.6}
                    className="text-gray-700"
                  />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-950 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
