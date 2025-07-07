import { NextResponse } from 'next/server'
import { analyzeController } from './controller'

export async function POST(req: Request) {
  try {
    const { url } = await req.json()
    const result = await analyzeController(url)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
