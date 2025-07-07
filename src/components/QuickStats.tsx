import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface QuickStatsProps {
  totalSites: number
  averageScore: number
  bestScore: number
  analysesToday: number
}

export default function QuickStats({ totalSites, averageScore, bestScore, analysesToday }: QuickStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques rapides</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Sites analysés</span>
            <span className="font-semibold">{totalSites}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Score moyen</span>
            <span className="font-semibold text-green-600">{averageScore.toFixed(1)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Meilleur score</span>
            <span className="font-semibold text-green-600">{bestScore}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Analyses aujourd'hui</span>
            <span className="font-semibold">{analysesToday}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
