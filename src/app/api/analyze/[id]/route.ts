import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop()

  if (!id) {
    return NextResponse.json({ error: 'ID manquant' }, { status: 400 })
  }

  const analysis = await prisma.analysis.findUnique({
    where: { id: parseInt(id, 10) }
  })

  if (!analysis) {
    return NextResponse.json({ error: 'Analyse non trouvée' }, { status: 404 })
  }

  return NextResponse.json(analysis)
}
