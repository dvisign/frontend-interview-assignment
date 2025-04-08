import { useCallback, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import { usePdfStore } from "@/stores/pdfStore";
import Button from "@/components/form/Button";
import useRefCallback from "@/hooks/useRefCallback";
import { PdfCanvasStyles } from "./styles";
import { PdfCanvasPropTypes } from "./types";

const PdfCanvas = ({
  selectPage = 0,
  createCanvas = () => null,
  fabricCanvasRef = { current: null },
}: PdfCanvasPropTypes) => {
  const { file } = usePdfStore();
  const [canvasRef, canvasRefCreator] = useRefCallback<HTMLCanvasElement>();

  const handlePDFDownload = useCallback(async () => {
    if (!fabricCanvasRef.current || !file) return;
    const originalBytes = await file.arrayBuffer();
    const originalPdf = await PDFDocument.load(originalBytes);

    const newPdf = await PDFDocument.create();
    const totalPages = originalPdf.getPageCount();

    for (let i = 0; i < totalPages; i++) {
      if (i === selectPage) {
        const pngDataUrl = fabricCanvasRef.current.toDataURL();
        const imageBytes = await fetch(pngDataUrl).then(res => res.arrayBuffer());
        const pngImage = await newPdf.embedPng(imageBytes);

        const page = newPdf.addPage([pngImage.width, pngImage.height]);
        page.drawImage(pngImage, {
          x: 0,
          y: 0,
          width: pngImage.width,
          height: pngImage.height,
        });
      } else {
        const [copiedPage] = await newPdf.copyPages(originalPdf, [i]);
        newPdf.addPage(copiedPage);
      }
    }

    const pdfBytes = await newPdf.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file?.name || "stamped.pdf";
    link.click();
  }, [file, selectPage]);

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

export default PdfCanvas;
