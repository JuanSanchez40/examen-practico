import { create } from 'zustand';

/**
 * Patrón Observador y Almacén de Estado
 */
export const useCarritoStore = create((set) => ({
  items: [],
  addItem: (producto) => set((state) => ({ items: [...state.items, producto] })),
  removeItem: (productoId) => 
    set((state) => ({ items: state.items.filter(item => item.id !== productoId) })),
  clearCart: () => set({ items: [] }),
}));