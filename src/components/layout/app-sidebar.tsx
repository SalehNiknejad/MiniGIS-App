import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useGeoStore } from "@/store/geojson-store"
import { useMapStore } from "@/store/map-store"

type AppSidebarProps = {
  mobile?: boolean
}

export function AppSidebar({ mobile = false }: AppSidebarProps) {
  const { t, i18n } = useTranslation()
  const textAlign = i18n.language === "fa" ? "text-right" : "text-left"
  const layers = useMapStore((state) => state.layers)
  const toggleLayer = useMapStore((state) => state.toggleLayer)
  const currentFilter = useMapStore((state) => state.currentFilter)
  const setCategoryFilter = useMapStore((state) => state.setCategoryFilter)
  const setRatingFilter = useMapStore((state) => state.setRatingFilter)
  const setVisitFeeFilter = useMapStore((state) => state.setVisitFeeFilter)
  const setYearBuiltFilter = useMapStore((state) => state.setYearBuiltFilter)
  const geojson = useGeoStore((state) => state.data)

  const categoryOptions = useMemo(() => {
    const categories = new Set<string>()
    geojson.features.forEach((feature) => {
      const category = feature.properties?.category
      if (category) categories.add(String(category))
    })
    return ["all", ...Array.from(categories).sort()]
  }, [geojson])

  const visitFeeOptions = useMemo(() => {
    const fees = new Set<number>()
    geojson.features.forEach((feature) => {
      const fee = feature.properties?.visit_fee_irr
      if (typeof fee === "number") fees.add(fee)
    })
    return [
      "all",
      ...Array.from(fees)
        .sort((a, b) => a - b)
        .map(String),
    ]
  }, [geojson])

  const yearBuiltOptions = useMemo(() => {
    const years = new Set<number>()
    geojson.features.forEach((feature) => {
      const year = feature.properties?.year_built
      if (typeof year === "number") years.add(year)
    })
    return [
      "all",
      ...Array.from(years)
        .sort((a, b) => a - b)
        .map(String),
    ]
  }, [geojson])

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
              {t("sidebar.filters")}
            </h3>

            <div className="space-y-4">
              <div>
                <div className="mb-2 text-sm font-medium text-foreground">
                  {t("sidebar.categoryFilter")}
                </div>

                <Select
                  value={currentFilter.category}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger size="sm" className="w-full">
                    <SelectValue>
                      {currentFilter.category === "all"
                        ? t("sidebar.allCategories")
                        : currentFilter.category}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all"
                          ? t("sidebar.allCategories")
                          : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="mb-2 text-sm font-medium text-foreground">
                  {t("sidebar.visitFeeFilter")}
                </div>

                <Select
                  value={currentFilter.visitFeeIrr}
                  onValueChange={setVisitFeeFilter}
                >
                  <SelectTrigger size="sm" className="w-full">
                    <SelectValue>
                      {currentFilter.visitFeeIrr === "all"
                        ? t("sidebar.visitFeeAll")
                        : currentFilter.visitFeeIrr === "0"
                          ? t("sidebar.visitFeeFree")
                          : `${currentFilter.visitFeeIrr} ${t("sidebar.currency")}`}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {visitFeeOptions.map((fee) => (
                      <SelectItem key={fee} value={fee}>
                        {fee === "all"
                          ? t("sidebar.visitFeeAll")
                          : fee === "0"
                            ? t("sidebar.visitFeeFree")
                            : `${fee} ${t("sidebar.currency")}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="mb-2 text-sm font-medium text-foreground">
                  {t("sidebar.yearBuiltFilter")}
                </div>

                <Select
                  value={currentFilter.yearBuilt}
                  onValueChange={setYearBuiltFilter}
                >
                  <SelectTrigger size="sm" className="w-full">
                    <SelectValue>
                      {currentFilter.yearBuilt === "all"
                        ? t("sidebar.yearBuiltAll")
                        : currentFilter.yearBuilt}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {yearBuiltOptions.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year === "all" ? t("sidebar.yearBuiltAll") : year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="mb-2 text-sm font-medium text-foreground">
                  {t("sidebar.ratingFilter")}
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <Button
                    variant={currentFilter.rating === 0 ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={() => setRatingFilter(0)}
                  >
                    {t("sidebar.ratingAll")}
                  </Button>

                  <Button
                    variant={currentFilter.rating === 3 ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={() => setRatingFilter(3)}
                  >
                    {t("sidebar.rating3plus")}
                  </Button>

                  <Button
                    variant={currentFilter.rating === 4 ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    onClick={() => setRatingFilter(4)}
                  >
                    {t("sidebar.rating4plus")}
                  </Button>

                  <Button
                    variant={
                      currentFilter.rating === 4.5 ? "default" : "outline"
                    }
                    size="sm"
                    className="w-full"
                    onClick={() => setRatingFilter(4.5)}
                  >
                    {t("sidebar.rating45")}
                  </Button>
                </div>
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
