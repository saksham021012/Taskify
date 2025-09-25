import React from "react";
import Navbar from "../components/NavBar";
import {
  SignedIn,
  SignedOut,
  SignUpButton,
} from "@clerk/clerk-react";

export default function LandingPage() {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 font-sans text-neutral-900 dark:text-neutral-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center text-center">
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-5xl md:text-7xl font-extrabold text-neutral-900 dark:text-white leading-tight tracking-tighter">
            Organize Your Life.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              Achieve More.
            </span>
          </h1>
          <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Taskify helps you focus on what's important. Streamline your
            workflow and accomplish your goals with ease.
          </p>
          <div className="mt-12">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 inline-block shadow-lg hover:shadow-xl">
                  Get Started For Free
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <a
                href="/dashboard"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 inline-block shadow-lg hover:shadow-xl"
              >
                Go to Dashboard
              </a>
            </SignedIn>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8">
        <div className="container mx-auto px-6 text-center text-neutral-500 dark:text-neutral-400">
          <div className="flex justify-center gap-6 mb-4">
            <a
              href="#"
              className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            >
              Terms of Service
            </a>
          </div>
          <p>© 2025 Taskify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
