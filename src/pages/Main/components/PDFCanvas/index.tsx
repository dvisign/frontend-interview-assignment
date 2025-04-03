import { useEffect, useRef } from "react";
import { useStore } from "@/store";
import * as fabric from "fabric";
import Button from "@/components/form/Button";
import useRefCallback from "@/hooks/useRefCallback";
import { getImageByFile } from "@/utils";
import { PdfCanvasStyles } from "./styles";

const FABRIC_CANVAS_WIDTH = 500;
const FABRIC_CANVAS_HEIGHT = parseFloat((FABRIC_CANVAS_WIDTH * Math.sqrt(2)).toFixed(2));

const PDFCanvas = () => {
  const { file } = useStore();
  const [canvasRef, canvasRefCreator] = useRefCallback<HTMLCanvasElement>();
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  const handlePDFDownload = async () => {};

  useEffect(() => {
    if (!file || !canvasRef.current) return;

    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: FABRIC_CANVAS_WIDTH,
      height: FABRIC_CANVAS_HEIGHT,
      selection: false,
    });
    (async () => {
      const image = await getImageByFile(file);

      const img = await fabric.FabricImage.fromURL(image!);

      img.set({
        objectCaching: false,
      });

      fabricCanvasRef.current!.backgroundImage = img;
      fabricCanvasRef.current?.requestRenderAll();
    })();
  }, [file]);

  return (
    <PdfCanvasStyles className="B">
      <div>
        <canvas ref={canvasRefCreator} />
        <Button type="button" onClick={handlePDFDownload}>
          PDF 다운로드
        </Button>
      </div>
    </PdfCanvasStyles>
  );
};

export default PDFCanvas;
