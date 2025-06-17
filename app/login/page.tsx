"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      console.error("Login error:", res.error);
      alert("Invalid credentials");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Login
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

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-400">
        Don&apos;t have an account?{" "}
        <a href="/register" className="text-blue-400 hover:underline">
          Register
        </a>
      </p>
    </div>
  );
}

export default LoginPage;
