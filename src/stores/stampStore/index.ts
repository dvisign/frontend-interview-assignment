import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { StampType } from "@/types/stamp";
import { StampStoreTypes } from "./types";

const storeCreator = (set: any): StampStoreTypes => ({
  stampList: [],
  setStampList: (list: StampType[]) => set({ stampList: list }, false, "setStampList"),
  selectStamp: null,
  setSelectStamp: (index: number | null) => set({ selectStamp: index }, false, "setSelectStamp"),
});

export const useStampStore = create<StampStoreTypes>()(
  import.meta.env.MODE === "development" ? devtools(storeCreator, { name: "stampStore" }) : storeCreator,
);
