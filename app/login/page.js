"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setMessage("❌ " + error.message)
    } else {
      setMessage("✅ Logged in successfully!")
      setTimeout(() => router.push("/dashboard"), 1500)
    }
  }

  return (
    <div className="p-10 max-w-md mx-auto bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">🔐 Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-3 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-3 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
      >
        Login
      </button>
      <p className="mt-3 text-gray-700">{message}</p>
    </div>
  )
}
