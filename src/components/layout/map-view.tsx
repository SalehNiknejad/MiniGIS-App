import { useTranslation } from "react-i18next"
import Mapir from "mapir-react-component"

export function MapView() {
  const Map = Mapir.setToken({
    transformRequest: (url: any) => {
      return {
        url: url,
        headers: {
          "x-api-key": import.meta.env.VITE_MAPIR_API_KEY,
          "Mapir-SDK": "reactjs",
        },
      }
    },
  })
  console.log(import.meta.env.VITE_MAPIR_API_KEY)
  console.log(Map)
  return (
    <div className="relative h-full w-full bg-muted">
      <div className="absolute inset-0 flex items-center justify-center">
        <Mapir Map={Map} />
      </div>
    </div>
  )
}
