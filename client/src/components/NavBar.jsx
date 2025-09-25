import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <header className="w-full">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 text-white bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">
            Taskify
          </h1>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <SignedOut>
            <SignInButton 
              mode="modal"
              afterSignInUrl="/dashboard"
              afterSignUpUrl="/dashboard"
            >
              <button className="text-neutral-600 dark:text-neutral-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors font-medium px-4 py-2">
                Login
              </button>
            </SignInButton>
            <SignUpButton 
              mode="modal"
              afterSignInUrl="/dashboard"
              afterSignUpUrl="/dashboard"
            >
              <button className="bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-600 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton/>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}