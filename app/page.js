export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-2xl text-center bg-white shadow-lg rounded-2xl p-10">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          🎉 Welcome to Events App
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Manage events and RSVPs with ease using <b>Next.js + Supabase</b>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/events"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            📅 View Events
          </a>

          <a
            href="/rsvp"
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
          >
            ✍️ RSVP
          </a>

          <a
            href="/mydashboard"
            className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition"
          >
            👤 My Dashboard
          </a>

        
        </div>
      </div>
    </main>
  )
}
