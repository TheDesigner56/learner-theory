"use client"

import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon, Moon, Sun, Monitor, Trash2 } from "lucide-react"
import { format } from "date-fns"

export default function Settings() {
  const { 
    user, 
    stats, 
    setUser, 
    resetAll, 
    setCurrentScreen,
    premium
  } = useAppStore()

  const [name, setName] = useState(user.name || "")
  const [testDate, setTestDate] = useState<Date | undefined>(user.testDate ? new Date(user.testDate) : undefined)
  const [theme, setTheme] = useState(user.theme || "auto")
  const [showResetDialog, setShowResetDialog] = useState(false)

  const handleSave = () => {
    setUser({
      name,
      testDate: testDate ? testDate.toISOString() : "",
      theme
    })
  }

  const handleResetConfirm = () => {
    resetAll()
    setShowResetDialog(false)
  }

  const daysUntilTest = testDate 
    ? Math.ceil((testDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col gap-6 max-w-2xl mx-auto"
      >
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure your profile and preferences</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label>Test Date</Label>
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
              {daysUntilTest !== null && (
                <p className={`text-sm ${daysUntilTest > 30 ? 'text-green-600' : daysUntilTest > 7 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {daysUntilTest} day{daysUntilTest !== 1 ? "s" : ""} until your test
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Appearance</CardTitle>
            <CardDescription>Choose how the app looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <div className="flex gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                  className="flex-1"
                >
                  <Sun className="mr-2 h-4 w-4" /> Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className="flex-1"
                >
                  <Moon className="mr-2 h-4 w-4" /> Dark
                </Button>
                <Button
                  variant={theme === "auto" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("auto")}
                  className="flex-1"
                >
                  <Monitor className="mr-2 h-4 w-4" /> System
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progress</CardTitle>
            <CardDescription>Your study statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Questions Answered</p>
                <p className="text-2xl font-bold">{stats.totalAnswered}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-2xl font-bold driving-primary">
                  {stats.totalAnswered > 0 
                    ? Math.round((stats.correctCount / stats.totalAnswered) * 100)
                    : 0}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quizzes Completed</p>
                <p className="text-2xl font-bold">{stats.quizzesCompleted}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Study Streak</p>
                <p className="text-2xl font-bold">{stats.streakDays} day{stats.streakDays !== 1 ? "s" : ""}</p>
              </div>
            </div>

            <Button 
              variant="outline"
              className="w-full mt-4"
              onClick={() => setShowResetDialog(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Reset All Progress
            </Button>
          </CardContent>
        </Card>

        {!premium.isPremium && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span>Premium Features</span>
              </CardTitle>
              <CardDescription>
                Unlock additional features and remove limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm">Unlimited mock tests</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm">Advanced progress analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm">Custom study plans</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm">Priority support</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                You have {premium.quizzesUntilUpsell} free quizzes remaining
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                Upgrade to Premium
              </Button>
            </CardFooter>
          </Card>
        )}

        <CardFooter className="flex flex-col gap-3">
          <Button onClick={handleSave} className="w-full">
            Save Settings
          </Button>
          <Button variant="outline" onClick={() => setCurrentScreen("dashboard")} className="w-full">
            Back to Dashboard
          </Button>
        </CardFooter>

        <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset All Progress</DialogTitle>
              <DialogDescription>
                This will permanently delete all your study data, statistics, and progress.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <Button variant="outline" onClick={() => setShowResetDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleResetConfirm}>
                <Trash2 className="mr-2 h-4 w-4" />
                Reset Everything
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  )
}

function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
