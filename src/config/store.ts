
import { create } from 'zustand'

type ViewState = {
  zoom: number
  latitude: number
  longitude: number
  selection?: { latitude: number, longitude: number } | null
}

type Action = {
  setViewState: (viewState: ViewState) => void
  setSelection: (selection: ViewState['selection']) => void,
}

export const useViewState = create<ViewState & Action>((set) => ({
  latitude: 0,
  longitude: 0,
  zoom: 0,
  selection: null,
  setViewState: (viewState) => set(() => ({ ...viewState })),
  setSelection: (selection: ViewState['selection']) => set(() => ({ selection })),
}))
