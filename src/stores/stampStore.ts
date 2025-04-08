import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { StampType } from "@/types/stamp";

type Store = {
  stampList: StampType[];
  setStampList: (list: StampType[]) => void;
  selectStamp: number | null;
  setSelectStamp: (index: number | null) => void;
};

const storeCreator = (set: any): Store => ({
  stampList: [],
  setStampList: (list: StampType[]) => set({ stampList: list }, false, "setStampList"),
  selectStamp: null,
  setSelectStamp: (index: number | null) => set({ selectStamp: index }, false, "setSelectStamp"),
});

export const useStampStore = create<Store>()(
  import.meta.env.MODE === "development" ? devtools(storeCreator, { name: "stampStore" }) : storeCreator,
);
