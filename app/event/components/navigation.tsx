"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"


export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  // scroll state + active section highlight
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)

      const sections = ["about", "schedule", "tracks", "prizes", "judges", "sponsors", "faqs", "contact"]
      const current = sections.find((id) => {
        const el = document.getElementById(id)
        if (!el) return false
        const r = el.getBoundingClientRect()
        return r.top <= 100 && r.bottom >= 100
      })
      setActiveSection(current || "")
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // lock background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Schedule", href: "#schedule" },
    { name: "Tracks", href: "#tracks" },
    { name: "Prizes", href: "#prizes" },
    { name: "Judges", href: "#judges" },
    { name: "Sponsors", href: "#sponsors" },
    { name: "FAQs", href: "#faqs" },
    { name: "Contact", href: "#contact" },
  ]

  const handleSmoothScroll = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* NAV ROOT */}
      <nav className={`fixed top-1 left-0 right-0 z-50 px-4 sm:px-6 `}>
        {/* PILL CONTAINER */}
        <div
          className={[
            "mx-auto max-w-6xl relative",
            "rounded-[2.5rem] border border-white/10",
            "bg-[rgba(22,27,34,0.55)] backdrop-blur-xl",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_30px_-10px_rgba(0,0,0,0.6)]",
            "transition-all duration-500",
            isScrolled ? "ring-1 ring-white/5" : "ring-0",
            isMobileMenuOpen ? "overflow-visible" : "overflow-hidden",
          ].join(" ")}
        >
          {/* right-side CTA halo — violet palette */}
          <div
            className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 h-16 w-56 rounded-full opacity-60 blur-2xl"
            style={{
              background:
                "radial-gradient(60% 120% at 70% 50%, rgba(220, 38, 38,0.55) 0%, rgba(220, 38, 38,0.18) 55%, transparent 80%)",
            }}
          />

          {/* BAR CONTENT */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-2.5">
            {/* Brand (logo removed) */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2"
              aria-label="Go to top"
            >
              <span className="text-[18px] font-semibold tracking-wide text-white/90 group-hover:text-white transition-colors">
                Code Voyage
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1)
                const isRoute = item.href.startsWith("/")
                const className = [
                  "relative text-[15px] font-medium tracking-wide",
                  "text-zinc-200/85 hover:text-white transition-colors",
                  "px-1 py-1",
                  "group/nav",
                  isActive ? "text-white" : "",
                ].join(" ")

                const content = (
                  <>
                    <span>{item.name}</span>
                    <span
                      className={[
                        "absolute left-0 -bottom-1 h-[2px] w-full",
                        "bg-gradient-to-r from-white/70 via-white/50 to-white/70",
                        "scale-x-0 group-hover/nav:scale-x-100 origin-center transition-transform duration-300",
                        isActive ? "scale-x-100" : "",
                      ].join(" ")}
                    />
                    <span className="absolute inset-0 rounded-md opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300 blur-[6px] bg-white/5" />
                  </>
                )

                if (isRoute) {
                  return (
                    <Link key={item.name} href={item.href} className={className}>
                      {content}
                    </Link>
                  )
                }

                return (
                  <button
                    key={item.name}
                    onClick={() => handleSmoothScroll(item.href)}
                    className={className}
                  >
                    {content}
                  </button>
                )
              })}
            </div>

            {/* CTA — violet gradient + enhanced hover effects */}
            <div className="hidden md:block">
              <Button
                asChild
                className={[
                  "relative rounded-[1.5rem] px-6 py-2.5 text-sm font-semibold text-white",
                  "bg-gradient-to-r from-[#dc2626] to-[#b91c1c]",
                  "hover:from-[#b91c1c] hover:to-[#991b1b]",
                  "border border-white/10 backdrop-blur-sm",
                  "transition-all duration-300 group overflow-hidden",
                  "hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(220, 38, 38,0.8)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                ].join(" ")}
              >
                <a href="https://forms.gle/YOUR_FORM_ID" target="_blank" rel="noopener noreferrer">
                  <span className="relative z-10">Register Now</span>
                  {/* shine sweep */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  {/* soft inner highlight on hover */}
                  <span className="pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/5" />
                </a>
              </Button>
            </div>

            {/* Hamburger */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav"
                aria-label="Toggle menu"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            id="mobile-nav"
            className={[
              "md:hidden absolute left-3 right-3 top-[calc(100%+8px)] z-50",
              "transition-[max-height,opacity] duration-300 ease-out",
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
            ].join(" ")}
          >
            <div className="rounded-2xl border border-white/10 bg-[rgba(22,27,34,0.85)] backdrop-blur-xl shadow-[0_12px_30px_-12px_rgba(0,0,0,0.7)] overflow-hidden">
              <div className="grid gap-1.5 p-3">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.href.slice(1)
                  const isRoute = item.href.startsWith("/")
                  const className = [
                    "w-full text-left rounded-xl px-3 py-2 text-[15px] font-medium block",
                    "transition-all duration-300",
                    isActive ? "text-white bg-white/5" : "text-zinc-200/85 hover:text-white hover:bg-white/5",
                  ].join(" ")

                  if (isRoute) {
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={className}
                        style={{ animation: isMobileMenuOpen ? `slideIn .18s ${i * 40}ms both` : "none" }}
                      >
                        {item.name}
                      </Link>
                    )
                  }

                  return (
                    <button
                      key={item.name}
                      onClick={() => handleSmoothScroll(item.href)}
                      className={className}
                      style={{ animation: isMobileMenuOpen ? `slideIn .18s ${i * 40}ms both` : "none" }}
                    >
                      {item.name}
                    </button>
                  )
                })}

                {/* Mobile CTA — same gradient + hover effects */}
                <Button
                  asChild
                  className={[
                    "mt-1 relative rounded-[1.25rem] py-2.5 text-sm font-semibold text-white",
                    "bg-gradient-to-r from-[#dc2626] to-[#b91c1c]",
                    "hover:from-[#b91c1c] hover:to-[#991b1b]",
                    "border border-white/10 transition-all duration-300 group overflow-hidden",
                  ].join(" ")}
                >
                  <a href="https://forms.gle/YOUR_FORM_ID" target="_blank" rel="noopener noreferrer">
                    <span className="relative z-10">Register Now</span>
                    <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
