"use client"

import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import { AlertTriangle, Star, BookOpen, Target } from "lucide-react"

export default function WeakAreas() {
  const { stats, topicConfidence, setTopicConfidence, setCurrentScreen } = useAppStore()

  // Calculate accuracy for each topic
  const topicData = Object.entries(stats.topicStats).map(([topic, stat]) => {
    const accuracy = stat.answered > 0 ? (stat.correct / stat.answered) * 100 : 0
    const confidence = topicConfidence[topic] || 50
    return { topic, accuracy, confidence, answered: stat.answered }
  })

  // Sort by weakest areas (lowest accuracy)
  const sortedTopics = [...topicData].sort((a, b) => a.accuracy - b.accuracy)

  // Find top 3 weakest areas
  const weakestAreas = sortedTopics.slice(0, 3)
  const strongestAreas = [...sortedTopics].sort((a, b) => b.accuracy - a.accuracy).slice(0, 3)

  const handleConfidenceChange = (topic: string, value: number | readonly number[]) => {
    const v = Array.isArray(value) ? value[0] : value
    setTopicConfidence(topic, v)
  }

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col gap-6"
      >
        <div>
          <h1 className="text-2xl font-bold">Weak Areas Analysis</h1>
          <p className="text-muted-foreground">Focus your study on topics that need improvement</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Weakest Areas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{weakestAreas.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Topics below 60% accuracy</p>
              <div className="mt-3 space-y-1 text-sm">
                {weakestAreas.map(area => (
                  <div key={area.topic} className="flex justify-between">
                    <span className="truncate max-w-[120px]">{area.topic}</span>
                    <span className="font-medium">{Math.round(area.accuracy)}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Needs Work</CardTitle>
              <BookOpen className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {sortedTopics.filter(t => t.accuracy >= 60 && t.accuracy < 80).length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Topics 60-80% accuracy</p>
              <div className="mt-3 space-y-1 text-sm">
                {sortedTopics.filter(t => t.accuracy >= 60 && t.accuracy < 80).slice(0, 3).map(area => (
                  <div key={area.topic} className="flex justify-between">
                    <span className="truncate max-w-[120px]">{area.topic}</span>
                    <span className="font-medium">{Math.round(area.accuracy)}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Strong Areas</CardTitle>
              <Star className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{strongestAreas.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Topics above 80% accuracy</p>
              <div className="mt-3 space-y-1 text-sm">
                {strongestAreas.map(area => (
                  <div key={area.topic} className="flex justify-between">
                    <span className="truncate max-w-[120px]">{area.topic}</span>
                    <span className="font-medium">{Math.round(area.accuracy)}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Focus Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Focus Recommendations</CardTitle>
            <CardDescription>Prioritize these topics in your study sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {weakestAreas.length > 0 ? (
              <ol className="space-y-4">
                {weakestAreas.map((area, index) => (
                  <li key={area.topic} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{index + 1}. {area.topic}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${area.accuracy < 40 ? 'bg-red-100 text-red-600' : area.accuracy < 60 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                          {Math.round(area.accuracy)}% accuracy
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {area.answered} questions answered, {area.answered - Math.round(area.answered * (area.accuracy / 100))} incorrect
                      </p>
                    </div>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        // TODO: Navigate to quiz with this topic
                        setCurrentScreen("quiz")
                      }}
                    >
                      Practice Now
                    </Button>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Great job! You don't have any weak areas below 60% accuracy. 
                Keep practicing to maintain your strong performance!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Detailed Topic Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Topic Breakdown</CardTitle>
            <CardDescription>All topics with accuracy and confidence levels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sortedTopics.map((topic) => (
              <Card key={topic.topic} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium">{topic.topic}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">
                            Accuracy: {Math.round(topic.accuracy)}% ({topic.answered} questions)
                          </p>
                          <Progress 
                            value={topic.accuracy}
                            className={`mt-1 h-2 ${topic.accuracy >= 80 ? 'bg-green-500' : topic.accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-48">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">Confidence</label>
                        <span className="text-sm font-medium">{topic.confidence}%</span>
                      </div>
                      <Slider
                        value={[topic.confidence]}
                        onValueChange={((value: number | readonly number[]) => handleConfidenceChange(topic.topic, value)) as any}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Study Strategy */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Study Strategy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>Focus First:</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                Spend 70% of your study time on weak areas, 20% on medium areas, and 10% on strong areas.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Study Methods:</span>
              </h4>
              <ul className="space-y-1 text-sm list-disc list-inside text-muted-foreground">
                <li>Use flashcards for spaced repetition on weak topics</li>
                <li>Take focused quizzes on specific weak areas</li>
                <li>Review explanations carefully for incorrect answers</li>
                <li>Use the "Weak Areas" filter in flashcards and quizzes</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Confidence Building:</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                Adjust the confidence slider as you improve. When accuracy and confidence both reach 80%+, 
                the topic moves from weak to strong.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
