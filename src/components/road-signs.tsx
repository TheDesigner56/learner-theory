"use client"

import { useState } from "react"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { motion } from "framer-motion"

export default function RoadSigns() {
  const { roadSigns } = useAppStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedSign, setSelectedSign] = useState<typeof roadSigns[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const categories = [
    "all",
    "prohibitory",
    "warning",
    "mandatory",
    "information",
    "direction"
  ]

  const filteredSigns = roadSigns.filter(sign => {
    const matchesCategory = activeCategory === "all" || sign.category === activeCategory
    const matchesSearch = sign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sign.meaning.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const openSignDetail = (sign: typeof roadSigns[0]) => {
    setSelectedSign(sign)
    setIsDialogOpen(true)
  }

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-1 flex-col gap-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">UK Road Signs</h1>
          <Input
            placeholder="Search signs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full">
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-4">
            {filteredSigns.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground">No signs found matching your criteria</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSigns.map((sign) => (
                  <Card 
                    key={sign.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openSignDetail(sign)}
                  >
                    <CardHeader className="p-4">
                      <div 
                        className="flex items-center justify-center h-32"
                        dangerouslySetInnerHTML={{ __html: sign.svg }}
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-sm font-medium mb-1">{sign.name}</CardTitle>
                      <CardDescription className="text-xs line-clamp-2">
                        {sign.meaning}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            {selectedSign && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedSign.name}</DialogTitle>
                  <DialogDescription className="capitalize">
                    {selectedSign.category} sign
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                  <div 
                    className="h-48 w-full flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: selectedSign.svg }}
                  />
                  <div className="space-y-2 text-sm">
                    <p><strong>Meaning:</strong> {selectedSign.meaning}</p>
                    <p><strong>Penalty:</strong> {selectedSign.penalty}</p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  )
}
