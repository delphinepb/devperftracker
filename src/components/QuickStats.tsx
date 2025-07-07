import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function QuickStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques rapides</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Sites analysés</span>
            <span className="font-semibold">24</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Score moyen</span>
            <span className="font-semibold text-green-600">87.5</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Meilleur score</span>
            <span className="font-semibold text-green-600">95</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Analyses aujourd'hui</span>
            <span className="font-semibold">8</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
