import { create } from "zustand"

interface ConnectedStoresState {
  connectedStores: string[]
  connectStore: (store: string) => void
}

export const useConnectedStores = create<ConnectedStoresState>((set) => ({
  connectedStores: [],
  connectStore: (store) =>
    set((state) =>
      state.connectedStores.includes(store)
        ? state
        : { connectedStores: [...state.connectedStores, store] }
    ),
}))
