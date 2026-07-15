"use client";

const steps = [
  {
    number: "01",
    title: "Create & Share",
    description:
      "Post questions, share images, and start conversations in a safe, moderated feed.",
  },
  {
    number: "02",
    title: "Moderation",
    description:
      "Automated and community-driven moderation ensures content stays respectful and safe.",
  },
  {
    number: "03",
    title: "Discover & Engage",
    description:
      "Find trending topics, follow users, and engage with answers and comments.",
  },
  {
    number: "04",
    title: "Grow Community",
    description:
      "Build your network, join groups, and contribute to a positive, knowledge-driven platform.",
  },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
            How It Works
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-950 leading-tight">
            Social Media Workflow
            <br />
            for Safe Knowledge Sharing
          </h2>

          <p className="mt-6 text-lg text-gray-500 leading-relaxed">
            Our workflow ensures safe posting, effective moderation, and community engagement—making knowledge sharing fun and secure.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <span className="text-[80px] font-semibold leading-none text-gray-100 select-none">
                {step.number}
              </span>
              <h3 className="mt-2 text-base font-semibold text-gray-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 right-0 w-px h-16 bg-gray-100" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
