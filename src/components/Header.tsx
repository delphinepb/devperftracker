import { Activity } from "lucide-react"
import { Button } from "./ui/button"
import { logout } from "@/app/api/auth/login/route"

export default function Header() {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Activity className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">DevPerfTracker</h1>
        </div>
        <Button onClick={logout} variant="outline">
          Déconnexion
        </Button>
      </div>

      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4 text-center">
        Analysez les performances de vos sites web en temps réel avec des métriques détaillées
      </p>
    </div>
  )
}