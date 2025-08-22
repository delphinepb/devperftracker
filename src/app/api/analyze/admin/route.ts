import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/middleware/auth'

export const GET = withAuth(async (req, user) => {
  const allAnalyses = await prisma.analysis.findMany({
    orderBy: { date: 'desc' },
    include: { user: true },
  })
  return NextResponse.json(allAnalyses)
}, ['admin'])
