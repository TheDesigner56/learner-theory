"use client"

import { useState, useEffect, useRef } from "react"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { PlayCircle, PauseCircle, Flag, CheckCircle } from "lucide-react"

export default function HazardPerception() {
  const { 
    hazardSession, 
    startHazardTest, 
    recordHazardClick, 
    setCurrentScreen
  } = useAppStore()

  const [showIntro, setShowIntro] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [feedbackScore, setFeedbackScore] = useState(0)

  const videoRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (isPlaying && hazardSession) {
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        setCurrentTime(elapsed)
        animationRef.current = requestAnimationFrame(animate)
      }
      animationRef.current = requestAnimationFrame(animate)
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [isPlaying, hazardSession])

  const handleStart = () => {
    startHazardTest()
    setShowIntro(false)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!hazardSession || !isPlaying) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const clickTime = currentTime

    // Create ripple effect
    const ripple = document.createElement("div")
    ripple.className = "ripple"
    ripple.style.left = `${x}px`
    ripple.style.top = `${e.clientY - rect.top}px`
    videoRef.current?.appendChild(ripple)
    
    // Record the click
    recordHazardClick(clickTime)
    
    // Show immediate feedback
    const clip = hazardSession.clips[hazardSession.currentClip]
    if (clickTime >= clip.hazardStart && clickTime <= clip.hazardEnd) {
      const timeFromStart = clickTime - clip.hazardStart
      const maxPossible = clip.maxScore
      const score = Math.max(0, maxPossible - (timeFromStart / 200))
      setFeedbackScore(Math.round(score))
      setFeedbackMessage(`Good timing! +${Math.round(score)} points`)
    } else if (clickTime < clip.hazardStart) {
      setFeedbackScore(0)
      setFeedbackMessage("Too early - hazard hasn't developed yet")
    } else {
      setFeedbackScore(0)
      setFeedbackMessage("Too late - hazard has passed")
    }
    setShowFeedback(true)
    
    setTimeout(() => setShowFeedback(false), 2000)
  }

  const handleFinishClip = () => {
    if (!hazardSession) return
    
    if (hazardSession.currentClip < hazardSession.clips.length - 1) {
      // Move to next clip
      setIsPlaying(false)
      setCurrentTime(0)
      setTimeout(() => setIsPlaying(true), 1000)
    } else {
      // Test complete
      setShowResults(true)
    }
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (showIntro) {
    return (
      <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-1 flex-col items-center justify-center max-w-2xl mx-auto"
        >
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Hazard Perception Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">How it works:</h3>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  <li>You'll watch 3 video clips of driving scenarios</li>
                  <li>Click when you see a hazard developing</li>
                  <li>The earlier you spot the hazard, the higher your score</li>
                  <li>Maximum score per clip: 5 points</li>
                  <li>Pass mark: 44 out of 75 (59%)</li>
                </ol>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Tips:</h3>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Don't click too early - wait for the hazard to develop</li>
                  <li>Don't click too late - you'll get lower scores</li>
                  <li>Don't click repeatedly - the system detects cheating</li>
                  <li>Focus on the road ahead and scan for potential hazards</li>
                </ul>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>This is a simplified simulation. The real test uses actual video footage.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleStart} className="w-full">
                Start Practice
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (showResults && hazardSession) {
    const totalScore = hazardSession.scores.reduce((sum, score) => sum + (score || 0), 0)
    const maxScore = hazardSession.clips.reduce((sum, clip) => sum + clip.maxScore, 0)
    const percentage = Math.round((totalScore / maxScore) * 100)
    const passed = percentage >= 59

    return (
      <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-1 flex-col items-center justify-center max-w-md mx-auto"
        >
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                {passed ? "Great Job!" : "Test Complete"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className={`text-6xl ${passed ? 'text-green-500' : 'text-yellow-500'}`}>
                <CheckCircle />
              </div>
              <div className="text-4xl font-bold">{totalScore}/{maxScore}</div>
              <div className="text-lg">Score: {percentage}%</div>
              <Progress 
                value={percentage}
                className={`h-3 ${passed ? 'bg-green-500' : 'bg-yellow-500'}`}
              />
              <div className={`font-medium ${passed ? 'text-green-600' : 'text-yellow-600'}`}>
                {passed ? "Pass - Well done!" : "Keep practicing - you're close!"}
              </div>

              <div className="text-left space-y-2">
                <h4 className="font-semibold">Clip Scores:</h4>
                {hazardSession.clips.map((clip, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm">{clip.title}:</span>
                    <span className={`font-medium ${hazardSession.scores[index] >= 3 ? 'text-green-600' : 'text-red-600'}`}>
                      {hazardSession.scores[index] || 0}/{clip.maxScore}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button onClick={() => setCurrentScreen("dashboard")} className="w-full">
                Back to Dashboard
              </Button>
              <Button variant="outline" onClick={() => setShowIntro(true)} className="w-full">
                Try Again
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (!hazardSession) {
    return (
      <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-1 flex-col max-w-md mx-auto gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Loading Hazard Test...</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">Preparing hazard clips...</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const currentClip = hazardSession.clips[hazardSession.currentClip]
  const progress = (currentTime / currentClip.duration) * 100

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col max-w-4xl mx-auto gap-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{currentClip.title}</h2>
            <p className="text-sm text-muted-foreground">{currentClip.description}</p>
          </div>
          <div className="text-right">
            <div className="font-medium">Clip {hazardSession.currentClip + 1} of {hazardSession.clips.length}</div>
            <div className="text-sm text-muted-foreground">
              {formatTime(currentTime)} / {formatTime(currentClip.duration)}
            </div>
          </div>
        </div>

        <Progress value={progress} />

        {/* Video Area */}
        <Card className="flex-1 bg-muted">
          <CardHeader>
            <CardTitle className="text-lg">Click when you see a hazard developing</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 relative overflow-hidden">
            <div
              ref={videoRef}
              className="w-full h-96 bg-gradient-to-b from-gray-200 to-gray-400 relative cursor-crosshair"
              onClick={handleClick}
            >
              {/* Animated road */}
              <div className="absolute inset-0 hazard-road bg-[linear-gradient(to_bottom,#374151_0%,#6b7280_50%,#374151_100%)]" />

              {/* Hazard elements */}
              {currentClip.elements.map((element, index) => {
                const isVisible = currentTime >= element.start && currentTime <= element.end
                if (!isVisible) return null

                return (
                  <div 
                    key={index}
                    className={`${element.css} ${isVisible ? 'block' : 'hidden'}`}
                    style={{
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 60 + 20}%`
                    }}
                  />
                )
              })}

              {/* Click instruction */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Button 
                    size="lg"
                    onClick={() => setIsPlaying(true)}
                    className="bg-white/20 hover:bg-white/30 text-white border-white"
                  >
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Play Clip
                  </Button>
                </div>
              )}

              {/* Pause overlay */}
              {isPlaying && (
                <Button
                  size="icon"
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
                  onClick={() => setIsPlaying(false)}
                >
                  <PauseCircle className="h-6 w-6" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <Card className={`border-${feedbackScore > 0 ? 'green' : 'red'}-500`}>
                <CardContent className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {feedbackScore > 0 ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <Flag className="text-red-500" />
                    )}
                    <span className="font-medium">{feedbackMessage}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <PauseCircle className="mr-2 h-4 w-4" /> : <PlayCircle className="mr-2 h-4 w-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button 
            onClick={handleFinishClip}
            disabled={currentTime < currentClip.duration}
          >
            Next Clip
          </Button>
        </CardFooter>
      </motion.div>
    </div>
  )
}
