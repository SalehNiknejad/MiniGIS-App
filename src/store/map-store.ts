import { create } from "zustand"

type LayerState = {
  points: boolean
  lines: boolean
  polygons: boolean
}

type FilterSettings = {
  category: string
  rating: number
  visitFeeIrr: string
  yearBuilt: string
}

type FilterView = {
  id: string
  name: string
  filter: FilterSettings
}

type MapStore = {
  layers: LayerState
  currentFilter: FilterSettings
  savedViews: FilterView[]
  activeViewId: string | null

  toggleLayer: (layer: keyof LayerState) => void
  setCategoryFilter: (category: string) => void
  setRatingFilter: (rating: number) => void
  setVisitFeeFilter: (visitFee: string) => void
  setYearBuiltFilter: (yearBuilt: string) => void
  saveCurrentView: (name?: string) => void
  setActiveView: (viewId: string) => void
}

const defaultFilter: FilterSettings = {
  category: "all",
  rating: 0,
  visitFeeIrr: "all",
  yearBuilt: "all",
}

export const useMapStore = create<MapStore>((set, get) => ({
  layers: {
    points: true,
    lines: true,
    polygons: true,
  },

  currentFilter: defaultFilter,
  savedViews: [],
  activeViewId: null,

  toggleLayer: (layer) =>
    set((state) => ({
      layers: {
        ...state.layers,
        [layer]: !state.layers[layer],
      },
    })),

  setCategoryFilter: (category) =>
    set(() => ({
      currentFilter: {
        ...get().currentFilter,
        category,
      },
    })),

  setRatingFilter: (rating) =>
    set(() => ({
      currentFilter: {
        ...get().currentFilter,
        rating,
      },
    })),

  setVisitFeeFilter: (visitFee: string) =>
    set(() => ({
      currentFilter: {
        ...get().currentFilter,
        visitFeeIrr: visitFee,
      },
    })),

  setYearBuiltFilter: (yearBuilt: string) =>
    set(() => ({
      currentFilter: {
        ...get().currentFilter,
        yearBuilt,
      },
    })),

  saveCurrentView: (name) =>
    set((state) => {
      const id = `${Date.now()}`

      return {
        savedViews: [
          ...state.savedViews,
          {
            id,
            name: name?.trim() || `View ${state.savedViews.length + 1}`,
            filter: state.currentFilter,
          },
        ],
        activeViewId: id,
      }
    }),

  setActiveView: (viewId) =>
    set((state) => {
      const view = state.savedViews.find((item) => item.id === viewId)

      if (!view) {
        return {}
      }

      return {
        activeViewId: viewId,
        currentFilter: view.filter,
      }
    }),
}))