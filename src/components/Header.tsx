import { Activity } from "lucide-react"

export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Activity className="h-8 w-8 text-blue-600" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">DevPerfTracker</h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Analysez les performances de vos sites web en temps réel avec des métriques détaillées
      </p>
    </div>
  )
}