import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { StampType } from "@/types/stamp";

type Store = {
  file: File | null;
  setFile: (file: File | null) => void;
  stampList: StampType[];
  setStampList: (list: StampType[]) => void;
  selectStamp: number | null;
  setSelectStamp: (index: number | null) => void;
};

const storeCreator = (set: any): Store => ({
  file: null,
  setFile: (file: File | null) => set({ file }, false, "setFile"),
  stampList: [],
  setStampList: (list: StampType[]) => set({ stampList: list }, false, "setStampList"),
  selectStamp: null,
  setSelectStamp: (index: number | null) => set({ selectStamp: index }, false, "setSelectStamp"),
});

// 개발 모드일 때만 devtools 적용
export const usePdfStore = create<Store>()(
  import.meta.env.MODE === "development" ? devtools(storeCreator, { name: "useStore" }) : storeCreator,
);
