'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createShortLink } from '@/redux/slices/linkSlice'
import { useRouter } from 'next/navigation'

export default function CreateLinkPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { loading } = useSelector((state) => state.links)

  const [longUrl, setOriginalUrl] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [expiresAt, setExpirationDate] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    setError(null)

    const resultAction = await dispatch(
      createShortLink({ longUrl, customAlias, expiresAt })
    )

    if (createShortLink.fulfilled.match(resultAction)) {
      setMessage('Link created successfully!')
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } else {
      setError(resultAction.payload || 'Error occurred')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Create Short Link</h2>

        <div className="mb-6 text-black">
          <label className="block text-sm font-medium text-gray-700">Original URL</label>
          <input
            type="url"
            value={longUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Custom Alias (optional)</label>
          <input
            type="text"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Expiration Date (optional)</label>
          <input
            type="date"
            value={expiresAt}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Link'}
        </button>
      </form>
    </div>
  )
}
