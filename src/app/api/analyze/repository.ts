import { prisma } from '@/lib/prisma'
import { AnalysisResult } from '@/types/analysis'

export const saveAnalysis = async (analysis: AnalysisResult) => {
  await prisma.analysis.create({
    data: {
      url: analysis.url,
      score: analysis.overallScore,
      metrics: analysis.metrics,
      date: new Date(analysis.timestamp),
    },
  })
}

export const getAllAnalyses = async () => {
  return prisma.analysis.findMany({
    orderBy: { date: 'desc' },
  })
}

export const getAnalysisById = async (id: number) => {
  return prisma.analysis.findUnique({
    where: { id },
  })
}