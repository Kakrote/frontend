'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RedirectPage({ params }) {
  const router = useRouter()

  useEffect(() => {
    const handleRedirect = async () => {
      try {
       
        window.location.href = `https://linkshoty-production.up.railway.app/${params.code}`
      } catch (err) {
        console.error(err)
        router.push('/404')
      }
    }

    handleRedirect()
  }, [params.code, router])

  return (
    <div className="min-h-screen flex items-center justify-center text-lg font-medium">
      Redirecting you to your destination...
    </div>
  )
}
