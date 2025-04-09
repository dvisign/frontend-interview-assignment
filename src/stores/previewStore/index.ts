import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PreviewStoreTypes, PreviewStampTypes } from "./types";

const storeCreator = (set: any): PreviewStoreTypes => ({
  selectPage: 0,
  setSelectPage: (index: number) => set({ selectPage: index }, false, "setSelectPage"),
  stampPageList: [],
  setStampPageList: (stamp: PreviewStampTypes) => {
    set(
      (state: PreviewStoreTypes) => ({
        stampPageList: [...state.stampPageList.filter(item => item.index !== stamp.index), stamp],
      }),
      false,
      "setStampPageList",
    );
  },
  removeStampPage: (index: number) => {
    set(
      (state: PreviewStoreTypes) => ({
        stampPageList: state.stampPageList.filter(v => v.index !== index),
      }),
      false,
      "removeStampPage",
    );
  },
});

export const usePreviewStore = create<PreviewStoreTypes>()(
  import.meta.env.MODE === "development" ? devtools(storeCreator, { name: "previewStore" }) : storeCreator,
);
