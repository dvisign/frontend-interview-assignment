import { StampType } from "@/types/stamp";

export type StampStoreTypes = {
  stampList: StampType[];
  setStampList: (list: StampType[]) => void;
  selectStamp: number | null;
  setSelectStamp: (index: number | null) => void;
};
