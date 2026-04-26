"use client"

import { useState, useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Toggle } from "@/components/ui/toggle"
import { DonutChart } from "@/components/ui/donut-chart"
import { motion } from "framer-motion"
import { Flag, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"

export default function MockTest() {
  const { 
    mockTestSession, 
    startMockTest, 
    answerMockQuestion, 
    flagMockQuestion, 
    submitMockTest, 
    setCurrentScreen,
    premium
  } = useAppStore()

  const [showSetup, setShowSetup] = useState(true)
  const [showReview, setShowReview] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    if (mockTestSession && !showSetup && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [mockTestSession, showSetup, showResults])

  const handleStart = () => {
    startMockTest()
    setShowSetup(false)
    setTimeLeft(57 * 60) // 57 minutes
  }

  const handleAnswer = (optionIndex: number) => {
    if (!mockTestSession) return
    answerMockQuestion(optionIndex)
  }

  const handleSubmit = () => {
    if (!mockTestSession) return
    submitMockTest()
    setShowResults(true)
  }

  const handleReview = () => {
    setShowReview(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getTimeColor = () => {
    if (timeLeft <= 300) return "text-red-500" // 5 minutes or less
    if (timeLeft <= 600) return "text-yellow-500" // 10 minutes or less
    return "text-green-500"
  }

  if (showSetup) {
    return (
      <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-1 flex-col items-center justify-center max-w-md mx-auto"
        >
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Mock Theory Test</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="space-y-2">
                <p className="text-lg font-semibold">50 Questions</p>
                <p className="text-lg font-semibold">57 Minutes</p>
                <p className="text-lg font-semibold">Pass Mark: 43/50 (86%)</p>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>This simulates the official DVSA theory test</p>
                <p>You can flag questions for review</p>
                <p>Review all answers before submitting</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleStart} className="w-full">
                Start Test
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (showResults && mockTestSession) {
    const correctCount = mockTestSession.questions.filter(q => q.userAnswer === q.correctIndex).length
    const accuracy = Math.round((correctCount / mockTestSession.questions.length) * 100)
    const passed = correctCount >= 43

    // Calculate topic breakdown
    const topicStats = mockTestSession.questions.reduce((acc, question) => {
      if (!acc[question.topic]) {
        acc[question.topic] = { correct: 0, total: 0 }
      }
      acc[question.topic].total++
      if (question.userAnswer === question.correctIndex) {
        acc[question.topic].correct++
      }
      return acc
    }, {} as Record<string, { correct: number; total: number }>)

    const chartData = Object.entries(topicStats).map(([topic, stat]) => ({
      name: topic,
      value: stat.correct,
      total: stat.total
    }))

    return (
      <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-1 flex-col max-w-2xl mx-auto gap-6"
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                {passed ? "Congratulations! You Passed!" : "Test Complete"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className={`text-6xl ${passed ? 'text-green-500' : 'text-red-500'}`}>
                {passed ? <CheckCircle /> : <XCircle />}
              </div>
              <div className="text-4xl font-bold">{correctCount}/50</div>
              <div className="text-lg">Accuracy: {accuracy}%</div>
              <Progress 
                value={accuracy}
                className={`h-3 ${passed ? 'bg-green-500' : 'bg-red-500'}`}
              />
              <div className={`font-medium ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {passed ? "Pass - Well done!" : "Fail - Keep practicing"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Topic Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <DonutChart 
                  data={chartData}
                  category="name"
                  value="value"
                  total="total"
                  className="h-64 w-64"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Review Your Answers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockTestSession.questions.map((question, index) => {
                const isCorrect = question.userAnswer === question.correctIndex
                return (
                  <div key={index} className={`p-3 border rounded-lg ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`text-xl ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                        {isCorrect ? <CheckCircle /> : <XCircle />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-1">{question.question}</p>
                        <p className="text-sm text-muted-foreground">
                          Your answer: {question.options[question.userAnswer || 0]}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-600">
                            Correct: {question.options[question.correctIndex]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <CardFooter className="flex flex-col gap-3">
            <Button onClick={() => setCurrentScreen("dashboard")} className="w-full">
              Back to Dashboard
            </Button>
            <Button variant="outline" onClick={() => setShowSetup(true)} className="w-full">
              Take Another Test
            </Button>
          </CardFooter>
        </motion.div>
      </div>
    )
  }

  if (!mockTestSession) {
    return (
      <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-1 flex-col max-w-md mx-auto gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Loading Mock Test...</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">Preparing your test questions...</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const currentQuestion = mockTestSession.questions[mockTestSession.currentIndex]
  const progress = ((mockTestSession.currentIndex + 1) / mockTestSession.questions.length) * 100

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col max-w-3xl mx-auto gap-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 font-medium ${getTimeColor()}`}>
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Question {mockTestSession.currentIndex + 1} of {mockTestSession.questions.length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Toggle 
              pressed={currentQuestion.flagged}
              onPressedChange={() => flagMockQuestion()}
              aria-label="Flag question"
            >
              <Flag className="h-4 w-4" />
            </Toggle>
          </div>
        </div>

        <Progress value={progress} />

        {/* Question */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {currentQuestion.options.map((option, index) => {
                const isSelected = currentQuestion.userAnswer === index
                return (
                  <Button
                    key={index}
                    variant={isSelected ? "default" : "outline"}
                    className="h-auto py-3 px-4 text-left justify-start"
                    onClick={() => handleAnswer(index)}
                  >
                    <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Question Navigator */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Question Navigator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-1">
              {mockTestSession.questions.map((q, index) => {
                const isCurrent = index === mockTestSession.currentIndex
                const isAnswered = q.userAnswer !== null
                const isFlagged = q.flagged

                return (
                  <Button
                    key={index}
                    size="sm"
                    variant={isCurrent ? "default" : isAnswered ? "secondary" : "outline"}
                    className={`h-8 w-8 p-0 ${isFlagged ? 'border-red-500' : ''}`}
                    onClick={() => {
                      // TODO: Implement navigation to specific question
                    }}
                  >
                    {index + 1}
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline"
            onClick={handleReview}
            disabled={!mockTestSession.questions.some(q => q.userAnswer !== null)}
          >
            Review
          </Button>
          <Button onClick={handleSubmit} className={timeLeft <= 0 ? 'bg-red-500 hover:bg-red-600' : ''}>
            {timeLeft <= 0 ? 'Time Up - Submit Now' : 'Submit Test'}
          </Button>
        </CardFooter>
      </motion.div>
    </div>
  )
}
