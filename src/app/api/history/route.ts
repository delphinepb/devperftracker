import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/middleware/auth'

export const GET = withAuth(async (req, user) => {
  const history = await prisma.analysis.findMany({
    where: { userId: user.userId }, 
    orderBy: { date: 'desc' },
  })
  return NextResponse.json(history)
}, ['admin', 'user'])
