"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Activity, BarChart3, Clock, Globe, Loader2, Search, TrendingUp, Zap, Eye, Timer, Gauge } from "lucide-react"
import { analyze } from "@/web/services/analyze"

type Metric = {
  value: number
  score: number
  label: string
}

type AnalysisResult = {
  url: string
  timestamp: string
  overallScore: number
  metrics: Record<string, Metric>
}

type HistoryItem = {
  id: number
  url: string
  score: number
  date: string
  time: string
}

const mockHistory: HistoryItem[] = [
  { id: 1, url: "https://example.com", score: 85, date: "2024-01-15", time: "14:30" },
  { id: 2, url: "https://google.com", score: 92, date: "2024-01-15", time: "13:15" },
  { id: 3, url: "https://github.com", score: 78, date: "2024-01-14", time: "16:45" },
  { id: 4, url: "https://vercel.com", score: 95, date: "2024-01-14", time: "11:20" },
]

export default function DevPerfTracker() {
  const [url, setUrl] = useState<string>("")
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string>("")

  const handleAnalyze = async () => {
    if (!url) {
      setError("Veuillez entrer une URL valide")
      return
    }

    setIsAnalyzing(true)
    setError("")

    try {
      const result = await analyze(url)
      setResults(result)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsAnalyzing(false)
    }
  }


  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default"
    if (score >= 70) return "secondary"
    return "destructive"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Activity className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">DevPerfTracker</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Analysez les performances de vos sites web en temps réel avec des métriques détaillées
          </p>
        </div>

        {/* Formulaire d'analyse */}
        <Card className="mb-8 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Analyser une URL
            </CardTitle>
            <CardDescription>Entrez l'URL de votre site pour obtenir un rapport de performance complet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isAnalyzing}
                />
              </div>
              <Button onClick={handleAnalyze} disabled={isAnalyzing} className="min-w-[120px]">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyse...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Analyser
                  </>
                )}
              </Button>
            </div>
            {error && (
              <Alert className="mt-4" variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Résultats de l'analyse */}
        {results && (
          <div className="mb-8">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Résultats d'analyse
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {results.url} • {results.timestamp}
                    </CardDescription>
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(results.overallScore)}`}>
                      {results.overallScore}
                    </div>
                    <div className="text-sm text-gray-500">Score global</div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Métriques détaillées */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {Object.entries(results.metrics).map(([key, metric]) => (
                <Card key={key}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {key === "fcp" && <Eye className="h-4 w-4 text-blue-500" />}
                        {key === "lcp" && <Timer className="h-4 w-4 text-green-500" />}
                        {key === "tbt" && <Clock className="h-4 w-4 text-orange-500" />}
                        {key === "cls" && <BarChart3 className="h-4 w-4 text-purple-500" />}
                        {key === "fid" && <Gauge className="h-4 w-4 text-red-500" />}
                        <span className="font-medium text-sm">{key.toUpperCase()}</span>
                      </div>
                      <Badge variant={getScoreBadgeVariant(metric.score)}>{metric.score}</Badge>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">{metric.label}</div>
                    <div className="text-lg font-semibold">
                      {key === "cls"
                        ? metric.value.toFixed(3)
                        : key === "fcp" || key === "lcp"
                          ? `${metric.value}s`
                          : `${metric.value}ms`}
                    </div>
                    <Progress value={metric.score} className="mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Onglets pour Dashboard et Historique */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Historique
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Graphique des performances */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Évolution des performances
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Graphique des performances</p>
                      <p className="text-sm">(À implémenter avec Chart.js)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Statistiques rapides */}
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
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Historique des analyses
                </CardTitle>
                <CardDescription>Consultez vos analyses précédentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="font-medium text-sm">{item.url}</div>
                          <div className="text-xs text-gray-500">
                            {item.date} à {item.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getScoreBadgeVariant(item.score)}>{item.score}</Badge>
                        <Button variant="ghost" size="sm">
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}