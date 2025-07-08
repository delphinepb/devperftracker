export interface Metric {
  value: number;
  score: number;
  label: string;
}

export interface AnalysisResult {
  url: string;
  timestamp: string;
  overallScore: number;
  metrics: Record<string, Metric>;
}