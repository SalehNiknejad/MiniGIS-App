import { AppHeader } from "./app-header"
import { AppSidebar } from "./app-sidebar"
import { MapView } from "./map-view"

export function AppShell() {
  return (
    <div className="flex h-svh overflow-hidden bg-background text-foreground">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="relative flex-1 overflow-hidden">
          <MapView />
        </main>
      </div>
    </div>
  )
}
