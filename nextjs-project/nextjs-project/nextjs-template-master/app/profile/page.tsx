"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = "/auth/login";
    }
  }, []);

  if (!user) return null;

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gray-900 text-white flex items-center justify-center text-xl font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {user.name}
            </h2>
            <p className="text-gray-500 text-sm">
              {user.email}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-gray-600">
          <div className="flex justify-between border-b pb-3">
            <span className="font-medium text-gray-700">User ID</span>
            <span className="truncate max-w-[200px] text-right">
              {user.id}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="font-medium text-gray-700">Account Status</span>
            <span className="text-green-600 font-medium">Active</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Member Since</span>
            <span>Recently Joined</span>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            className="w-full py-3 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

      </div>
    </section>
  );
}