import { useTranslation } from "react-i18next"

export function MapView() {
  const { t } = useTranslation()

  return (
    <div className="relative h-full w-full bg-muted">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="space-y-2 text-center">
          <h2 className="text-lg font-semibold">{t("map.container")}</h2>

          <p className="text-sm text-muted-foreground">
            {t("map.description")}
          </p>
        </div>
      </div>
    </div>
  )
}
