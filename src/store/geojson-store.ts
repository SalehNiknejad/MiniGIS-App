import { create } from "zustand"
import { persist } from "zustand/middleware"

import type {
  Feature,
  FeatureCollection,
  Geometry,
} from "geojson"

import initialGeojson from "@/assets/geojson.json"

type GeoStore = {
  data: FeatureCollection

  setData: (data: FeatureCollection) => void

  addFeature: (feature: Feature<Geometry>) => void

  removeFeature: (id: number) => void

  updateFeature: (
    id: number,
    updates: Partial<Feature<Geometry>>
  ) => void
}

export const useGeoStore = create<GeoStore>()(
  persist(
    (set) => ({
      data: initialGeojson as FeatureCollection,

      setData: (data) =>
        set({
          data,
        }),

      addFeature: (feature) =>
        set((state) => ({
          data: {
            ...state.data,

            features: [
              ...state.data.features,
              feature,
            ],
          },
        })),

      removeFeature: (id) =>
        set((state) => ({
          data: {
            ...state.data,

            features: state.data.features.filter(
              (feature) =>
                feature.properties?.id !== id
            ),
          },
        })),

      updateFeature: (id, updates) =>
        set((state) => ({
          data: {
            ...state.data,

            features: state.data.features.map(
              (feature) => {
                if (
                  feature.properties?.id !== id
                ) {
                  return feature
                }

                return {
                  ...feature,
                  ...updates,
                }
              }
            ),
          },
        })),
    }),

    {
      name: "mini-gis-storage",
    }
  )
)