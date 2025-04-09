export type PreviewStampTypes = {
  index: number;
  base64: string;
};

export type PreviewStoreTypes = {
  selectPage: number;
  setSelectPage: (index: number) => void;
  stampPageList: PreviewStampTypes[];
  setStampPageList: (stamp: PreviewStampTypes) => void;
  removeStampPage: (index: number) => void;
};
