"use client"

import { useState, useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react"

export default function QuizScreen() {
  const { 
    quiz, 
    startQuiz, 
    answerQuizQuestion, 
    nextQuizQuestion, 
    finishQuiz,
    setCurrentScreen,
    premium
  } = useAppStore()

  const [topic, setTopic] = useState("all")
  const [difficulty, setDifficulty] = useState("medium")
  const [showExplanation, setShowExplanation] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])

  useEffect(() => {
    // Load questions
    const loadQuestions = async () => {
      const response = await fetch('/api/questions')
      const data = await response.json()
      setQuestions(data)
    }
    loadQuestions()
  }, [])

  useEffect(() => {
    // Reset quiz if we're starting fresh
    if (!quiz && !showResults && questions.length > 0) {
      startQuiz(topic, difficulty, questions)
    }
  }, [quiz, startQuiz, topic, difficulty, showResults, questions])

  const handleAnswer = (optionIndex: number) => {
    if (!quiz || questions.length === 0) return
    
    answerQuizQuestion(optionIndex, questions)
    setShowExplanation(true)
  }

  const handleNext = () => {
    if (!quiz) return
    
    if (quiz.currentIndex < quiz.queue.length - 1) {
      nextQuizQuestion()
      setShowExplanation(false)
    } else {
      const results = finishQuiz()
      console.log('Quiz results:', results)
      setShowResults(true)
    }
  }

  const handleRestart = () => {
    setShowResults(false)
    setShowExplanation(false)
    if (questions.length > 0) {
      startQuiz(topic, difficulty, questions)
    }
  }

  if (showResults && quiz) {
    const results = finishQuiz()
    const accuracy = Math.round((results.correct / results.total) * 100)

    return (
      <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-1 flex-col items-center justify-center max-w-md mx-auto"
        >
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className={`text-6xl ${accuracy >= 80 ? 'text-green-500' : 'text-yellow-500'}`}>
                {accuracy >= 80 ? <CheckCircle /> : <XCircle />}
              </div>
              <div className="text-4xl font-bold">{accuracy}%</div>
              <div className="text-lg">
                {results.correct} out of {results.total} correct
              </div>
              <Progress 
                value={accuracy}
                className={`h-3 ${accuracy >= 80 ? 'bg-green-500' : accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button onClick={handleRestart} className="w-full">
                Try Again
              </Button>
              <Button variant="outline" onClick={() => setCurrentScreen("dashboard")} className="w-full">
                Back to Dashboard
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-1 flex-col max-w-md mx-auto gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Start a Quiz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Topic</label>
                <Select value={topic} onValueChange={(value: string | null) => value && setTopic(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
                    <SelectItem value="Alertness">Alertness</SelectItem>
                    <SelectItem value="Attitude">Attitude</SelectItem>
                    <SelectItem value="Safety and Your Vehicle">Safety and Your Vehicle</SelectItem>
                    <SelectItem value="Safety Margins">Safety Margins</SelectItem>
                    <SelectItem value="Hazard Awareness">Hazard Awareness</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <Select value={difficulty} onValueChange={(value: string | null) => value && setDifficulty(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => {
                if (questions.length > 0) {
                  startQuiz(topic, difficulty, questions)
                }
              }} className="w-full">
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const currentQuestion = quiz.queue[quiz.currentIndex]
  const progress = ((quiz.currentIndex + 1) / quiz.queue.length) * 100

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col max-w-2xl mx-auto gap-6"
      >
        {/* Progress */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span>Question {quiz.currentIndex + 1} of {quiz.queue.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} />
        </div>

        {/* Question Card */}
        <Card className={`flex-1 ${showExplanation ? 'animate-pulse-glow' : ''}`}>
          <CardHeader>
            <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {currentQuestion.options.map((option: string, index: number) => {
                const isSelected = quiz.answers[quiz.currentIndex]?.selectedIndex === index
                const isCorrect = index === currentQuestion.correctIndex
                const isWrong = isSelected && !isCorrect

                return (
                  <Button
                    key={index}
                    variant={showExplanation 
                      ? isCorrect 
                        ? "default"
                        : isWrong 
                          ? "destructive"
                          : "outline"
                      : "outline"}
                    className={`h-auto py-3 px-4 text-left justify-start transition-all ${
                      showExplanation && isCorrect ? "animate-pulse-glow bg-green-500 hover:bg-green-600" : ""
                    } ${showExplanation && isWrong ? "animate-shake bg-red-500 hover:bg-red-600" : ""}`}
                    onClick={() => !showExplanation && handleAnswer(index)}
                    disabled={showExplanation}
                  >
                    <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                )
              })}
            </div>

            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Explanation:</h4>
                    <p className="text-sm">{currentQuestion.explanation}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex justify-between">
            {quiz.currentIndex > 0 && (
              <Button variant="outline" onClick={() => {
                // Note: The store doesn't have a previous method
                // For now, we'll just disable the previous button
              }} disabled>
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}
            <Button onClick={handleNext} className="ml-auto">
              {quiz.currentIndex < quiz.queue.length - 1 ? "Next" : "Finish"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
