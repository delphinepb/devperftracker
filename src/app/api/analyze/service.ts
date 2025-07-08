import { GOOGLE_API_KEY, GOOGLE_API_URL } from '@/config/config'
import { AnalysisResult } from '@/types/analysis'

export const analyzeWebsite = async (url: string): Promise<AnalysisResult> => {
  const apiUrl = `${GOOGLE_API_URL}?url=${encodeURIComponent(url)}&key=${GOOGLE_API_KEY}`

  try {
    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error(`Erreur API (${res.status}): ${res.statusText}`)

    const data = await res.json()
    const lighthouse = data.lighthouseResult?.categories.performance?.score
    const audits = data.lighthouseResult?.audits

    return {
      url,
      timestamp: new Date().toISOString(),
      overallScore: lighthouse ? Math.round(lighthouse * 100) : 0,
      metrics: mapMetrics(audits),
    }
  } catch (error) {
    console.error('Erreur dans analyzeWebsite:', error)
    throw new Error("Impossible d'analyser ce site pour le moment.")
  }
}

const mapMetrics = (audits: any) => ({
  fcp: mapMetric(audits, 'first-contentful-paint', 'First Contentful Paint'),
  lcp: mapMetric(audits, 'largest-contentful-paint', 'Largest Contentful Paint'),
  tbt: mapMetric(audits, 'total-blocking-time', 'Total Blocking Time'),
  cls: mapMetric(audits, 'cumulative-layout-shift', 'Cumulative Layout Shift'),
  fid: mapMetric(audits, 'interactive', 'First Input Delay'),
})

const mapMetric = (audits: any, key: string, label: string) => ({
  value: audits?.[key]?.numericValue ?? 0,
  score: Math.round((audits?.[key]?.score ?? 0) * 100),
  label,
})