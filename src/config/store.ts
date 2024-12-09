
import { create } from 'zustand'

type ViewState = {
  zoom: number
  latitude: number
  longitude: number
}

type Action = {
  setViewState: (viewState: ViewState) => void
}

export const useViewState = create<ViewState & Action>((set) => ({
  latitude: 0,
  longitude: 0,
  zoom: 0,
  setViewState: (viewState) => set(() => ({ ...viewState })),
}))
