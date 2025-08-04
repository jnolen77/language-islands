import { Button } from "../../components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

import SatzlingTransLogo from "/images/satzling-trans-logo.png"


export default function Header () {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
         <header className="border-b border-gray-200 bg-gray-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="text-white font-bold text-xl">
              <img src={SatzlingTransLogo} alt="Satzling" className="h-20 w-auto" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </a>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Login
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </a>
                <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-900">
                  Login
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
              </div>
            </div>
          )}
        </div>
      </header>
    )
}