"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center">
      <div className="relative w-full max-w-md mx-auto px-6 py-12 rounded-2xl shadow-lg border border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold text-gray-950 text-center mb-2">
            Join QuoraGram
          </h2>

          <p className="text-sm text-gray-400 text-center mb-8">
            Create your account to ask questions, share images, and connect safely.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gray-950 text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Register
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-green-600 font-medium">
              {message}
            </p>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-gray-950 font-medium hover:underline"
            >
              Login
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}