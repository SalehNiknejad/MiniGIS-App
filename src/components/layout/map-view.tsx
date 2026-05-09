import "maplibre-gl/dist/maplibre-gl.css"

import { useEffect, useRef } from "react"
import maplibregl from "maplibre-gl"

import type { FeatureCollection } from "geojson"

import geojsonData from "@/assets/geojson.json"
import { useMapStore } from "@/store/map-store"
export function MapView() {
  const mapRef = useRef<maplibregl.Map | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const layers = useMapStore((state) => state.layers)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const apiKey = import.meta.env.VITE_MAPIR_API_KEY

    const geojson = geojsonData as FeatureCollection

    maplibregl.setRTLTextPlugin(
      "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js",
      true
    )

    const map = new maplibregl.Map({
      container: containerRef.current,
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

    map.on("load", () => {
      map.addSource("geo", {
        type: "geojson",
        data: geojson,
      })

      map.addLayer({
        id: "points",
        type: "circle",
        source: "geo",
        filter: ["==", ["geometry-type"], "Point"],

        paint: {
          "circle-radius": 6,
          "circle-color": "#e63946",
        },
      })

      map.addLayer({
        id: "lines",
        type: "line",
        source: "geo",
        filter: ["==", ["geometry-type"], "LineString"],

        paint: {
          "line-color": "#2a9d8f",
          "line-width": 3,
        },
      })

      map.addLayer({
        id: "polygons",
        type: "fill",
        source: "geo",
        filter: ["==", ["geometry-type"], "Polygon"],

        paint: {
          "fill-color": "#ffd166",
          "fill-opacity": 0.5,
        },
      })
    })

    map.addControl(new maplibregl.NavigationControl(), "bottom-right")

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current

    if (!map) return

    if (map.getLayer("points")) {
      map.setLayoutProperty(
        "points",
        "visibility",
        layers.points ? "visible" : "none"
      )
    }

    if (map.getLayer("lines")) {
      map.setLayoutProperty(
        "lines",
        "visibility",
        layers.lines ? "visible" : "none"
      )
    }

    if (map.getLayer("polygons")) {
      map.setLayoutProperty(
        "polygons",
        "visibility",
        layers.polygons ? "visible" : "none"
      )
    }
  }, [layers])

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  )
}
