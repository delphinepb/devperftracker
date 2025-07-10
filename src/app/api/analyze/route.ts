import { NextResponse, NextRequest } from 'next/server'
import { handleAnalyze, handleGetHistory } from './controller'
import { withAuth } from '@/middleware/auth'

export const POST = withAuth(async (req: NextRequest, user) => {
  const { url } = await req.json()

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'URL manquante ou invalide.' }, { status: 400 })
  }

  const result = await handleAnalyze(url, user.userId)
  return NextResponse.json(result)
}, ['admin', 'user'])

export const GET = withAuth(async (req: NextRequest, user) => {
  const history = await handleGetHistory(user.userId)
  return NextResponse.json(history)
}, ['admin', 'user'])
