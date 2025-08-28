"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Dashboard() {
  const [events, setEvents] = useState([])
  const [rsvpSummary, setRsvpSummary] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      // Get all events
      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select("id, title, date, city")

      if (eventsError) {
        console.error(eventsError)
        return
      }
      setEvents(eventsData)

      // Get RSVP data
      const { data: rsvpData, error: rsvpError } = await supabase
        .from("rsvps")
        .select("event_id, status")

      if (rsvpError) {
        console.error(rsvpError)
        return
      }

      // Count RSVPs per event
      const summary = eventsData.map((ev) => {
        const evRsvps = rsvpData.filter((r) => r.event_id === ev.id)
        return {
          ...ev,
          yes: evRsvps.filter((r) => r.status === "Yes").length,
          no: evRsvps.filter((r) => r.status === "No").length,
          maybe: evRsvps.filter((r) => r.status === "Maybe").length,
          total: evRsvps.length,
        }
      })

      setRsvpSummary(summary)
    }

    fetchData()
  }, [])

  return (
    <div className="p-10 max-w-4xl mx-auto bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-6">📊 Dashboard</h1>

      {rsvpSummary.length === 0 ? (
        <p>No events or RSVPs yet.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Event</th>
              <th className="border p-2">Yes ✅</th>
              <th className="border p-2">No ❌</th>
              <th className="border p-2">Maybe 🤔</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {rsvpSummary.map((ev) => (
              <tr key={ev.id}>
                <td className="border p-2 font-medium">
                  {ev.title} <br />
                  <span className="text-sm text-gray-500">
                    {ev.date} – {ev.city}
                  </span>
                </td>
                <td className="border p-2 text-center">{ev.yes}</td>
                <td className="border p-2 text-center">{ev.no}</td>
                <td className="border p-2 text-center">{ev.maybe}</td>
                <td className="border p-2 text-center font-bold">{ev.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
