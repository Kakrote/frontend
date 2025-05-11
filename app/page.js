import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-indigo-100 p-6">
      <header className="flex justify-center items-center mb-12 max-w-6xl mx-auto">
        <h1 className="text-3xl text-center font-bold text-indigo-700">🔗 LinkShorty</h1>
      </header>

      <main className="max-w-6xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Simplify, Share & Track <br /> Your Links Like a Pro.
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-xl">
          Create short, beautiful URLs that are fully trackable. Gain insights with real-time click analytics, device breakdowns and more.
        </p>

        <Link href="/login">
          <Button className="text-lg px-6 py-3 rounded-xl flex items-center gap-2">
            Get Started <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>

        <div className="mt-16">
          <img
            src="https://storyset.com/illustration/social-dashboard/rafiki"
            alt="Analytics Dashboard Illustration"
            className="mx-auto w-80 drop-shadow-xl"
          />
        </div>
      </main>

      <footer className="text-center text-gray-500 mt-20 text-sm">
        Made with ❤️ by Anshul Pundir | &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}
