"use client"

import { useEffect, useState } from "react"
import { useAppStore } from "@/lib/store"
import { THEORY_QUESTIONS } from "@/data/questions"
import { ROAD_SIGNS } from "@/data/signs"
import { PageWrapper } from "@/components/page-wrapper"
import { Skeleton } from "@/components/ui/skeleton"
import Dashboard from "@/components/dashboard"
import QuizScreen from "@/components/quiz-screen"
import FlashcardScreen from "@/components/flashcard-screen"
import MockTest from "@/components/mock-test"
import HazardPerception from "@/components/hazard-perception"
import RoadSigns from "@/components/road-signs"
import StudyPlan from "@/components/study-plan"
import WeakAreas from "@/components/weak-areas"
import Settings from "@/components/settings"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const currentScreen = useAppStore((state: any) => state.currentScreen)
  const setCurrentScreen = useAppStore((state: any) => state.setCurrentScreen)

  useEffect(() => {
    // No need to initialize store - it's already set up
    setLoading(false)
  }, [])

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <Dashboard />
      case "quiz":
        return <QuizScreen />
      case "flashcards":
        return <FlashcardScreen />
      case "mock-test":
        return <MockTest />
      case "hazard-perception":
        return <HazardPerception />
      case "road-signs":
        return <RoadSigns />
      case "study-plan":
        return <StudyPlan />
      case "weak-areas":
        return <WeakAreas />
      case "settings":
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex flex-1 flex-col items-center justify-center p-8">
          <div className="w-full max-w-4xl space-y-4">
            <Skeleton className="h-8 w-[200px]" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Skeleton className="h-[120px] w-full" />
              <Skeleton className="h-[120px] w-full" />
              <Skeleton className="h-[120px] w-full" />
              <Skeleton className="h-[120px] w-full" />
            </div>
            <Skeleton className="h-[200px] w-full" />
          </div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col overflow-hidden">
        {renderScreen()}
      </div>
    </PageWrapper>
  )
}
