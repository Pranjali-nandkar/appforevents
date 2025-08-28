'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Events() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })
      if (!error) setEvents(data)
    }
    fetchEvents()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>📅 Upcoming Events</h1>
      <ul>
        {events.map((e) => (
          <li key={e.id}>
            <strong>{e.title}</strong> – {e.date} – {e.city} →{' '}
            <a href={`/rsvp/${e.id}`}>RSVP</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
