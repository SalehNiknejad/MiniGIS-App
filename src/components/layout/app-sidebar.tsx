import { useTranslation } from "react-i18next"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useMapStore } from "@/store/map-store"

type AppSidebarProps = {
  mobile?: boolean
}

export function AppSidebar({ mobile = false }: AppSidebarProps) {
  const { t, i18n } = useTranslation()
  const textAlign = i18n.language === "fa" ? "text-right" : "text-left"
  const layers = useMapStore((state) => state.layers)
  const toggleLayer = useMapStore((state) => state.toggleLayer)

  return (
    <aside
      className={cn(
        "flex flex-col bg-card",
        mobile
          ? "h-full w-full"
          : "hidden w-[320px] shrink-0 border-r border-border lg:flex"
      )}
    >
      {!mobile && (
        <div className="border-b border-border p-4">
          <h2 className="text-sm font-semibold">{t("sidebar.workspace")}</h2>
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className={`space-y-6 p-4 ${textAlign}`}>
          <section>
            <h3 className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {t("sidebar.tabs")}
            </h3>

            <div className="space-y-2">
              <div className="rounded-lg bg-primary/10 p-3 text-sm">
                {t("sidebar.museums")}
              </div>

              <div className="rounded-lg p-3 text-sm transition hover:bg-muted">
                {t("sidebar.nature")}
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h3 className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {t("sidebar.filters")}
            </h3>

            <div className="space-y-3">
              <div className="rounded-lg bg-muted p-3 text-sm">
                {t("sidebar.categoryFilter")}
              </div>

              <div className="rounded-lg bg-muted p-3 text-sm">
                {t("sidebar.ratingFilter")}
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h3 className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {t("sidebar.layers")}
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => toggleLayer("points")}
                className="w-full rounded-lg bg-muted p-3 text-sm"
              >
                Points : {layers.points ? "ON" : "OFF"}
              </button>

              <button
                onClick={() => toggleLayer("lines")}
                className="w-full rounded-lg bg-muted p-3 text-sm"
              >
                Lines : {layers.lines ? "ON" : "OFF"}
              </button>

              <button
                onClick={() => toggleLayer("polygons")}
                className="w-full rounded-lg bg-muted p-3 text-sm"
              >
                Polygons : {layers.polygons ? "ON" : "OFF"}
              </button>
            </div>
          </section>
        </div>
      </ScrollArea>
    </aside>
  )
}
