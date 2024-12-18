
import { create } from 'zustand'

type ViewState = {
  zoom: number
  latitude: number
  longitude: number
  selection?: { latitude: number, longitude: number, approximate: boolean } | null
}

type ViewAction = {
  setViewState: (viewState: ViewState) => void
  setSelection: (selection: ViewState['selection']) => void,
}

export const useViewState = create<ViewState & ViewAction>((set) => ({
  latitude: 0,
  longitude: 0,
  zoom: 0,
  selection: null,
  setViewState: (viewState) => set(() => ({ ...viewState })),
  setSelection: (selection: ViewState['selection']) => set(() => ({ selection })),
}))

type NavigationState = {
  returnPath: string | null;
  returnViewState: ViewState | null;
}

type NavigationAction = {
  setNavigationState: (navigationState: NavigationState) => void;
}

export const useNavigationState = create<NavigationState & NavigationAction>((set) => ({
  returnPath: null,
  returnViewState: null,
  setNavigationState: (navigationState) => set(() => ({ ...navigationState })),
}))

type SearchState = {
  onlineOnly: boolean;
}

type SearchAction = {
  setOnlineOnly: (onlineOnly: boolean) => void;
}

export const useSearchState = create<SearchState & SearchAction>((set) => ({
  onlineOnly: false,
  setOnlineOnly: (onlineOnly) => set(() => ({ onlineOnly })),
}))
