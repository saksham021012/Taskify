import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import "./index.css";
import LandingPage from "./pages/landingPage";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Protected Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>
            {/* redirect signed out user */}
            <SignedOut>
              <Navigate to="/" />
            </SignedOut>
          </>
        }
      />

      
    </Routes>
  );
}
