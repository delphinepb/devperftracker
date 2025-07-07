export const analyzeWebsite = async (url: string) => {
  const apiKey = process.env.PAGESPEED_API_KEY
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}`

  const res = await fetch(apiUrl)
  const data = await res.json()

  const lighthouse = data.lighthouseResult?.categories.performance?.score
  const audits = data.lighthouseResult?.audits

  return {
    url,
    timestamp: new Date().toISOString(),
    overallScore: lighthouse ? Math.round(lighthouse * 100) : 0,
    metrics: {
      fcp: { value: audits['first-contentful-paint']?.numericValue ?? 0, score: Math.round((audits['first-contentful-paint']?.score ?? 0) * 100), label: 'First Contentful Paint' },
      lcp: { value: audits['largest-contentful-paint']?.numericValue ?? 0, score: Math.round((audits['largest-contentful-paint']?.score ?? 0) * 100), label: 'Largest Contentful Paint' },
      tbt: { value: audits['total-blocking-time']?.numericValue ?? 0, score: Math.round((audits['total-blocking-time']?.score ?? 0) * 100), label: 'Total Blocking Time' },
      cls: { value: audits['cumulative-layout-shift']?.numericValue ?? 0, score: Math.round((audits['cumulative-layout-shift']?.score ?? 0) * 100), label: 'Cumulative Layout Shift' },
      fid: { value: audits['interactive']?.numericValue ?? 0, score: Math.round((audits['interactive']?.score ?? 0) * 100), label: 'First Input Delay' },
    },
  }
}
