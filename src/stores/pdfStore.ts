import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Store = {
  file: File | null;
  setFile: (file: File | null) => void;
};

const storeCreator = (set: any): Store => ({
  file: null,
  setFile: (file: File | null) => set({ file }, false, "setFile"),
});

export const usePdfStore = create<Store>()(
  import.meta.env.MODE === "development" ? devtools(storeCreator, { name: "pdfStore" }) : storeCreator,
);
