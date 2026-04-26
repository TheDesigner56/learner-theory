"use client"

import { useState, useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"

export default function StudyPlan() {
  const { user, stats, updateUser } = useAppStore()
  const [testDate, setTestDate] = useState<Date | undefined>(user.testDate ? new Date(user.testDate) : undefined)
  const [dailyGoal, setDailyGoal] = useState(20)
  const [studyPlan, setStudyPlan] = useState<any[]>([])

  useEffect(() => {
    if (testDate) {
      generateStudyPlan()
    }
  }, [testDate, stats])

  const generateStudyPlan = () => {
    if (!testDate) return
    
    const today = new Date()
    const daysUntilTest = Math.ceil((testDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    const totalQuestions = 78 // Total questions in the database
    
    if (daysUntilTest <= 0) {
      setStudyPlan([])
      return
    }
    
    const plan = []
    const questionsPerDay = Math.ceil(totalQuestions / daysUntilTest)
    
    for (let i = 0; i < daysUntilTest && i < 30; i++) {
      const day = new Date(today)
      day.setDate(today.getDate() + i)
      
      plan.push({
        date: day,
        dayOfWeek: day.toLocaleDateString('en-US', { weekday: 'short' }),
        questionsGoal: questionsPerDay,
        questionsCompleted: Math.min(questionsPerDay, stats.totalAnswered),
        topics: getDailyTopics(i, daysUntilTest)
      })
    }
    
    setStudyPlan(plan)
  }

  const getDailyTopics = (dayIndex: number, totalDays: number) => {
    const allTopics = [
      "Alertness", "Attitude", "Safety and Your Vehicle", "Safety Margins",
      "Hazard Awareness", "Motorway Rules", "Rules of the Road", "Road and Traffic Signs",
      "Documents", "Incidents, Accidents and Emergencies", "Vehicle Handling", "Motorway Driving"
    ]
    
    const topicsPerDay = Math.ceil(allTopics.length / totalDays)
    const startIndex = dayIndex * topicsPerDay
    return allTopics.slice(startIndex, startIndex + topicsPerDay)
  }

  const handleSaveTestDate = () => {
    if (testDate) {
      updateUser({ testDate: testDate.toISOString() })
    }
  }

  const daysUntilTest = testDate 
    ? Math.ceil((testDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col gap-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Study Plan</h1>
            <p className="text-muted-foreground">Create your personalized study schedule</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Test Date</CardTitle>
            <CardDescription>
              Set your theory test date to generate a study plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${!testDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {testDate ? format(testDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar 
                      mode="single"
                      selected={testDate}
                      onSelect={setTestDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button 
                onClick={handleSaveTestDate}
                disabled={!testDate}
                className="w-full sm:w-auto"
              >
                Save Test Date
              </Button>
            </div>

            {daysUntilTest !== null && (
              <div className={`p-3 rounded-lg ${daysUntilTest > 30 ? 'bg-green-50' : daysUntilTest > 7 ? 'bg-yellow-50' : 'bg-red-50'}`}>
                <p className={`font-medium ${daysUntilTest > 30 ? 'text-green-700' : daysUntilTest > 7 ? 'text-yellow-700' : 'text-red-700'}`}>
                  {daysUntilTest} day{daysUntilTest !== 1 ? "s" : ""} until your test
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {daysUntilTest > 30 ? "Plenty of time to prepare!" : 
                   daysUntilTest > 7 ? "Focus on weak areas!" : "Final review time!"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {testDate && studyPlan.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Study Plan</CardTitle>
              <CardDescription>
                {studyPlan.length} day{studyPlan.length !== 1 ? "s" : ""} study schedule
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {studyPlan.map((day, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <p className="font-medium">{day.dayOfWeek}, {format(day.date, "MMM do")}</p>
                          <p className="text-sm text-muted-foreground">Day {index + 1}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{day.questionsCompleted}/{day.questionsGoal} questions</p>
                          <Progress 
                            value={(day.questionsCompleted / day.questionsGoal) * 100}
                            className="mt-2 h-2"
                          />
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {day.topics.map((topic: string) => (
                          <span key={topic} className="px-2 py-1 bg-muted rounded-full text-xs">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Study Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Daily Routine:</h4>
              <ul className="space-y-1 text-sm list-disc list-inside text-muted-foreground">
                <li>20-30 minutes of flashcards (morning)</li>
                <li>1-2 quiz sessions (lunch break)</li>
                <li>1 mock test (evening, 2-3 times per week)</li>
                <li>Review road signs daily</li>
                <li>Practice hazard perception 2-3 times per week</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Week Before Test:</h4>
              <ul className="space-y-1 text-sm list-disc list-inside text-muted-foreground">
                <li>Take 3-5 full mock tests</li>
                <li>Focus on weakest topics</li>
                <li>Review all road signs and meanings</li>
                <li>Practice hazard perception daily</li>
                <li>Get plenty of rest before test day</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h4 className="font-semibold">Pro Tip:</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  The key to passing is consistent daily practice. Even 15-20 minutes daily 
                  is more effective than cramming the night before!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
