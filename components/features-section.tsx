"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FeaturesSection() {
  const features = [
    {
      title: "Wellness Score",
      description: "Get your personalized NestWell Score and see where you stand.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-500"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      link: "/score",
      color: "from-amber-50 to-orange-50",
    },
    {
      title: "Personalized Insights",
      description: "Discover tailored recommendations to strengthen your nest.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-green-500"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      link: "/insights",
      color: "from-green-50 to-emerald-50",
    },
    {
      title: "Timeline Planner",
      description: "Visualize and plan for important milestones in your future.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-500"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
      link: "/planner",
      color: "from-blue-50 to-sky-50",
    },
    {
      title: "Healthcare Cost Comparison",
      description: "Compare NHS, private, and insured healthcare options.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-purple-500"
        >
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      link: "/healthcare-costs",
      color: "from-purple-50 to-indigo-50",
    },
    {
      title: "Care Risk Scenarios",
      description: "Explore and plan for potential care needs in later life.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-500"
        >
          <path d="M2 12h20M2 12a10 10 0 0 1 20 0M2 12a10 10 0 0 0 20 0M14 12a2 2 0 1 0-4 0 2 2 0 0 0 4 0z" />
        </svg>
      ),
      link: "/care-scenarios",
      color: "from-red-50 to-rose-50",
    },
    {
      title: "Advice Cost Comparison",
      description: "Compare financial advice models and discover potential savings.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-500"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      link: "/advice-comparison",
      color: "from-blue-50 to-indigo-50",
    },
    {
      title: "Health & Lifestyle",
      description: "Plan for wellbeing beyond finances in your later years.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-500"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
        </svg>
      ),
      link: "/health-lifestyle",
      color: "from-emerald-50 to-green-50",
    },
    {
      title: "AI Assistant",
      description: "Get personalized guidance and answers to your questions.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-500"
        >
          <path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1-10 10h-1a10 10 0 0 1-10-10C1 6.477 5.477 2 11 2h1Z" />
          <path d="m7 9 3 3-3 3" />
          <path d="M13 15h4" />
        </svg>
      ),
      link: "#",
      color: "from-amber-50 to-yellow-50",
      onClick: () => {
        // This would trigger the AI assistant to open
        alert("Opening AI Assistant")
      },
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-semibold mb-4 text-gray-800">Our Tools & Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to plan for a well-lived future, all in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br ${feature.color}`}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                {feature.onClick ? (
                  <Button onClick={feature.onClick} className="bg-white text-gray-800 hover:bg-gray-100 shadow-sm">
                    Open {feature.title}
                  </Button>
                ) : (
                  <Link href={feature.link}>
                    <Button className="bg-white text-gray-800 hover:bg-gray-100 shadow-sm">Open {feature.title}</Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
