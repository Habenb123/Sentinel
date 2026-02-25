"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [response, setResponse] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setResponse(data.message);

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="bg-gray-50 py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
            Contact & Support
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-950 leading-tight">
            Join QuoraGram
            <br />
            Ask, Share, Connect!
          </h2>

          <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
            Have questions, feedback, or need help? Reach out to our team.
          </p>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-4 text-left"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gray-950 text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Send Message
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </form>

          {response && (
            <p className="mt-4 text-green-600 font-medium">
              {response}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}