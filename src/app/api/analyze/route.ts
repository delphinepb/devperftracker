import { NextResponse } from 'next/server'
import { analyzeController } from './controller'
import { getHistory } from '../analyze/controller'

export async function POST(req: Request) {
  try {
    const { url } = await req.json()
    const result = await analyzeController(url)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}

export async function GET() {
  const history = await getHistory()
  return NextResponse.json(history)
}