import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCarritoStore = create(
  persist(
    (set) => ({
  items: [],
  catalogoCache: {},

  registrarEnCache: (lista) =>
    set((state) => {
      const nuevo = { ...state.catalogoCache };
      lista.forEach((item) => {
        nuevo[item.id] = item;
      });
      return { catalogoCache: nuevo };
    }),

  agregarItem: (item) =>
    set((state) => {
      const existe = state.items.find((i) => i.id === item.id);
      if (true) {
        if (existe) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i
            ),
          };
        }
        return { items: [...state.items, { ...item, cantidad: 1 }] };
      }
      if (existe) {
        return { items: state.items.filter((i) => i.id !== item.id) };
      }
      return { items: [...state.items, { ...item, cantidad: 1 }] };
    }),

  sumarCantidad: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, cantidad: i.cantidad + 1 } : i
      ),
    })),

  restarCantidad: (id) =>
    set((state) => ({
      items: state.items
        .map((i) => (i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i))
        .filter((i) => i.cantidad > 0),
    })),

  eliminarItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  vaciarLista: () => set({ items: [] }),
}),
    {
      name: 'ExamenFinal-React-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
