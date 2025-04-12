'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

const COLORS = ['#0088FE', '#FF8042']

export default function LinkAnalyticsPage() {
  const { linkId } = useParams()
  const [clicksPerDay, setClicksPerDay] = useState([])
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`linkshoty-production.up.railway.app/api/analytics/${linkId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        const data = await res.json()

        // Format for recharts
        const barData = Object.entries(data.clicksPerDay).map(([date, count]) => ({
          date,
          clicks: count,
        }))
        const pieData = Object.entries(data.devices).map(([device, count]) => ({
          name: device,
          value: count,
        }))

        setClicksPerDay(barData)
        setDevices(pieData)
      } catch (err) {
        console.error('Failed to load analytics:', err)
      } finally {
        setLoading(false)
      }
    }

    if (linkId) fetchAnalytics()
  }, [linkId])

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <Link href="/dashboard">
          <ArrowLeft className="text-blue-500 hover:text-blue-700 transition duration-300" />
        </Link>
        <h1 className="text-3xl font-semibold text-gray-800">📊 Link Analytics</h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Clicks Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clicksPerDay}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Device Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={devices}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {devices.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  )
}
