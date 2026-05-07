import "maplibre-gl/dist/maplibre-gl.css"

import { useEffect, useRef } from "react"
import maplibregl from "maplibre-gl"

export function MapView() {
  const mapRef = useRef<maplibregl.Map | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const apiKey = import.meta.env.VITE_MAPIR_API_KEY

    maplibregl.setRTLTextPlugin(
      "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js",
      true
    )

    const map = new maplibregl.Map({
      container: containerRef.current!,

      style: `https://map.ir/vector/styles/main/mapir-xyz-style.json?x-api-key=${apiKey}`,

      center: [51.389, 35.6892],
      zoom: 11,

      transformRequest: (url) => ({
        url,
        headers: {
          "x-api-key": apiKey,
        },
      }),
    })

    map.addControl(new maplibregl.NavigationControl())

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  )
}
