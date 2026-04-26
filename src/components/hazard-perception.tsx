"use client"

import { useState, useEffect, useRef } from "react"
import { useAppStore } from "@/lib/store"
import { HAZARD_CLIPS } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Timer, Star, Home } from "lucide-react"

export default function HazardPerception() {
  const { hazard, startHazard, clickHazard, nextHazardClip, finishHazard, setCurrentScreen } = useAppStore()
  const [showIntro, setShowIntro] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [lastScore, setLastScore] = useState<number | null>(null)
  const [fadeKey, setFadeKey] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const clipIdx = hazard?.currentClip ?? 0
  const clip = HAZARD_CLIPS[clipIdx] ?? HAZARD_CLIPS[0]
  const isLastClip = clipIdx >= HAZARD_CLIPS.length - 1

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setElapsed((e) => e + 100)
      }, 100)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [playing])

  // Auto-stop at clip duration
  useEffect(() => {
    if (playing && clip && elapsed >= clip.duration) {
      setPlaying(false)
    }
  }, [elapsed, playing, clip])

  const handlePlay = () => {
    if (!hazard) startHazard()
    setElapsed(0)
    setPlaying(true)
    setLastScore(null)
    setShowIntro(false)
  }

  const handleClick = () => {
    if (!playing || !hazard) return
    const score = clickHazard(elapsed, clip)
    setLastScore(score)
    setFadeKey((k) => k + 1)
  }

  const handleNext = () => {
    if (isLastClip) {
      setPlaying(false)
      finishHazard()
    } else {
      nextHazardClip()
      setElapsed(0)
      setLastScore(null)
      setPlaying(false)
      setShowIntro(true)
    }
  }

  if (!hazard && !showIntro) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md text-center p-8">
          <CardContent>
            <p className="text-muted-foreground mb-4">No hazard perception session active.</p>
            <Button onClick={handlePlay}><Play className="mr-2 h-4 w-4" /> Start</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Results screen
  if (hazard && hazard.currentClip >= HAZARD_CLIPS.length && !playing) {
    const total = hazard.scores.reduce((a, b) => a + b, 0)
    const max = HAZARD_CLIPS.reduce((a, c) => a + c.maxScore, 0)
    const pct = max > 0 ? Math.round((total / max) * 100) : 0
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg mx-auto">
        <Card>
          <CardHeader><CardTitle>Hazard Perception Complete</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">{total}/{max}</div>
              <Badge variant={pct >= 60 ? "default" : "destructive"}>{pct}%</Badge>
              <p className="text-muted-foreground mt-2">{pct >= 60 ? "Good effort!" : "Keep practising."}</p>
            </div>
            <div className="space-y-2">
              {HAZARD_CLIPS.map((c, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm">{c.title}</span>
                  <span className="font-medium">{hazard.scores[i] ?? 0}/{c.maxScore}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => setCurrentScreen("dashboard")}><Home className="mr-2 h-4 w-4" /> Dashboard</Button>
          </CardFooter>
        </Card>
      </motion.div>
    )
  }

  // Intro screen
  if (showIntro) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Hazard Perception</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
              <p>You will watch {HAZARD_CLIPS.length} video clips of everyday road scenes.</p>
              <p>Click when you see a <strong>developing hazard</strong> that may cause you to change speed or direction.</p>
              <p>Score up to 5 points per hazard. Click earlier = more points.</p>
              <p className="font-medium text-primary">Pass mark: 44 out of 75</p>
            </div>
            <p className="text-sm text-muted-foreground">Clip {clipIdx + 1} of {HAZARD_CLIPS.length}: <strong>{clip.title}</strong></p>
            <p className="text-xs text-muted-foreground">{clip.description}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handlePlay}><Play className="mr-2 h-4 w-4" /> Start Clip</Button>
          </CardFooter>
        </Card>
      </motion.div>
    )
  }

  // Active scene
  const progress = clip ? Math.min(elapsed / clip.duration * 100, 100) : 0
  const hazardProgress = clip ? Math.max(0, Math.min((elapsed - clip.hazardStart) / (clip.hazardEnd - clip.hazardStart) * 100, 100)) : 0

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Card>
        <CardContent className="p-0">
          {/* Road scene */}
          <div className="relative w-full aspect-video bg-gradient-to-b from-sky-400 via-sky-300 to-green-800 overflow-hidden cursor-crosshair" onClick={handleClick}>
            {/* Sky */}
            <div className="absolute inset-0" />
            {/* Road */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-zinc-700">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-zinc-500" />
              {[0,1,2,3,4,5,6,7,8,9].map((i) => (
                <div key={i} className="absolute top-1/2 w-8 h-[3px] bg-white"
                  style={{ left: `${(i * 60 + 10 + elapsed / 30) % 600}px`, transform: "translateY(-50%)" }} />
              ))}
              {/* Car */}
              <div className="absolute bottom-4 left-16 w-20 h-10 bg-red-600 rounded-lg z-10">
                <div className="absolute top-[-4px] left-2 w-4 h-4 bg-sky-300 rounded-sm" />
                <div className="absolute top-[-4px] right-2 w-4 h-4 bg-sky-300 rounded-sm" />
              </div>
              {/* Hazard elements */}
              <AnimatePresence mode="wait">
                {elapsed >= (clip?.hazardStart ?? 0) - 500 && (
                  <motion.div initial={{ x: 300 }} animate={{ x: 50 }} transition={{ duration: 2, ease: "linear" }}
                    className="absolute bottom-4 right-0 w-16 h-10 bg-blue-700 rounded-lg z-20">
                    <div className="absolute top-[-4px] left-2 w-4 h-4 bg-sky-300 rounded-sm" />
                    <div className="absolute top-[-4px] right-2 w-4 h-4 bg-sky-300 rounded-sm" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Click feedback */}
            <AnimatePresence>
              {lastScore !== null && (
                <motion.div key={fadeKey} initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 0, scale: 1.5, y: -30 }} exit={{ opacity: 0 }}
                  className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-30">
                  <div className={`flex flex-col items-center ${lastScore > 0 ? "text-green-400" : "text-red-400"}`}>
                    <Star className={`w-6 h-6 ${lastScore > 0 ? "fill-green-400" : ""}`} />
                    <span className="text-lg font-bold">{lastScore > 0 ? `+${lastScore}` : "Miss"}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Hazard zone indicator */}
            {elapsed >= (clip?.hazardStart ?? 0) && elapsed <= (clip?.hazardEnd ?? 0) && (
              <div className="absolute top-2 right-2 z-30">
                <Badge variant="destructive" className="animate-pulse">Hazard Developing</Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              <span>{Math.floor(elapsed / 1000)}s / {clip ? Math.floor(clip.duration / 1000) : 0}s</span>
            </div>
            <span className="font-medium">Clip {clipIdx + 1} of {HAZARD_CLIPS.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
          {/* Hazard timeline */}
          {clip && (
            <div className="relative h-4 bg-muted rounded-full overflow-hidden">
              <div className="absolute inset-0 flex items-center">
                <div className="h-full bg-amber-400/50 rounded-full" style={{ left: `${(clip.hazardStart / clip.duration) * 100}%`, width: `${((clip.hazardEnd - clip.hazardStart) / clip.duration) * 100}%`, position: "absolute" }} />
              </div>
              <div className="absolute top-0 left-0 h-full bg-primary/30 transition-all duration-100" style={{ width: `${hazardProgress}%` }} />
            </div>
          )}
          <div className="flex gap-2">
            {!playing ? (
              <Button className="flex-1" onClick={handlePlay}><Play className="mr-2 h-4 w-4" /> {elapsed > 0 ? "Replay" : "Start"}</Button>
            ) : (
              <Button className="flex-1" onClick={() => setPlaying(false)} variant="outline">Stop</Button>
            )}
            <Button onClick={handleNext} variant="outline" className="flex-1">{isLastClip ? "Finish" : "Next Clip"}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Feedback toast */}
      <AnimatePresence>
        {lastScore !== null && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium z-50 ${lastScore > 0 ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
            {lastScore > 0 ? `+${lastScore} points` : "No hazard detected"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
