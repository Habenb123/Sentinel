"use client";

import {
  Code,
  Server,
  Network,
  GraduationCap,
  ShieldCheck,
  RefreshCcw,
} from "lucide-react";

const services = [
  {
    title: "Post & Share",
    description:
      "Create posts, ask questions, and share images in a vibrant feed.",
    icon: Code,
  },
  {
    title: "Moderation Tools",
    description:
      "Automated and community-driven moderation keeps content safe and respectful.",
    icon: ShieldCheck,
  },
  {
    title: "Privacy Controls",
    description:
      "Manage your privacy, control who sees your posts, and protect your data.",
    icon: GraduationCap,
  },
  {
    title: "Community Discovery",
    description:
      "Find trending topics, follow users, and join interest-based groups.",
    icon: Network,
  },
  {
    title: "Answer & Engage",
    description:
      "Answer questions, comment, and engage with the community in a positive way.",
    icon: Server,
  },
  {
    title: "Safe Environment",
    description:
      "Strict moderation ensures no adult or harmful content is allowed.",
    icon: RefreshCcw,
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-gray-50 py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
            Platform Features
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-950 leading-tight">
            Social Media Tools
            <br />
            for Safe Sharing & Q&A
          </h2>

          <p className="mt-6 text-lg text-gray-500 leading-relaxed">
            Our platform offers posting, moderation, privacy controls, and community discovery—blending Quora and Instagram for a safe, engaging experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 transition-colors duration-200"
              >
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 w-fit mb-5">
                  <Icon
                    size={20}
                    strokeWidth={1.6}
                    className="text-gray-500"
                  />
                </div>

                <h3 className="text-base font-semibold text-gray-950 mb-2">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
