export function AppShell() {
  return (
    <div className="flex h-svh overflow-hidden bg-background text-foreground">
      <div>sidebar</div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div>header</div>

        <main className="relative flex-1 overflow-hidden">
          <div>mapbox</div>
        </main>
      </div>
    </div>
  )
}
