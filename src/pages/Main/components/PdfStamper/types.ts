import { RefObject } from "react";
import * as fabric from "fabric";

export interface PdfStamperPropTypes {
  fabricCanvasRef: RefObject<fabric.Canvas | null>;
}
