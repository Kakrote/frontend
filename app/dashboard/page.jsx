'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserLinks } from '@/redux/slices/linkSlice'
import { logout } from '@/redux/slices/authSlice'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { QRCodeCanvas } from 'qrcode.react'
import { deleteLink } from '@/redux/slices/linkSlice'




export default function DashboardPage() {
    const dispatch = useDispatch()
    const router = useRouter()

    const { links, loading, error } = useSelector((state) => state.links)

    useEffect(() => {
        dispatch(getUserLinks())
    }, [dispatch])

    const handleLogout = () => {
        dispatch(logout())
        router.push('/login')
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Your Links</h1>
                <div className="flex gap-4">
                    <Link
                        href="/create-link"
                        className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
                    >
                        Create New Link
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-8">
                    <p className="text-lg text-gray-600">Loading your links...</p>
                </div>
            ) : error ? (
                <div className="text-center py-8">
                    <p className="text-lg text-red-500">{error}</p>
                </div>
            ) : links.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-lg text-gray-600">No links found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white text-black shadow-md rounded-xl p-3 overflow-hidden">
                        <thead className="bg-gray-200 text-left text-sm uppercase">
                            <tr>
                                <th className="p-4">Original URL</th>
                                <th className="p-4">Short URL</th>
                                <th className="p-4">Clicks</th>
                                <th className="p-4">Created</th>
                                <th className="p-4">Expires</th>
                                <th className="p-4">Actions</th>
                                <th className="p-3 text-center">QR</th>

                            </tr>
                        </thead>
                        <tbody>
                            {links.map((link) => (
                                <tr key={link._id} className="border-t p-3 text-black hover:bg-gray-200 duration-300 text-sm">
                                    <td className="p-4 max-w-xs truncate">{link.longUrl}</td>
                                    <td className="p-4">
                                        <a
                                            href={`https://linkshoty-production.up.railway.app/${link.shortCode}`}
                                            target="_blank"
                                            className=" text-blue-400 px-4 py-2 rounded-xl  transition"
                                        >
                                            {link.shortCode}
                                        </a>
                                    </td>
                                    <td className="p-4">{link.clicks}</td>
                                    <td className="p-4">
                                        {new Date(link.createdAt).toLocaleString()}
                                    </td>
                                    <td className="p-4">
                                        {link.expirationDate
                                            ? new Date(link.expirationDate) < new Date()
                                                ? 'Expired'
                                                : 'Active'
                                            : 'No Expiry'}
                                    </td>
                                    <td className="p-4 flex gap-2">
                                        <Link
                                            href={`/analytics/${link._id}`}
                                            className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
                                        >
                                            View Analytics
                                        </Link>
                                        <button
                                            onClick={() => {
                                                const confirmDelete = window.confirm('Are you sure you want to delete this link?')
                                                if (confirmDelete) {
                                                    dispatch(deleteLink(link._id))
                                                }
                                            }}
                                            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition text-center"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td className="p-3 text-center">
                                        <QRCodeCanvas
                                            value={`${link.longUrl}`}
                                            size={48}
                                            level="M"
                                        />
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
