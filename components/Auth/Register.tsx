"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { useRouter } from "next/navigation";

export default function Register() {
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Mock successful registration and redirect to main feed
		router.push("/explore");
	};

	return (
		<section className="relative min-h-screen bg-white flex items-center justify-center">
			<div className="relative w-full max-w-md mx-auto px-6 py-12 rounded-2xl shadow-lg border border-gray-100">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					<h2 className="text-3xl font-semibold text-gray-950 text-center mb-2">Join Sentinel</h2>
					<p className="text-sm text-gray-400 text-center mb-8">Create your account to ask questions, share images, and connect safely with the community.</p>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
							<input
								type="text"
								id="name"
								className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-gray-950 focus:outline-none text-gray-900 bg-gray-50"
								placeholder="Your Name"
								autoComplete="name"
								required
							/>
						</div>
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
							<input
								type="email"
								id="email"
								className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-gray-950 focus:outline-none text-gray-900 bg-gray-50"
								placeholder="you@example.com"
								autoComplete="email"
								required
							/>
						</div>
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
							<input
								type="password"
								id="password"
								className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-gray-950 focus:outline-none text-gray-900 bg-gray-50"
								placeholder="••••••••"
								autoComplete="new-password"
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
					<div className="mt-6 text-center text-sm text-gray-500">
						Already have an account?{' '}
						<a href="/auth/login" className="text-gray-950 font-medium hover:underline">Login</a>
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400"
				>
					<span>Safe & Moderated</span>
					<span className="hidden sm:inline text-gray-200">|</span>
					<span>Community-Driven</span>
				</motion.div>
			</div>
			<div className="absolute bottom-0 left-0 right-0 h-px bg-gray-100" />
		</section>
	);
}
