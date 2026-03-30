"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <ChessKnightIcon className="h-7 w-7 text-foreground" />
          <span className="text-xl font-serif font-bold tracking-tight text-foreground">
            Checkmate
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#learn" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Learn
          </Link>
          <Link href="#community" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Community
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" className="text-sm">
            Sign In
          </Button>
          <Button size="sm" className="text-sm">
            Play Now
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>
              Features
            </Link>
            <Link href="#learn" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>
              Learn
            </Link>
            <Link href="#community" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>
              Community
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="ghost" size="sm" className="w-full justify-center text-sm">
                Sign In
              </Button>
              <Button size="sm" className="w-full justify-center text-sm">
                Play Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function ChessKnightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 22H5v-2h14v2z" />
      <path d="M17 20H7V10c0-1 .5-2 1.5-3L12 4l-2-2c3.5 0 6 2.5 7 5v7l-1 2" />
      <circle cx="10" cy="9" r="1" />
    </svg>
  )
}
