import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"

import { LanguageSwitcher } from "./language-switcher"
import { MobileNav } from "./mobile-nav"

export function AppHeader() {
  const { t } = useTranslation()

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur">
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

      <div className="flex items-center gap-2">
        <LanguageSwitcher />

        <Button variant="outline" size="sm" className="hidden sm:flex">
          {t("header.addLayer")}
        </Button>

        <Button size="sm">{t("header.addPoint")}</Button>
      </div>
    </header>
  )
}
