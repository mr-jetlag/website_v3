"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Moon, Sun, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Declare YT as a global variable
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" })

  // Add ref for the video container
  const videoContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Effect to handle video positioning
  useEffect(() => {
    // Create YouTube Player
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    let player: any

    window.onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player("youtube-player", {
        videoId: "oYEtLQ3lEH0",
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: "oYEtLQ3lEH0",
          controls: 0,
          showinfo: 0,
          rel: 0,
          enablejsapi: 1,
          modestbranding: 1,
          mute: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo()
          },
        },
      })
    }

    return () => {
      if (player) {
        player.destroy()
      }
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleContactClick = () => {
    setShowContactForm(true)
  }

  const handleCloseForm = () => {
    setShowContactForm(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your server or API
    console.log("Form submitted:", formData)
    // For demonstration, we'll just log the data and close the form
    alert("Thank you for your enquiry. We will get back to you soon.")
    setShowContactForm(false)
    setFormData({ name: "", phone: "", email: "" }) // Reset form
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <header className="container mx-auto px-4 lg:px-6 h-24 flex items-center justify-between border-b dark:border-gray-700">
        <Link className="flex items-center justify-center" href="#">
          <Image
            src={
              darkMode
                ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Agos%20Dark%20Logo-Sisj0KrYxd2TsEI1TanU6PHNQp6VhT.png"
                : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Agos%20Light%20Logo-pArHvH4wCElHOcPwLw4tLiqXlxtpUj.png"
            }
            alt="Agos Capital Logo"
            width={50}
            height={50}
            className="transition-all duration-300"
          />
          <span className="ml-4 text-xl font-light tracking-wider text-gray-900 dark:text-gray-100">AGOS CAPITAL</span>
        </Link>
        <nav className="flex gap-8 items-center">
          <Link
            className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            href="#about"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            href="#clients"
          >
            Clients
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            href="#investors"
          >
            Investors
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full">
            <div className="relative w-full h-full">
              <div
                id="youtube-player"
                className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider text-white">
                Welcome to Agos Capital
              </h1>
              <p className="text-xl text-gray-200">
                Your trusted partner in innovative financial solutions and strategic investments.
              </p>
              <div className="flex justify-center gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">Learn More</Button>
                <Button
                  onClick={handleContactClick}
                  variant="outline"
                  className="text-white border-white hover:bg-white/10 px-8"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-12">
              <h2 className="text-3xl md:text-4xl font-light tracking-wider text-gray-900 dark:text-gray-100">
                About Agos Capital
              </h2>
              <div className="text-left space-y-6">
                <p className="text-gray-600 dark:text-gray-300">
                  AGOS is the Tagalog word for the flow of a river or the ocean current. After decades of work in the
                  global capital markets, we at Agos Capital understand that the concept of flow and growth are
                  intimately linked:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>
                    Strong flows of capital, to provide the driving force for innovation, growth and to weather adverse
                    conditions.
                  </li>
                  <li>
                    The "flow state", the melting together of action and consciousness into a continuous state of deep
                    work where teams and companies do their greatest work.
                  </li>
                  <li>
                    Knowledge flow, the open sharing of experience and information in the service of a greater purpose
                    and to the benefit of the whole.
                  </li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300">
                  Agos Capital operates globally, providing private strategic advisory, consulting and arranging capital
                  flows wherever needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="clients" className="w-full py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-light tracking-wider text-gray-900 dark:text-gray-100">
                  Our Clients
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Agos Capital have provided transformational consulting and advisory services to global firms.
                </p>
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">Investment Portfolio Companies</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600 dark:text-gray-300">
                    <p>CxO or board advisory</p>
                  </CardContent>
                </Card>
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">Startup Fintech Firms</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600 dark:text-gray-300">
                    <p>Product/market fit, direct operation via fractional CxO services</p>
                  </CardContent>
                </Card>
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">Enterprise SaaS Companies</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600 dark:text-gray-300">
                    <p>Product advisory, go to market planning, execution</p>
                  </CardContent>
                </Card>
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">Global Consultancies</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600 dark:text-gray-300">
                    <p>Foundational private markets training; deal advisory and assistance with selection</p>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center space-y-8">
                <p className="text-gray-600 dark:text-gray-300">
                  Working with clients who share our goals and values, we are able to provide immediate value and
                  meaningful long term impact – up to and including private market exits.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Contact Us for Advisory
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="investors" className="w-full py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-light tracking-wider text-gray-900 dark:text-gray-100">
                  Our Investment Approach
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Our investment approach is deeply personal, always private, and focused on win-win outcomes. Current
                  Agos Capital portfolio companies include:
                </p>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">Corporate Secretarial Services</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600 dark:text-gray-300">
                    <p>
                      A publicly listed provider, one of the fastest growing companies in Singapore with expansions into
                      Australia, the UK and US. Private debt facility.
                    </p>
                  </CardContent>
                </Card>
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">AI Startup</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600 dark:text-gray-300">
                    <p>
                      A pre-seed startup commercialising proprietary AI models from a Tier 1 government deeptech agency.
                      Angel Round, common equity.
                    </p>
                  </CardContent>
                </Card>
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">Private Debt and CLO Markets</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600 dark:text-gray-300">
                    <p>
                      A disruptive challenger firm supported by the largest ratings, data and analytics firm in the
                      world. Series A, common equity.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center space-y-8">
                <p className="text-gray-600 dark:text-gray-300">
                  We only invest in companies where our direct experience provide insights into the eventual exit. We
                  only operate or advise companies where direct involvement accelerates outcomes and provides direct
                  value to our partners.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Contact Us for Co-Investment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t dark:border-gray-700">
        <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">© 2024 Agos Capital. All rights reserved.</p>
          <nav className="flex gap-8 mt-4 sm:mt-0">
            <Link
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              href="mailto:hello@agoscapital.com"
            >
              hello@agoscapital.com
            </Link>
            <Link
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              href="mailto:investor@agoscapital.com"
            >
              investor@agoscapital.com
            </Link>
            <Link
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              href="https://www.agoscapital.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.agoscapital.com
            </Link>
          </nav>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Contact Us</h2>
              <Button variant="ghost" size="icon" onClick={handleCloseForm}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Submit
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

