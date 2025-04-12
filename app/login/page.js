'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '@/redux/slices/authSlice'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { loading, error } = useSelector((state) => state.auth)

  const [email, setEmail] = useState('intern@dacoid.com')
  const [password, setPassword] = useState('Test123')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const resultAction = await dispatch(loginUser({ email, password }))
    if (loginUser.fulfilled.match(resultAction)) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <header className="flex justify-center items-center mb-12 max-w-6xl mx-auto">
        <h1 className="text-3xl text-center font-bold text-indigo-700"><Link href={'/'}>🔗 LinkShorty</Link></h1>
      </header>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition disabled:bg-blue-400"
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <svg
                className="w-5 h-5 mr-2 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="4" />
              </svg>
              Logging in...
            </span>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  )
}
