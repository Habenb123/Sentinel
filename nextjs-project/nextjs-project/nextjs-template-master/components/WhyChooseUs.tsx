"use client";

import { ShieldCheck, Workflow, Scale, Users } from "lucide-react";

const differentiators = [
  {
    title: "Safe & Moderated Community",
    description:
      "Our platform is strictly moderated to prevent adult and harmful content, ensuring a safe environment for all ages.",
    icon: ShieldCheck,
  },
  {
    title: "Quora + Instagram Experience",
    description:
      "Enjoy a blend of Q&A and visual sharing. Ask questions, share knowledge, and post images in a vibrant, interactive feed.",
    icon: Workflow,
  },
  {
    title: "Community-Driven Moderation",
    description:
      "Empowered users and trusted moderators keep the platform clean, respectful, and informative.",
    icon: Scale,
  },
  {
    title: "Privacy & Security First",
    description:
      "User privacy and data security are core to our platform, with robust controls and transparent policies.",
    icon: Users,
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
            Why Choose Us
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-950 leading-tight">
            Moderated Social Media
            <br />
            for Knowledge & Sharing
          </h2>

          <p className="mt-6 text-lg text-gray-500 leading-relaxed">
            Our platform combines the best of Quora and Instagram, with strict moderation to keep content safe and community-driven. Share knowledge, ask questions, and post images in a secure, respectful environment.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group p-7 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 p-2.5 rounded-xl bg-white border border-gray-100">
                    <Icon
                      size={22}
                      strokeWidth={1.6}
                      className="text-gray-700"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-gray-950 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
