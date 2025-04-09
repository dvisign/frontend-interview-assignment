import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PdfStoreTypes } from "./types";

const storeCreator = (set: any): PdfStoreTypes => ({
  file: null,
  setFile: (file: File | null) => set({ file }, false, "setFile"),
});

export const usePdfStore = create<PdfStoreTypes>()(
  import.meta.env.MODE === "development" ? devtools(storeCreator, { name: "pdfStore" }) : storeCreator,
);
