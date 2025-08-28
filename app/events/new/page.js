'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function NewEvent() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [city, setCity] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleCreate = async () => {
    const { error } = await supabase.from('events').insert([
      {
        title,
        description,
        date,
        city,
        created_by: 1, // hardcoded user ID, can use auth later
      },
    ])
    if (error) setMessage('❌ ' + error.message)
    else {
      setMessage('✅ Event created!')
      router.push('/events')
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">➕ Create New Event</h1>
      <input
        type="text"
        placeholder="Title"
        className="border p-2 mb-2 block w-80"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="border p-2 mb-2 block w-80"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        className="border p-2 mb-2 block w-80"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="City"
        className="border p-2 mb-2 block w-80"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        onClick={handleCreate}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Create Event
      </button>
      <p className="mt-2">{message}</p>
    </div>
  )
}
