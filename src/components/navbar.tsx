"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/quiz", label: "Quiz" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/mock-test", label: "Mock Test" },
  { href: "/hazard", label: "Hazard" },
  { href: "/signs", label: "Signs" },
  { href: "/study-plan", label: "Study Plan" },
  { href: "/weak-areas", label: "Weak Areas" },
  { href: "/settings", label: "Settings" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
          aria-label="Learner Theory Home"
        >
          <Car className="size-5 text-primary" aria-hidden="true" />
          <span>Learner Theory</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-1 md:flex" role="menubar">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  role="menuitem"
                  className={cn(
                    "inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right side actions */}
        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="md:hidden"
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                >
                  <Menu className="size-5" aria-hidden="true" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Car className="size-5 text-primary" aria-hidden="true" />
                  <span>Learner Theory</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile navigation">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <SheetClose
                      key={link.href}
                      render={
                        <Link
                          href={link.href}
                          className={cn(
                            "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            isActive
                              ? "bg-muted text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                          aria-current={isActive ? "page" : undefined}
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
