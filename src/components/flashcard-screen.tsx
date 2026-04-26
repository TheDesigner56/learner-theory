"use client"

import { useState, useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

export default function FlashcardScreen() {
  const { 
    flashcard, 
    flashcardState, 
    startFlashcards, 
    rateFlashcard,
    setCurrentScreen
  } = useAppStore()

  const [topicFilter, setTopicFilter] = useState("all")
  const [isFlipped, setIsFlipped] = useState(false)
  const [showAllCaughtUp, setShowAllCaughtUp] = useState(false)

  useEffect(() => {
    // Load flashcards with the filtered questions
    const loadCards = async () => {
      const response = await fetch('/api/questions')
      const questions = await response.json()
      const filtered = topicFilter === "all" ? questions : questions.filter((q: any) => q.topic === topicFilter)
      startFlashcards(filtered)
    }
    loadCards()
  }, [startFlashcards, topicFilter])

  useEffect(() => {
    if (flashcard && flashcard.queue.length === 0) {
      setShowAllCaughtUp(true)
    } else {
      setShowAllCaughtUp(false)
    }
  }, [flashcard])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleRate = (rating: number) => {
    if (flashcard && flashcard.current >= 0 && flashcard.queue.length > 0) {
      rateFlashcard(rating)
      // The store will automatically advance to next card
      setIsFlipped(false)
    }
  }

  const currentCard = flashcard?.queue[flashcard?.current]

  if (showAllCaughtUp) {
    return (
      <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-1 flex-col items-center justify-center max-w-md mx-auto"
        >
          <Card className="w-full text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">All Caught Up!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl">🎉</div>
              <p>You've reviewed all your flashcards for today.</p>
              <p className="text-sm text-muted-foreground">
                Great job! Come back tomorrow for more spaced repetition.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setCurrentScreen("dashboard")} className="w-full">
                Back to Dashboard
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (!currentCard) {
    return (
      <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-1 flex-col max-w-md mx-auto gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Flashcards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Topic Filter</label>
                <Select value={topicFilter} onValueChange={(value: string | null) => value && setTopicFilter(value)}>
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

              <p className="text-sm text-muted-foreground">
                Loading flashcards...
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col max-w-2xl mx-auto gap-6"
      >
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Select value={topicFilter} onValueChange={(value: string | null) => value && setTopicFilter(value)}>
            <SelectTrigger className="w-[180px]">
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

          <div className="text-sm text-muted-foreground">
            {flashcard?.current + 1} of {flashcard?.queue.length} cards remaining
          </div>
        </div>

        {/* Flashcard */}
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg text-center">{currentCard?.question.topic}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center p-6">
            <div className="card-3d w-full h-full" onClick={handleFlip}>
              <div className={`card-front w-full h-full p-6 bg-card border rounded-lg shadow-lg flex items-center justify-center ${isFlipped ? 'hidden' : 'block'}`}>
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full"
                >
                  <div className="w-full h-full flex items-center justify-center text-center p-4">
                    <h3 className="text-xl font-semibold mb-4">Question:</h3>
                    <p className="text-lg">{currentCard?.question.question}</p>
                  </div>
                </motion.div>
              </div>
              <div className={`card-back w-full h-full p-6 bg-card border rounded-lg shadow-lg flex items-center justify-center ${isFlipped ? 'block' : 'hidden'}`}>
                <motion.div
                  initial={{ rotateY: 180 }}
                  animate={{ rotateY: isFlipped ? 360 : 180 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                    <h3 className="text-xl font-semibold mb-2">Answer:</h3>
                    <p className="text-lg mb-4">{currentCard?.question.options[currentCard?.question.correctIndex]}</p>
                    <h4 className="text-sm font-medium mb-2">Explanation:</h4>
                    <p className="text-sm text-muted-foreground">{currentCard?.question.explanation}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2 w-full">
              <Button 
                variant="outline"
                onClick={() => handleRate(1)}
                className="flex-1 py-6 text-lg"
              >
                Again
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleRate(2)}
                className="flex-1 py-6 text-lg"
              >
                Hard
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleRate(3)}
                className="flex-1 py-6 text-lg"
              >
                Good
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleRate(5)}
                className="flex-1 py-6 text-lg"
              >
                Easy
              </Button>
            </div>

            <div className="flex justify-center gap-2 w-full">
              <Button variant="ghost" size="icon" onClick={handleFlip}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
