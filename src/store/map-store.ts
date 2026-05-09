import { create } from "zustand"

type LayerState = {
  points: boolean
  lines: boolean
  polygons: boolean
}

type MapStore = {
  layers: LayerState

  toggleLayer: (layer: keyof LayerState) => void
}

export const useMapStore = create<MapStore>((set) => ({
  layers: {
    points: true,
    lines: true,
    polygons: true,
  },

  toggleLayer: (layer) =>
    set((state) => ({
      layers: {
        ...state.layers,
        [layer]: !state.layers[layer],
      },
    })),
}))