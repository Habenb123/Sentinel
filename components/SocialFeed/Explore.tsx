"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Sparkles, AlertTriangle, CheckCircle, Trash2, Shield, Send } from "lucide-react";

interface Post {
	user: string;
	username: string;
	time: string;
	title: string;
	body: string;
	image?: string;
}

export default function Explore() {
	const defaultPosts: Post[] = [
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
	];

	// Initialize posts with defaultPosts to match server-side HTML
	const [posts, setPosts] = useState<Post[]>(defaultPosts);

	// Load posts from localStorage safely on mount
	useEffect(() => {
		const saved = localStorage.getItem("explore_posts");
		if (saved) {
			try {
				setPosts(JSON.parse(saved));
			} catch (e) {
				console.error("Failed to parse saved posts", e);
			}
		}
	}, []);

	// Save posts to localStorage whenever they change
	const updatePosts = (newPosts: Post[]) => {
		setPosts(newPosts);
		if (typeof window !== "undefined") {
			localStorage.setItem("explore_posts", JSON.stringify(newPosts));
		}
	};

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

	// Form & state
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	
	// Validation/Moderation States
	const [isModerating, setIsModerating] = useState(false);
	const [moderationResult, setModerationResult] = useState<{
		blocked: boolean;
		reason: string[];
		warning?: string;
	} | null>(null);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const removeImage = () => {
		setImageFile(null);
		setImagePreview(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handlePostSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim() && !body.trim() && !imageFile) return;

		setIsModerating(true);
		setModerationResult(null);

		const formData = new FormData();
		if (title || body) {
			formData.append("text", `${title} ${body}`);
		}
		if (imageFile) {
			formData.append("image", imageFile);
		}

		try {
			const res = await fetch("/api/moderate", {
				method: "POST",
				body: formData,
			});

			if (!res.ok) {
				throw new Error("Moderation request failed");
			}

			const data = await res.json();

			if (data.blocked) {
				setModerationResult({
					blocked: true,
					reason: data.reason || ["Content flagged as inappropriate."],
					warning: data.warning,
				});
			} else {
				// Safe to post! Add to the list
				const newPost: Post = {
					user: "You",
					username: "current_user",
					time: "Just now",
					title: title.trim(),
					body: body.trim(),
					image: imagePreview || undefined,
				};
				updatePosts([newPost, ...posts]);
				
				// Reset form
				setTitle("");
				setBody("");
				removeImage();
				
				// Show a brief success alert
				setModerationResult({
					blocked: false,
					reason: ["Success! Content analyzed and posted safely."],
					warning: data.warning,
				});
				
				// Clear success banner after 3 seconds
				setTimeout(() => {
					setModerationResult(null);
				}, 4000);
			}
		} catch (err) {
			console.error(err);
			setModerationResult({
				blocked: true,
				reason: ["Failed to connect to moderation system."],
			});
		} finally {
			setIsModerating(false);
		}
	};

	return (
		<section className="relative min-h-screen bg-slate-50 flex items-center justify-center">
			<div className="relative w-full max-w-7xl mx-auto px-6 py-24">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					
					{/* Main Feed Column */}
					<div className="lg:col-span-2 space-y-8">
						
						{/* Premium Post Creation Card */}
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							className="rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-100/50 p-6 relative overflow-hidden"
						>
							<div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
							
							<div className="flex items-center gap-2 mb-4">
								<div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
									<Shield size={20} />
								</div>
								<div>
									<h3 className="font-bold text-slate-800 text-sm">AI-Moderated Feed</h3>
									<p className="text-xs text-slate-400">Content scanned automatically by MobileNet and toxicity models</p>
								</div>
							</div>

							<form onSubmit={handlePostSubmit} className="space-y-4">
								<input
									type="text"
									placeholder="Give your post a title..."
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
								/>
								<textarea
									placeholder="Share your thoughts with the community..."
									value={body}
									onChange={(e) => setBody(e.target.value)}
									rows={3}
									className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
								/>

								{/* Image Preview */}
								{imagePreview && (
									<div className="relative rounded-2xl overflow-hidden border border-slate-100 max-h-72">
										<img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
										<button
											type="button"
											onClick={removeImage}
											className="absolute top-3 right-3 p-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-all shadow-md"
										>
											<Trash2 size={16} />
										</button>
									</div>
								)}

								{/* Moderation Status Banner inside Form */}
								<AnimatePresence>
									{moderationResult && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											className={`p-4 rounded-xl border flex gap-3 items-start ${
												moderationResult.blocked
													? "bg-rose-50 border-rose-100 text-rose-800"
													: "bg-emerald-50 border-emerald-100 text-emerald-800"
											}`}
										>
											{moderationResult.blocked ? (
												<AlertTriangle className="flex-shrink-0 mt-0.5" size={20} />
											) : (
												<CheckCircle className="flex-shrink-0 mt-0.5" size={20} />
											)}
											<div className="flex-1 text-sm">
												<span className="font-semibold block">
													{moderationResult.blocked ? "Content Blocked" : "Post Approved"}
												</span>
												<ul className="list-disc list-inside mt-1 space-y-0.5 text-xs opacity-90">
													{moderationResult.reason.map((r, i) => (
														<li key={i}>{r}</li>
													))}
												</ul>
												{moderationResult.warning && (
													<p className="mt-2 text-amber-700 text-xs bg-amber-50 p-2 rounded-lg border border-amber-100 font-mono">
														⚠️ {moderationResult.warning}
													</p>
												)}
											</div>
										</motion.div>
									)}
								</AnimatePresence>

								{/* Bottom Action Bar */}
								<div className="flex items-center justify-between border-t border-slate-50 pt-4">
									<div>
										<input
											type="file"
											accept="image/*"
											onChange={handleImageChange}
											ref={fileInputRef}
											className="hidden"
										/>
										<button
											type="button"
											onClick={() => fileInputRef.current?.click()}
											className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all text-sm font-medium"
										>
											<ImageIcon size={18} />
											Add Photo
										</button>
									</div>

									<button
										type="submit"
										disabled={isModerating}
										className={`flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-md shadow-indigo-200 transition-all text-sm ${
											isModerating ? "opacity-80 cursor-wait" : ""
										}`}
									>
										{isModerating ? (
											<>
												<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
												Checking Safety...
											</>
										) : (
											<>
												<Send size={15} />
												Post Feed
											</>
										)}
									</button>
								</div>
							</form>
						</motion.div>

						{/* Feed List */}
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							className="space-y-6"
						>
							<AnimatePresence>
								{posts.map((post, i) => (
									<motion.div
										key={i}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, scale: 0.95 }}
										transition={{ duration: 0.4 }}
										className="rounded-2xl border border-slate-100 bg-white shadow-md shadow-slate-100/30 p-6 hover:shadow-lg transition-all"
									>
										<div className="flex items-center gap-3 mb-3">
											<div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 border border-slate-100 flex items-center justify-center font-bold text-indigo-600">
												{post.user.charAt(0)}
											</div>
											<div>
												<div className="font-semibold text-slate-800 flex items-center gap-1.5">
													{post.user}
													{post.user === "You" && (
														<span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-full font-bold">Author</span>
													)}
												</div>
												<div className="text-xs text-slate-400">@{post.username} • {post.time}</div>
											</div>
										</div>
										<div className="mb-3 text-slate-800 text-lg font-bold">{post.title}</div>
										{post.image && (
											<div className="rounded-xl overflow-hidden mb-4 max-h-80 border border-slate-100">
												<img
													src={post.image}
													alt={post.title}
													className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
												/>
											</div>
										)}
										<div className="mb-2 text-slate-600 text-sm leading-relaxed">{post.body}</div>
										<div className="flex gap-6 mt-5 text-slate-400 text-xs border-t border-slate-50 pt-3">
											<button className="hover:text-indigo-600 transition-colors font-medium">Like</button>
											<button className="hover:text-indigo-600 transition-colors font-medium">Comment</button>
											<button className="hover:text-indigo-600 transition-colors font-medium">Share</button>
										</div>
									</motion.div>
								))}
							</AnimatePresence>
						</motion.div>
					</div>

					{/* Sidebar Column */}
					<aside className="hidden lg:block space-y-6">
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="rounded-2xl border border-slate-100 bg-white shadow-md shadow-slate-100/30 p-6"
						>
							<div className="flex items-center gap-2 mb-4">
								<Sparkles className="text-purple-500" size={18} />
								<div className="text-lg font-bold text-slate-800">Trending Topics</div>
							</div>
							<ul className="space-y-3">
								{trendingTopics.map((topic, idx) => (
									<li
										key={idx}
										className="text-slate-600 hover:text-indigo-600 cursor-pointer text-sm font-medium transition-colors py-1 hover:pl-1 transition-all duration-200"
									>
										{topic}
									</li>
								))}
							</ul>
						</motion.div>

						<div className="rounded-2xl border border-slate-100 bg-indigo-900 text-white p-6 shadow-xl relative overflow-hidden">
							<div className="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-800 rounded-full blur-2xl opacity-50" />
							<h4 className="font-bold mb-2">How to test moderation?</h4>
							<p className="text-xs text-indigo-200 leading-relaxed mb-4">
								To trigger text safety blocks, try posting words like <code className="bg-indigo-950/40 px-1 py-0.5 rounded font-mono">toxic</code>, <code className="bg-indigo-950/40 px-1 py-0.5 rounded font-mono">hate</code> or <code className="bg-indigo-950/40 px-1 py-0.5 rounded font-mono">nsfw</code>.
							</p>
							<p className="text-[10px] text-indigo-300">
								Start your Python server with: <br />
								<code className="bg-indigo-950/60 px-1 py-0.5 rounded font-mono block mt-1">python moderate_server.py</code>
							</p>
						</div>
					</aside>
				</div>
			</div>
		</section>
	);
}
