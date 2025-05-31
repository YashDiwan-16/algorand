"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { AlignJustify, X, Shield, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

const routes = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'My Consents',
    path: '/consents',
  },
  {
    name: 'Create Consent',
    path: '/create',
  },
  {
    name: 'Scan',
    path: '/scan',
  },
  {
    name: 'Activity',
    path: '/activity',
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="hidden font-bold sm:inline-block text-xl">Consent<span className="text-blue-600">Pass</span></span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link 
              key={route.path} 
              href={route.path} 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.path ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {route.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <ConnectWalletButton />
          <ThemeToggle />
          
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Menu"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <AlignJustify className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {routes.map((route) => (
              <Link 
                key={route.path} 
                href={route.path} 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                  pathname === route.path ? "bg-muted text-foreground" : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

function ConnectWalletButton() {
  const [connected, setConnected] = useState(false)
  
  const handleConnect = () => {
    setConnected(!connected)
  }
  
  return (
    <Button 
      variant={connected ? "outline" : "default"}
      className="gap-2"
      onClick={handleConnect}
    >
      <Lock className="h-4 w-4" />
      <span>{connected ? "0x12...3abc" : "Connect Wallet"}</span>
    </Button>
  )
}