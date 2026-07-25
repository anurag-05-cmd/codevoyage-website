"use client"

import { useState, useEffect } from "react"

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-09-20T10:00:00").getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 sm:p-6 min-w-[80px] sm:min-w-[100px]">
            <div className="text-2xl sm:text-4xl font-mono font-bold text-gradient">
              {value.toString().padStart(2, "0")}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mt-1">{unit}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
