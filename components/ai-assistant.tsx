"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AssistantMessage } from "@/components/assistant-message"
import { TypingIndicator } from "@/components/typing-indicator"
import { FloatingFeatherAssistant } from "@/components/floating-feather-assistant"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
  actions?: Array<{ label: string; action: string }>
}

interface AIAssistantProps {
  userName?: string
  userScore?: number
  currentPage?: string
  recentInsights?: string[]
}

export function AIAssistant({
  userName = "Sam",
  userScore = 72,
  currentPage = "insights",
  recentInsights = [],
}: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showFeathers, setShowFeathers] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestedPrompts = [
    "How can I improve my score?",
    "What does private health insurance cover?",
    "I want to help my kids—what are my options?",
    "Should I downsize my home?",
    "How much should I save for care costs?",
    "What's the best way to plan my will?",
  ]

  // Load conversation history
  useEffect(() => {
    const savedMessages = localStorage.getItem("nestwell-assistant-messages")
    const savedFirstTime = localStorage.getItem("nestwell-assistant-first-time")

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }

    if (savedFirstTime === "false") {
      setIsFirstTime(false)
    }
  }, [])

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("nestwell-assistant-messages", JSON.stringify(messages))
    }
  }, [messages])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const openAssistant = () => {
    setIsOpen(true)

    if (isFirstTime && messages.length === 0) {
      // Welcome message for first-time users
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: "assistant",
        content: `Hi ${userName} 👋 I'm here to help with anything—from pensions to planning. I can see you have a NestWell Score of ${userScore}, which is a great foundation to build on!`,
        timestamp: new Date(),
        suggestions: ["How can I improve my score?", "What should I focus on first?", "Tell me about my timeline"],
      }

      setMessages([welcomeMessage])
      setIsFirstTime(false)
      localStorage.setItem("nestwell-assistant-first-time", "false")
    }
  }

  const generateResponse = async (userMessage: string): Promise<Message> => {
    // Simulate AI response with context awareness
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000))

    let response = ""
    let suggestions: string[] = []
    let actions: Array<{ label: string; action: string }> = []

    // Context-aware responses based on user input
    if (userMessage.toLowerCase().includes("score") || userMessage.toLowerCase().includes("improve")) {
      response = `Great question! Your score of ${userScore} shows you're on a solid path. Here are the top ways to strengthen your nest:

• **Top up your pension** - Even £100/month could add £20k+ to your future income
• **Consider private health insurance** - Reduce NHS waiting times and get faster care
• **Build your emergency fund** - Aim for 6 months of expenses for peace of mind

Would you like me to explain any of these in more detail?`

      suggestions = [
        "Tell me more about pension top-ups",
        "How much does private health insurance cost?",
        "How do I build an emergency fund?",
      ]

      actions = [
        { label: "Add to Timeline", action: "add_timeline" },
        { label: "View Detailed Analysis", action: "view_analysis" },
      ]
    } else if (
      userMessage.toLowerCase().includes("health insurance") ||
      userMessage.toLowerCase().includes("private health")
    ) {
      response = `Private health insurance can be a game-changer for your peace of mind! Here's what it typically covers:

✅ **Faster access to specialists** - Skip NHS waiting lists
✅ **Private hospital rooms** - More comfortable recovery
✅ **Advanced treatments** - Access to newer procedures
✅ **Mental health support** - Often better coverage than NHS

For someone your age, expect to pay £80-150/month depending on coverage level. The key is finding the right balance of coverage and cost.`

      suggestions = [
        "What's the best provider for my age?",
        "Can I get cover for existing conditions?",
        "How do I compare policies?",
      ]

      actions = [
        { label: "Get Quotes", action: "get_quotes" },
        { label: "Add to Action Plan", action: "add_action" },
      ]
    } else if (
      userMessage.toLowerCase().includes("kids") ||
      userMessage.toLowerCase().includes("children") ||
      userMessage.toLowerCase().includes("family")
    ) {
      response = `It's wonderful that you want to support your family! Here are some thoughtful ways to help:

💝 **Education funding** - ISAs or education savings plans
🏠 **House deposit help** - Lifetime ISAs or direct gifts
👶 **Grandchildren support** - Junior ISAs or trust funds
📋 **Inheritance planning** - Ensure your will reflects your wishes

The key is balancing generosity with your own security. You can't pour from an empty cup!`

      suggestions = [
        "How much can I gift tax-free?",
        "What's the best way to save for grandchildren?",
        "Should I help with house deposits now?",
      ]

      actions = [
        { label: "Plan Family Gifts", action: "plan_gifts" },
        { label: "Update Will", action: "update_will" },
      ]
    } else if (
      userMessage.toLowerCase().includes("downsize") ||
      userMessage.toLowerCase().includes("home") ||
      userMessage.toLowerCase().includes("house")
    ) {
      response = `Downsizing can be both financially smart and emotionally freeing! Here's how to think about it:

🏠 **Financial benefits:**
• Release equity for other goals
• Lower running costs and maintenance
• Reduced council tax and utilities

💭 **Lifestyle considerations:**
• Less space to maintain
• Potentially better location
• Closer to amenities and transport

The best time is usually when you're still active enough to manage the move comfortably.`

      suggestions = [
        "When is the right time to downsize?",
        "How do I value my current home?",
        "What should I look for in a new area?",
      ]

      actions = [
        { label: "Add to Timeline", action: "add_timeline" },
        { label: "Property Valuation", action: "property_value" },
      ]
    } else {
      // General helpful response
      response = `I'm here to help you with any aspect of your planning journey! Whether it's understanding your score, exploring insurance options, or thinking about your timeline, I've got you covered.

Based on your current situation, you might want to focus on:
• Strengthening your financial foundation
• Reviewing your insurance coverage
• Planning for future milestones

What would be most helpful for you right now?`

      suggestions = [
        "Show me my biggest opportunities",
        "What should I prioritize first?",
        "Help me plan my next 5 years",
      ]
    }

    return {
      id: Date.now().toString(),
      type: "assistant",
      content: response,
      timestamp: new Date(),
      suggestions,
      actions: actions.length > 0 ? actions : undefined,
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Show feathers for longer responses
    if (content.length > 20) {
      setShowFeathers(true)
      setTimeout(() => setShowFeathers(false), 3000)
    }

    // Generate AI response
    try {
      const assistantMessage = await generateResponse(content)
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: "assistant",
        content: "I'm having a moment of reflection... Could you try asking that again? I'm here to help! 🌟",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  return (
    <>
      {/* Floating feathers during long responses */}
      {showFeathers && <FloatingFeatherAssistant />}

      {/* Floating Assistant Button */}
      {!isOpen && (
        <Button
          onClick={openAssistant}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
          style={{ animation: "float 3s ease-in-out infinite" }}
        >
          <svg width="24" height="30" viewBox="0 0 24 30" className="text-white animate-feather-idle">
            <path
              d="M12 0C12 0 18 6 18 15C18 24 12 30 12 30C12 30 6 24 6 15C6 6 12 0 12 0Z"
              fill="currentColor"
              opacity="0.9"
            />
            <path
              d="M12 3C12 3 15 7.5 15 15C15 22.5 12 27 12 27C12 27 9 22.5 9 15C9 7.5 12 3 12 3Z"
              fill="currentColor"
              opacity="1"
            />
          </svg>
        </Button>
      )}

      {/* Assistant Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] z-50 animate-assistant-expand">
          <Card className="h-full border-0 shadow-2xl bg-gradient-to-b from-amber-50 to-orange-50 backdrop-blur-sm">
            <CardHeader className="pb-3 border-b border-amber-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                    <svg width="20" height="25" viewBox="0 0 20 25" className="text-white">
                      <path
                        d="M10 0C10 0 15 5 15 12.5C15 20 10 25 10 25C10 25 5 20 5 12.5C5 5 10 0 10 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-lg">NestWell Assistant</CardTitle>
                    <p className="text-sm text-gray-600">Here to help you plan</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 h-full flex flex-col">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <AssistantMessage key={message.id} message={message} onSuggestionClick={handleSuggestionClick} />
                  ))}

                  {isTyping && <TypingIndicator />}

                  {/* Suggested prompts for new users */}
                  {messages.length <= 1 && !isTyping && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 font-medium">Try asking me:</p>
                      <div className="grid gap-2">
                        {suggestedPrompts.slice(0, 3).map((prompt, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(prompt)}
                            className="text-left justify-start h-auto p-3 border-amber-200 hover:bg-amber-50 animate-suggestion-appear"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            {prompt}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-amber-200 bg-white/50">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your planning..."
                    className="flex-1 border-amber-200 focus:border-amber-400"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 2L11 13" />
                      <polygon points="22,2 15,22 11,13 2,9" />
                    </svg>
                  </Button>
                </div>

                {/* Mic icon for future voice input */}
                <div className="flex justify-center mt-2">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-amber-600" disabled>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
