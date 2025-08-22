import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/middleware/auth'

export const GET = withAuth(async (req: NextRequest, user) => {
  const id = req.nextUrl.pathname.split('/').pop()

  if (!id) {
    return NextResponse.json({ error: 'ID manquant' }, { status: 400 })
  }

  const analysis = await prisma.analysis.findUnique({
    where: { id: parseInt(id, 10) },
  })

  if (!analysis) {
    return NextResponse.json({ error: 'Analyse non trouvée' }, { status: 404 })
  }

  if (user.role !== 'admin' && analysis.userId !== parseInt(user.userId, 10)) {
    return NextResponse.json({ error: 'Accès interdit à cette analyse' }, { status: 403 })
  }

  return NextResponse.json(analysis)
}, ['admin', 'user'])
