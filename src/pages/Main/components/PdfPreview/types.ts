import { Dispatch, SetStateAction } from "react";

export interface PdfPreviewPropTypes {
  selectPage: number;
  setSelectPage: Dispatch<SetStateAction<number>>;
}
