import * as React from "react"

import { cn } from "@/lib/utils"

interface DonutChartProps {
  correct: number
  wrong: number
  unanswered: number
  total: number
  className?: string
}

export function DonutChart({
  correct,
  wrong,
  unanswered,
  total,
  className,
}: DonutChartProps) {
  const radius = 40
  const circumference = 2 * Math.PI * radius

  const correctPercent = total > 0 ? correct / total : 0
  const wrongPercent = total > 0 ? wrong / total : 0
  const unansweredPercent = total > 0 ? unanswered / total : 0

  const correctOffset = circumference * (1 - correctPercent)
  const wrongOffset = circumference * (1 - wrongPercent)
  const unansweredOffset = circumference * (1 - unansweredPercent)

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 100 100"
        className="size-full -rotate-90"
        role="img"
        aria-label={`Score: ${percentage}%`}
      >
        {/* Background ring */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          className="text-gray-300 dark:text-gray-700"
        />

        {/* Wrong segment */}
        {wrong > 0 && (
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={wrongOffset}
            className="text-red-500"
            style={{
              transformOrigin: "center",
              transform: `rotate(${correctPercent * 360}deg)`,
            }}
          />
        )}

        {/* Unanswered segment */}
        {unanswered > 0 && (
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={unansweredOffset}
            className="text-gray-300 dark:text-gray-600"
            style={{
              transformOrigin: "center",
              transform: `rotate(${(correctPercent + wrongPercent) * 360}deg)`,
            }}
          />
        )}

        {/* Correct segment */}
        {correct > 0 && (
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={correctOffset}
            className="text-green-500"
          />
        )}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-foreground">{percentage}%</span>
      </div>
    </div>
  )
}
