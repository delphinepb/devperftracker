import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Zap } from "lucide-react"
import { ChangeEvent } from "react"

interface AnalyzeFormProps {
  url: string
  setUrl: (value: string) => void
  isAnalyzing: boolean
  onAnalyze: () => void
  error?: string
}

export default function AnalyzeForm({
  url,
  setUrl,
  isAnalyzing,
  onAnalyze,
  error
}: AnalyzeFormProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  return (
    <div className="mb-8 max-w-2xl mx-auto">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={handleChange}
            disabled={isAnalyzing}
          />
        </div>
        <Button onClick={onAnalyze} disabled={isAnalyzing} className="min-w-[120px]">
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Analyse...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Analyser
            </>
          )}
        </Button>
      </div>

      {error && (
        <Alert className="mt-4" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
