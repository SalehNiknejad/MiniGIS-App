import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { LanguageSwitcher } from "./language-switcher"
import { MobileNav } from "./mobile-nav"
import { useMapStore } from "@/store/map-store"

export function AppHeader() {
  const { t } = useTranslation()
  const savedViews = useMapStore((state) => state.savedViews)
  const activeViewId = useMapStore((state) => state.activeViewId)
  const saveCurrentView = useMapStore((state) => state.saveCurrentView)
  const setActiveView = useMapStore((state) => state.setActiveView)

  return (
    <header className="flex h-16 items-center border-b border-border bg-background/80 px-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <MobileNav />

        <div>
          <h1 className="text-sm font-semibold md:text-base">
            {t("app.title")}
          </h1>

          <p className="hidden text-xs text-muted-foreground md:block">
            {t("app.subtitle")}
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4">
        {savedViews.length > 0 ? (
          <Tabs
            value={activeViewId ?? savedViews[0].id}
            onValueChange={(value) => setActiveView(value)}
            className="w-full max-w-3xl"
          >
            <TabsList variant="default" className="justify-center">
              {savedViews.map((view) => (
                <TabsTrigger
                  key={view.id}
                  value={view.id}
                  className="min-w-[120px]"
                >
                  {view.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        ) : (
          <span className="text-xs text-muted-foreground">
            {t("header.noSavedViews")}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => saveCurrentView()}>
          {t("header.saveFilter")}
        </Button>

        <LanguageSwitcher />
      </div>
    </header>
  )
}
