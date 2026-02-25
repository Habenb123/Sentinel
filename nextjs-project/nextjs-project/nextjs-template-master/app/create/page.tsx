"use client";

import { useState, useEffect } from "react";

export default function CreatePost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
  });

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = "/auth/login";
    }
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`

      },
      body: JSON.stringify({ ...form, user }),
    });

    window.location.href = "/explore";
  };

  if (!user) return null;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg space-y-5"
      >
        <h2 className="text-2xl font-semibold text-gray-900">
          Create a Post
        </h2>

        <input
          name="title"
          placeholder="Post title"
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-xl"
        />

        <textarea
          name="content"
          placeholder="Write something..."
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-xl"
        />

        <input
          name="image"
          placeholder="Image URL (optional)"
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        <button
          type="submit"
          className="w-full bg-gray-950 text-white py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Post
        </button>
      </form>
    </section>
  );
}