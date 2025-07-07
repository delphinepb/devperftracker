import { analyzeWebsite } from "./service"
import { prisma } from "@/lib/prisma"

export const analyzeController = async (url: string) => {
  if (!url || !url.startsWith("http")) {
    throw new Error("URL invalide")
  }

  const result = await analyzeWebsite(url)

  await prisma.analysis.create({
  data: {
    url: result.url,
    score: result.overallScore,
    metrics: result.metrics, 
    date: new Date()
  }
})


  return result
}

export const getHistory = async () => {
  return prisma.analysis.findMany({
    orderBy: { date: 'desc' }
  })
}
