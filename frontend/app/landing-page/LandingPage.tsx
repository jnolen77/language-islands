
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { Menu, X, Zap, Globe, Brain, Users, BookOpen, Target } from "lucide-react"
import { useState } from "react"
import SatzlingTransLogo from "/images/satzling-trans-logo.png"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Master Languages with <span className="text-blue-600">Language Islands</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Learn faster by diving into real-life conversations. Our AI creates immersive language islands that
                  teach you practical sentences you'll actually use.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                  Start Learning Free
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>50,000+ learners</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>12 languages</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/images/students.jpg?height=300&width=250&text=Language Learning App Screenshot"
                  alt="Language learning interface"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src="/images/barista.jpg?height=250&width=250&text=Conversation Practice"
                  alt="Conversation practice"
                  className="rounded-lg shadow-lg mt-8"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium">3x faster learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Section - Language Islands */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">What are Language Islands?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Immersive learning environments that simulate real-world conversations and contexts, helping you learn
              practical language skills faster than traditional methods.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Contextual Learning</h3>
                <p className="text-gray-600">
                  Learn words and phrases within real-life situations, making them easier to remember and use naturally.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Practical Sentences</h3>
                <p className="text-gray-600">
                  Focus on sentences you'll actually use in conversations, travel, work, and daily interactions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">AI-Powered</h3>
                <p className="text-gray-600">
                  Our AI creates personalized learning paths and adapts to your progress for optimal learning
                  efficiency.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Why Language Islands Work</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Real Context</h4>
                      <p className="text-gray-600">
                        Learn how native speakers actually communicate in everyday situations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Memory Retention</h4>
                      <p className="text-gray-600">Contextual learning improves memory retention by up to 65%.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Faster Progress</h4>
                      <p className="text-gray-600">
                        Skip the fluff and focus on what you need to communicate effectively.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/placeholder.svg?height=400&width=500&text=Language Islands Interface"
                  alt="Language Islands learning interface"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Learn why Language Islands are the fastest way to master a new language
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg border shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-semibold text-gray-900">
                  How are Language Islands different from traditional language learning?
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                Language Islands focus on real-world contexts and practical sentences you'll actually use. Instead of
                memorizing isolated vocabulary or grammar rules, you learn complete phrases and sentences within
                meaningful situations, making the learning process more natural and effective.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg border shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-semibold text-gray-900">
                  Why is contextual learning faster than other methods?
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                Contextual learning leverages your brain's natural ability to remember information when it's connected
                to meaningful situations. When you learn a phrase like "Could you help me find the train station?" in
                the context of traveling, you're more likely to remember and use it correctly than if you learned each
                word separately.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg border shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-semibold text-gray-900">How does the AI personalize my learning experience?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                Our AI analyzes your learning patterns, identifies areas where you need more practice, and creates
                personalized Language Islands based on your interests, goals, and proficiency level. It adapts in
                real-time to ensure you're always challenged but never overwhelmed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg border shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-semibold text-gray-900">What languages are available on the platform?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                We currently support 12 popular languages including Spanish, French, German, Italian, Portuguese,
                Japanese, Korean, Mandarin Chinese, Russian, Arabic, Dutch, and Swedish. We're constantly adding new
                languages based on user demand.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg border shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-semibold text-gray-900">How quickly can I expect to see results?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                Most users report feeling more confident in conversations within 2-3 weeks of consistent practice.
                Because you're learning practical sentences from day one, you can start using what you learn immediately
                in real situations, which accelerates your progress significantly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <img
                src="/images/satzling-trans-logo.png?height=40&width=120&text=Satzling"
                alt="Satzling"
                className="h-20 w-auto mb-4"
              />
              <p className="text-gray-400 max-w-md">
                Master languages faster with AI-powered Language Islands. Learn practical sentences in real-world
                contexts.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Satzling. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
