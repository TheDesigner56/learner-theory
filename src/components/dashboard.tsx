"use client"

import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const { user, stats, setCurrentScreen } = useAppStore()
  const [daysUntilTest, setDaysUntilTest] = useState<number | null>(null)

  useEffect(() => {
    if (user.testDate) {
      const testDate = new Date(user.testDate)
      const today = new Date()
      const diffTime = testDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDaysUntilTest(diffDays > 0 ? diffDays : 0)
    }
  }, [user.testDate])

  const accuracy = stats.totalAnswered > 0 
    ? Math.round((stats.correctCount / stats.totalAnswered) * 100)
    : 0

  // Generate heatmap data (mock for now)
  const heatmapData = Array(7).fill(Array(7).fill(0))

  // Find weakest topic
  const weakestTopic = Object.entries(stats.topicStats).reduce((weakest, [topic, stat]) => {
    const topicAccuracy = stat.answered > 0 ? (stat.correct / stat.answered) * 100 : 0
    return topicAccuracy < (weakest.accuracy || 100) ? { topic, accuracy: topicAccuracy } : weakest
  }, { topic: "None", accuracy: 100 })

  const quickActions = [
    { 
      title: "Start Quiz", 
      description: "Practice questions by topic",
      icon: "📝",
      action: () => setCurrentScreen("quiz")
    },
    { 
      title: "Flashcards", 
      description: "SM-2 spaced repetition",
      icon: "🃏",
      action: () => setCurrentScreen("flashcards")
    },
    { 
      title: "Mock Test", 
      description: "Full 50-question test",
      icon: "📊",
      action: () => setCurrentScreen("mock-test")
    },
    { 
      title: "Road Signs", 
      description: "Learn all UK signs",
      icon: "🛑",
      action: () => setCurrentScreen("road-signs")
    },
    { 
      title: "Hazard Perception", 
      description: "Practice hazard clips",
      icon: "🚗",
      action: () => setCurrentScreen("hazard-perception")
    },
    { 
      title: "Study Plan", 
      description: "Create your plan",
      icon: "📅",
      action: () => setCurrentScreen("study-plan")
    },
    { 
      title: "Weak Areas", 
      description: "Focus on weak topics",
      icon: "🎯",
      action: () => setCurrentScreen("weak-areas")
    },
    { 
      title: "Settings", 
      description: "Configure your profile",
      icon: "⚙️",
      action: () => setCurrentScreen("settings")
    }
  ]

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-1 flex-col gap-6"
      >
        {/* Welcome section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome{user.name ? `, ${user.name}` : ""}!
          </h1>
          <p className="text-muted-foreground">
            {daysUntilTest !== null 
              ? `Your theory test is in ${daysUntilTest} day${daysUntilTest !== 1 ? "s" : ""}`
              : "Set your test date in settings to track your progress"}
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Questions Answered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAnswered}</div>
              <p className="text-xs text-muted-foreground">Total practice questions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold driving-primary">{accuracy}%</div>
              <Progress value={accuracy} className="mt-2 h-2" />
              <p className="text-xs text-muted-foreground mt-1">Correct answers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.streakDays}</div>
              <p className="text-xs text-muted-foreground">Consecutive study days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.quizzesCompleted}</div>
              <p className="text-xs text-muted-foreground">Practice sessions finished</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Study Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                {Array(7).fill(0).map((_, dayIndex) => (
                  <div key={dayIndex} className="text-xs text-center w-8">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][dayIndex]}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {heatmapData.flat().map((value, index) => (
                  <div 
                    key={index}
                    className={`heatmap-cell heatmap-${Math.min(6, Math.max(0, value))}`}
                    title={`Activity level: ${value}`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="flex flex-col items-center justify-center h-32 p-4" onClick={action.action}>
                <div className="text-3xl mb-2">{action.icon}</div>
                <h3 className="font-semibold text-center">{action.title}</h3>
                <p className="text-xs text-muted-foreground text-center">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weakest topic */}
        {weakestTopic.topic !== "None" && (
          <Card className="bg-yellow-50 dark:bg-yellow-900/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Focus Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{weakestTopic.topic}</p>
                  <p className="text-sm text-muted-foreground">
                    {weakestTopic.accuracy}% accuracy - needs improvement
                  </p>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentScreen("weak-areas")}
                >
                  Review
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}
