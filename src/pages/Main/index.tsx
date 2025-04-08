import { useRef, useCallback, useState } from "react";
import * as fabric from "fabric";
import PdfStamper from "@/pages/Main/components/PdfStamper";
import PdfCanvas from "@/pages/Main/components/PdfCanvas";
import PdfPreview from "@/pages/Main/components/PdfPreview";
import { usePdfStore } from "@/stores/pdfStore";
import { pdfFileToImage } from "@/utils";

const FABRIC_CANVAS_WIDTH = 500;
const FABRIC_CANVAS_HEIGHT = parseFloat((FABRIC_CANVAS_WIDTH * Math.sqrt(2)).toFixed(2));

const Main = () => {
  const { file } = usePdfStore();
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [selectPage, setSelectPage] = useState(0);
  const createCanvas = useCallback(
    (el: HTMLCanvasElement) => {
      if (!el) return;
      fabricCanvasRef.current?.dispose();
      fabricCanvasRef.current = null;
      if (!file) return;

      fabricCanvasRef.current = new fabric.Canvas(el, {
        width: FABRIC_CANVAS_WIDTH,
        height: FABRIC_CANVAS_HEIGHT,
        selection: false,
      });
      (async () => {
        const image = await pdfFileToImage(file, selectPage + 1);
        const img = await fabric.FabricImage.fromURL(image.image!);

        const scaleX = FABRIC_CANVAS_WIDTH / img.width!;
        const scaleY = FABRIC_CANVAS_HEIGHT / img.height!;
        const scale = Math.min(scaleX, scaleY);
        img.scale(scale);

        img.set({
          objectCaching: false,
          left: (FABRIC_CANVAS_WIDTH - img.getScaledWidth()) / 2,
          top: (FABRIC_CANVAS_HEIGHT - img.getScaledHeight()) / 2,
        });

        fabricCanvasRef.current!.backgroundImage = img;
        fabricCanvasRef.current?.requestRenderAll();
      })();
    },
    [file, selectPage],
  );
  return (
    <div>
      <PdfStamper fabricCanvasRef={fabricCanvasRef} />
      <PdfCanvas createCanvas={createCanvas} />
      <PdfPreview selectPage={selectPage} setSelectPage={setSelectPage} />
    </div>
  );
};

export default Main;
