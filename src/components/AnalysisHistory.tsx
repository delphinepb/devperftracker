"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Clock } from "lucide-react"

type BadgeVariant = "default" | "secondary" | "destructive"

interface HistoryItem {
  id: number
  url: string
  score: number
  date: string
  time: string
}

interface AnalysisHistoryProps {
  history: HistoryItem[]
  onSelectAnalysis: (id: number) => void
  getScoreBadgeVariant: (score: number) => BadgeVariant
}

export default function AnalysisHistory({
  history,
  onSelectAnalysis,
  getScoreBadgeVariant
}: AnalysisHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Historique des analyses
        </CardTitle>
        <CardDescription>Consultez vos analyses précédentes</CardDescription>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <p className="text-center text-gray-500">Aucune analyse disponible.</p>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="font-medium text-sm">{item.url}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(item.date).toLocaleDateString()} à {new Date(item.date).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getScoreBadgeVariant(item.score)}>{item.score}</Badge>
                  <Button variant="ghost" size="sm" onClick={() => onSelectAnalysis(item.id)}>
                    Voir détails
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
