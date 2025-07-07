import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const history = await prisma.analysis.findMany({
    orderBy: { date: 'desc' }
  })

  return NextResponse.json(history)
}
