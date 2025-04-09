import { useRef, useCallback } from "react";
import * as fabric from "fabric";
import PdfStamper from "@/pages/Main/components/PdfStamper";
import PdfCanvas from "@/pages/Main/components/PdfCanvas";
import PdfPreview from "@/pages/Main/components/PdfPreview";
import { usePdfStore } from "@/stores/pdfStore";
import { usePreviewStore } from "@/stores/previewStore";
import { pdfFileToImage } from "@/utils";

const FABRIC_CANVAS_WIDTH = 500;
const FABRIC_CANVAS_HEIGHT = parseFloat((FABRIC_CANVAS_WIDTH * Math.sqrt(2)).toFixed(2));

const Main = () => {
  const { file } = usePdfStore();
  const { selectPage, stampPageList } = usePreviewStore();
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  const createCanvas = useCallback(
    (el: HTMLCanvasElement) => {
      if (!el || selectPage === null) return;
      fabricCanvasRef.current?.dispose();
      fabricCanvasRef.current = null;
      if (!file) return;
      fabricCanvasRef.current = new fabric.Canvas(el, {
        width: FABRIC_CANVAS_WIDTH,
        height: FABRIC_CANVAS_HEIGHT,
        selection: false,
      });

      (async () => {
        const stamped = stampPageList.find(v => v.index === selectPage);
        const imageSrc = stamped?.base64 ?? (await pdfFileToImage(file, selectPage + 1)).image;
        console.log("stamped", stamped, stampPageList);
        if (!imageSrc) return;
        const img = await fabric.FabricImage.fromURL(imageSrc);

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
    [file, selectPage, stampPageList],
  );

  return (
    <div>
      <PdfStamper fabricCanvasRef={fabricCanvasRef} />
      <PdfCanvas fabricCanvasRef={fabricCanvasRef} createCanvas={createCanvas} />
      <PdfPreview />
    </div>
  );
};

export default Main;
