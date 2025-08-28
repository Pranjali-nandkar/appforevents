"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function RSVP() {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true })
      if (!error) setEvents(data)
    }
    fetchEvents()
  }, [])

  const handleRSVP = async () => {
    if (!name || !email || !selectedEvent || !status) {
      setMessage("⚠️ Please fill all fields")
      return
    }

    // check if user exists
    let { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single()

    let userId
    if (!existingUser) {
      const { data: newUser, error: userError } = await supabase
        .from("users")
        .insert([{ name, email }])
        .select()
        .single()
      if (userError) {
        setMessage("❌ Error: " + userError.message)
        return
      }
      userId = newUser.id
    } else {
      userId = existingUser.id
    }

    // insert RSVP
    const { error } = await supabase.from("rsvps").insert([
      {
        user_id: userId,
        event_id: parseInt(selectedEvent),
        status,
      },
    ])

    if (error) setMessage("❌ " + error.message)
    else setMessage("✅ RSVP submitted successfully!")
  }

  return (
    <div className="p-10 max-w-lg mx-auto bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">RSVP to an Event</h1>

      <input
        type="text"
        placeholder="Your Name"
        className="border p-2 w-full mb-3 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your Email"
        className="border p-2 w-full mb-3 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-3 rounded"
        value={selectedEvent}
        onChange={(e) => setSelectedEvent(e.target.value)}
      >
        <option value="">Select Event</option>
        {events.map((ev) => (
          <option key={ev.id} value={ev.id}>
            {ev.title} – {ev.date}
          </option>
        ))}
      </select>

      <select
        className="border p-2 w-full mb-3 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Select Response</option>
        <option value="Yes">✅ Yes</option>
        <option value="No">❌ No</option>
        <option value="Maybe">🤔 Maybe</option>
      </select>

      <button
        onClick={handleRSVP}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full"
      >
        Submit RSVP
      </button>

      <p className="mt-3 text-blue-600">{message}</p>
    </div>
  )
}
