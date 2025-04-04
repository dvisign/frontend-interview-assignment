import { useEffect, useRef } from "react";
import { usePdfStore } from "@/stores/pdfStore";
import * as fabric from "fabric";
import Button from "@/components/form/Button";
import useRefCallback from "@/hooks/useRefCallback";
import { getImageByFile } from "@/utils";
import { PdfCanvasStyles } from "./styles";

const FABRIC_CANVAS_WIDTH = 500;
const FABRIC_CANVAS_HEIGHT = parseFloat((FABRIC_CANVAS_WIDTH * Math.sqrt(2)).toFixed(2));

const PDFCanvas = () => {
  const { file } = usePdfStore();
  const [canvasRef, canvasRefCreator] = useRefCallback<HTMLCanvasElement>();
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  const handlePDFDownload = async () => {};

  useEffect(() => {
    if (!canvasRef.current) return;
    fabricCanvasRef.current?.dispose();
    fabricCanvasRef.current = null;
    // 파일이 없을 경우 캔버스 dispose 및 초기화
    if (!file) return;

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
