
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Explore() {
	

  // 🔥 Real posts from backend
const [realPosts, setRealPosts] = useState<any[]>([]);

  useEffect(() => {
  fetch("http://localhost:5000/api/posts")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setRealPosts(data);
      } else {
        setRealPosts([]);
      }
    })
    .catch((err) => {
      console.error("Error fetching posts:", err);
      setRealPosts([]);
    });
}, []);

  // 🧠 Dummy posts (your original ones)
  const dummyPosts = [
    {
      user: "Alice Johnson",
      username: "alicej",
      time: "1h ago",
      title: "How do you stay motivated for daily exercise?",
      body: "I started a morning routine and it really helps! What tips do you have for keeping up healthy habits?",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
    },
    {
      user: "Ben Lee",
      username: "benlee",
      time: "3h ago",
      title: "Share your favorite healthy recipe!",
      body: "I love making avocado toast with whole grain bread. Anyone have a go-to smoothie recipe?",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    },
    {
      user: "Priya Singh",
      username: "priyasingh",
      time: "5h ago",
      title: "What book changed your perspective?",
      body: "Recently finished 'Atomic Habits' and it was eye-opening. Would love to hear your recommendations!",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80",
    },
    {
      user: "David Kim",
      username: "davidkim",
      time: "7h ago",
      title: "Tips for balancing work and life?",
      body: "How do you manage stress and keep a positive mindset?",
      image: "https://plus.unsplash.com/premium_photo-1677160318709-0e97918579df?fm=jpg&q=60&w=3000&auto=format&fit=crop",
    },
  ];

  // 🔥 Merge real + dummy posts
  const allPosts = [
    ...realPosts.map((post) => ({
      user: post.user?.name || "User",
      username: post.user?.name?.toLowerCase() || "user",
      time: new Date(post.createdAt).toLocaleDateString(),
      title: post.title,
      body: post.content,
      image: post.image,
    })),
    ...dummyPosts,
  ];

  const trendingTopics = [
    "#HealthyLiving",
    "#BookRecommendations",
    "#FitnessJourney",
    "#MentalHealth",
    "#PositiveVibes",
    "#CookingTips",
    "#WorkLifeBalance",
    "#CommunitySupport",
  ];

  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center">
      <div className="relative w-full max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Feed */}
          <div className="md:col-span-2">

			{/* Create Button */}
			<div className="flex justify-end mb-6">
  				<a
					href="/create"
					className="px-5 py-2 rounded-xl bg-gray-950 text-white text-sm font-medium hover:bg-gray-800 transition"
				>
					+ Create Post
				</a>
				</div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-8"
            >
              {allPosts.map((post, i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <div>
                      <div className="font-semibold text-gray-950">{post.user}</div>
                      <div className="text-xs text-gray-400">
                        @{post.username} • {post.time}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 text-gray-900 text-lg font-medium">
                    {post.title}
                  </div>

                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="rounded-xl w-full max-h-64 object-cover mb-4"
                    />
                  )}

                  <div className="mb-2 text-gray-500">
                    {post.body}
                  </div>

                  <div className="flex gap-6 mt-4 text-gray-400 text-sm">
				<button
				onClick={async () => {
					const token = localStorage.getItem("token");

					if (!token) {
					alert("Please login to like posts");
					return;
					}

					await fetch(`http://localhost:5000/api/posts/${realPosts[i]?._id}/like`, {
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
					},
					});

					window.location.reload();
				}}
				className="hover:text-red-500 transition"
				>
				❤️ {realPosts[i]?.likes?.length || 0}
				</button>
				</div>
                    {/* 💬 COMMENT SECTION BELOW */}
<div className="mt-4">
  <input
    type="text"
    placeholder="Write a comment..."
    className="border p-2 rounded w-full text-sm"
    onKeyDown={async (e) => {
      if (e.key === "Enter") {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Login to comment");
          return;
        }

        const text = (e.target as HTMLInputElement).value;

        await fetch(
          `http://localhost:5000/api/posts/${realPosts[i]._id}/comment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ text }),
          }
        );

        window.location.reload();
      }
    }}
  />

  <div className="mt-3 space-y-2 text-sm text-gray-600">
    {realPosts[i]?.comments?.map((comment: any, idx: number) => (
      <div key={idx}>
        <strong>{comment.name}:</strong> {comment.text}
      </div>
    ))}
  </div>
</div>
                    <span>Share</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Sidebar */}
          <aside className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6"
            >
              <div className="text-lg font-semibold text-gray-950 mb-4">
                Trending Topics
              </div>
              <ul className="space-y-3">
                {trendingTopics.map((topic, idx) => (
                  <li key={idx} className="text-gray-700 hover:text-gray-950 cursor-pointer">
                    {topic}
                  </li>
                ))}
              </ul>
            </motion.div>
          </aside>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-100" />
    </section>
  );
}