import { useEffect } from "react";
import { usePdfStore } from "@/stores/pdfStore";
import Button from "@/components/form/Button";
import useRefCallback from "@/hooks/useRefCallback";
import { PdfCanvasStyles } from "./styles";
import { PDFCanvasPropTypes } from "./types";

const PDFCanvas = ({ selectPage, createCanvas = () => null }: PDFCanvasPropTypes) => {
  const { file } = usePdfStore();
  const [canvasRef, canvasRefCreator] = useRefCallback<HTMLCanvasElement>();

  const handlePDFDownload = async () => {};

  useEffect(() => {
    if (!canvasRef.current) return;
    createCanvas(canvasRef.current);
  }, [file, selectPage]);

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
