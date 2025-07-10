import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET as string

export interface JwtPayload {
  userId: number
  role: 'admin' | 'user'
}

export const withAuth = (
  handler: (req: NextRequest, user: JwtPayload) => Promise<NextResponse>,
  allowedRoles: ('admin' | 'user')[]
) => {
  return async (req: NextRequest) => {
    const authHeader = req.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Non autorisé (token manquant)' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload

      if (!allowedRoles.includes(decoded.role)) {
        return NextResponse.json({ error: 'Accès interdit (rôle non autorisé)' }, { status: 403 })
      }

      return handler(req, decoded)
    } catch (error) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 403 })
    }
  }
}
