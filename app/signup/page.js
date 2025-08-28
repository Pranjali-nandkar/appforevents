"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMessage("❌ " + error.message)
    } else {
      const user = data.user
      // also insert into your custom users table
      if (user) {
        await supabase.from("users").insert([
          { id: user.id, name: email.split("@")[0], email: user.email },
        ])
      }

      setMessage("✅ Signup successful! Check your email to confirm.")
      setTimeout(() => router.push("/login"), 2000)
    }
  }

  return (
    <div className="p-10 max-w-md mx-auto bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">📝 Signup</h1>
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
        onClick={handleSignup}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full"
      >
        Signup
      </button>
      <p className="mt-3 text-gray-700">{message}</p>
    </div>
  )
}
