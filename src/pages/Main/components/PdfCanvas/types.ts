import { RefObject } from "react";
import * as fabric from "fabric";

export interface PDFCanvasPropTypes {
  selectPage: number;
  fabricCanvasRef: RefObject<fabric.Canvas | null>;
  createCanvas: (el: HTMLCanvasElement) => void;
}
