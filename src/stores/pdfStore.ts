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

// 개발 모드일 때만 devtools 적용
export const usePdfStore = create<Store>()(
  import.meta.env.MODE === "development" ? devtools(storeCreator, { name: "useStore" }) : storeCreator,
);
