"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed!");
      }

      console.log(data);
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Register
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter password"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-300">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Re-enter password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-400">
        Already have an account?{" "}
        <a href="/login" className="text-blue-400 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}

export default RegisterPage;
