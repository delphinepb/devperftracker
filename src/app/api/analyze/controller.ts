import { analyzeWebsite } from './service'
import { saveAnalysis, getAllAnalyses, getAnalysisById } from './repository'

export const handleAnalyze = async (url: string, userId: number) => {
  if (!url || !url.startsWith('http')) {
    throw new Error('URL invalide')
  }

  const analysis = await analyzeWebsite(url)
  await saveAnalysis(analysis, userId)
  return analysis
}

export const handleGetHistory = async (userId: number) => {
  return await getAllAnalyses(userId)
}

export const handleGetAnalysisById = async (id: number) => {
  const analysis = await getAnalysisById(id)
  if (!analysis) throw new Error('Analyse non trouvée')
  return analysis
}