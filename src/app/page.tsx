"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Clock, Globe, TrendingUp, Eye, Timer, Gauge } from "lucide-react"
import { analyze, fetchHistory } from "@/web/services/analyze"
import { fetchAnalysisById } from "@/web/services/analyze"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import Header from "@/components/Header"
import AnalyzeForm from "@/components/AnalyzeForm"
import AnalysisResult from "@/components/AnalysisResult"
import QuickStats from "@/components/QuickStats"
import AnalysisHistory from "@/components/AnalysisHistory"


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

export default function DevPerfTracker() {
  const [url, setUrl] = useState<string>("")
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string>("")
  const [history, setHistory] = useState<any[]>([])
  const [selectedAnalysis, setSelectedAnalysis] = useState<any>(null)
  const scoreData = history.map(item => ({
    name: new Date(item.date).toLocaleDateString(),
    score: item.score
  }))
  const radarData = selectedAnalysis
  ? Object.entries(selectedAnalysis.metrics).map(([key, metric]: any) => ({
      metric: metric.label,
      score: metric.score
    }))
  : []

  useEffect(() => {
    const loadHistory = async () => {
      const data = await fetchHistory()
      setHistory(data)
    }

    loadHistory()
  }, [])


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
  const totalSites = history.length

  const averageScore = totalSites > 0
    ? history.reduce((sum, item) => sum + item.score, 0) / totalSites
    : 0

  const bestScore = history.length > 0
    ? Math.max(...history.map(item => item.score))
    : 0

  const today = new Date().toDateString()
  const analysesToday = history.filter(item => new Date(item.date).toDateString() === today).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <Header></Header>

        <AnalyzeForm
          url={url}
          setUrl={setUrl}
          isAnalyzing={isAnalyzing}
          onAnalyze={handleAnalyze}
          error={error}
        />


        {results && (
          <div className="mb-8">
            <AnalysisResult result={results} getScoreColor={getScoreColor} />

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
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={scoreData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="score" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <QuickStats
                totalSites={totalSites}
                averageScore={averageScore}
                bestScore={bestScore}
                analysesToday={analysesToday}
              />
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <AnalysisHistory
              history={history}
              onSelectAnalysis={async (id) => {
                try {
                  const detailedAnalysis = await fetchAnalysisById(id)
                  setSelectedAnalysis(detailedAnalysis)
                } catch (error) {
                  console.error("Erreur lors du chargement de l'analyse :", error)
                }
              }}
              getScoreBadgeVariant={getScoreBadgeVariant}
            />
          </TabsContent>
        </Tabs>

        {selectedAnalysis && (
  <Card className="mt-8 max-w-xl mx-auto">
    <CardHeader>
      <CardTitle>Détails de l'analyse</CardTitle>
      <CardDescription>{selectedAnalysis.url}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Date : {new Date(selectedAnalysis.date).toLocaleDateString()}</p>
      <p>Score : {selectedAnalysis.score}</p>

      {selectedAnalysis.metrics && (
        <div className="mt-4 space-y-3">
          {Object.entries(selectedAnalysis.metrics).map(([key, metric]: any) => (
            <div key={key} className="border rounded-lg p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-sm">{metric.label}</span>
                <Badge>{metric.score}</Badge>
              </div>
              <div className="text-sm text-gray-600 mb-1">
                {key.toUpperCase()}
              </div>
              <div className="font-semibold">
                {key === 'cls'
                  ? metric.value.toFixed(3)
                  : key === 'fcp' || key === 'lcp'
                  ? `${metric.value}s`
                  : `${metric.value}ms`}
              </div>
              <Progress value={metric.score} className="mt-2" />
            </div>
          ))}
            <div className="mt-8">
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis />
                  <Radar name="Métriques" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
        </div>
      )}

      <Button className="mt-6" onClick={() => setSelectedAnalysis(null)}>
              Fermer
            </Button>
          </CardContent>
        </Card>
      )}
      </div>
    </div>
  )
}