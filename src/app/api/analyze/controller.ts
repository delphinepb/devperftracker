import { analyzeWebsite } from "./service"

export const analyzeController = async (url: string) => {
  if (!url || !url.startsWith("http")) {
    throw new Error("URL invalide")
  }

  const result = await analyzeWebsite(url)
  return result
}
