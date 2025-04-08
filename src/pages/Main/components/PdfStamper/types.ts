import { RefObject, Dispatch, SetStateAction } from "react";
import * as fabric from "fabric";

export interface PdfStamperPropTypes {
  setStempedPage: Dispatch<SetStateAction<number[]>>;
  fabricCanvasRef: RefObject<fabric.Canvas | null>;
}
