import { NextRequest, NextResponse } from 'next/server';
import { handleAnalyze, handleGetHistory } from './controller';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL manquante ou invalide.' }, { status: 400 });
    }

    const result = await handleAnalyze(url);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Erreur POST /api/analyze:', error);
    return NextResponse.json({ error: error.message || "Erreur inconnue" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const history = await handleGetHistory();
    return NextResponse.json(history);
  } catch (error: any) {
    console.error('Erreur GET /api/analyze:', error);
    return NextResponse.json({ error: 'Impossible de récupérer l’historique.' }, { status: 500 });
  }
}
