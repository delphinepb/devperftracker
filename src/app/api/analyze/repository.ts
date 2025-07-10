import { prisma } from '@/lib/prisma'
import { AnalysisResult } from '@/types/analysis'

export const saveAnalysis = async (analysis: AnalysisResult, userId : number) => {
  await prisma.analysis.create({
    data: {
      url: analysis.url,
      score: analysis.overallScore,
      metrics: analysis.metrics,
      date: new Date(analysis.timestamp),
      userId
    },
  })
}

export const getAllAnalyses = async (userId : number) => {
  return prisma.analysis.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
  })
}

export const getAnalysisById = async (id: number) => {
  return prisma.analysis.findUnique({
    where: { id },
  })
}