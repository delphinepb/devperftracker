"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { fetchAllAnalyses, fetchAnalysisById } from "@/web/services/admin"
import Header from "@/components/Header"

export default function AdminDashboard() {
  const [analyses, setAnalyses] = useState<any[]>([])
  const [selectedAnalysis, setSelectedAnalysis] = useState<any>(null)

  useEffect(() => {
    const loadAnalyses = async () => {
      const data = await fetchAllAnalyses()
      setAnalyses(data)
    }
    loadAnalyses()
  }, [])

  const scoreData = analyses.map(item => ({
    name: new Date(item.date).toLocaleDateString(),
    score: item.score,
  }))

  const radarData = selectedAnalysis
    ? Object.entries(selectedAnalysis.metrics).map(([key, metric]: any) => ({
        metric: metric.label,
        score: metric.score,
      }))
    : []

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default"
    if (score >= 70) return "secondary"
    return "destructive"
  }

  const totalAnalyses = analyses.length
  const averageScore = totalAnalyses > 0 ? analyses.reduce((sum, a) => sum + a.score, 0) / totalAnalyses : 0
  const bestScore = analyses.length > 0 ? Math.max(...analyses.map(a => a.score)) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="details">Analyses</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques Globales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Total Analyses : {totalAnalyses}</p>
                  <p>Score Moyen : {averageScore.toFixed(1)}</p>
                  <p>Meilleur Score : {bestScore}</p>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={scoreData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="score" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="details" className="mt-6">
            {analyses.map((analysis) => (
              <Card key={analysis.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{analysis.url}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Date : {new Date(analysis.date).toLocaleDateString()}</p>
                  <p>Score : <Badge variant={getScoreBadgeVariant(analysis.score)}>{analysis.score}</Badge></p>
                  <p>User : {analysis.user?.username || "-"}</p>
                  <Button onClick={async () => {
                    const details = await fetchAnalysisById(analysis.id)
                    setSelectedAnalysis(details)
                  }}>
                    Voir Détail
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {selectedAnalysis && (
          <Card className="mt-8 max-w-xl mx-auto">
            <CardHeader>
              <CardTitle>Détail Analyse</CardTitle>
            </CardHeader>
            <CardContent>
              <p>URL : {selectedAnalysis.url}</p>
              <p>Date : {new Date(selectedAnalysis.date).toLocaleDateString()}</p>
              <p>Score : {selectedAnalysis.score}</p>
              <div className="mt-4">
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis />
                    <Radar dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <Button className="mt-4" onClick={() => setSelectedAnalysis(null)}>Fermer</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
