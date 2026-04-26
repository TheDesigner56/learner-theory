"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const features = [
  "Unlimited mock tests",
  "Ad-free experience",
  "Advanced analytics",
  "Priority support",
]

interface PremiumModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PremiumModal({ open, onOpenChange }: PremiumModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Unlock Premium Features</DialogTitle>
          <DialogDescription>
            Supercharge your learning with premium access.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {/* Monthly */}
          <div className="flex flex-col rounded-xl border p-4">
            <div className="mb-2 text-sm font-medium text-muted-foreground">
              Monthly
            </div>
            <div className="mb-4 flex items-baseline gap-1">
              <span className="text-3xl font-bold">£4.99</span>
              <span className="text-sm text-muted-foreground">/mo</span>
            </div>
            <ul className="mb-4 flex flex-1 flex-col gap-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Check className="size-4 text-green-500" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full">
              Choose Monthly
            </Button>
          </div>

          {/* Annual */}
          <div className="relative flex flex-col rounded-xl border p-4 ring-1 ring-primary/20">
            <Badge
              variant="default"
              className="absolute -top-2 left-1/2 -translate-x-1/2"
            >
              Best Value
            </Badge>
            <div className="mb-2 text-sm font-medium text-muted-foreground">
              Annual
            </div>
            <div className="mb-4 flex items-baseline gap-1">
              <span className="text-3xl font-bold">£29.99</span>
              <span className="text-sm text-muted-foreground">/yr</span>
            </div>
            <ul className="mb-4 flex flex-1 flex-col gap-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Check className="size-4 text-green-500" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full">Choose Annual</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
