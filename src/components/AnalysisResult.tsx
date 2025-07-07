import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Globe } from "lucide-react"

interface AnalysisResultProps {
  result: {
    url: string
    timestamp: string
    overallScore: number
  }
  getScoreColor: (score: number) => string
}

export default function AnalysisResult({ result, getScoreColor }: AnalysisResultProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" /> Résultats d'analyse
            </CardTitle>
            <CardDescription className="mt-1">
              {result.url} • {result.timestamp}
            </CardDescription>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(result.overallScore)}`}>
              {result.overallScore}
            </div>
            <div className="text-sm text-gray-500">Score global</div>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
