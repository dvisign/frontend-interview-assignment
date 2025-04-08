import { useCallback, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import { usePdfStore } from "@/stores/pdfStore";
import Button from "@/components/form/Button";
import useRefCallback from "@/hooks/useRefCallback";
import { PdfCanvasStyles } from "./styles";
import { PDFCanvasPropTypes } from "./types";

const PDFCanvas = ({
  selectPage = 0,
  createCanvas = () => null,
  fabricCanvasRef = { current: null },
}: PDFCanvasPropTypes) => {
  const { file } = usePdfStore();
  const [canvasRef, canvasRefCreator] = useRefCallback<HTMLCanvasElement>();

  const handlePDFDownload = useCallback(async () => {
    if (!fabricCanvasRef.current || !file) return;
    // 1. 원본 PDF를 불러와서
    const originalBytes = await file.arrayBuffer();
    const originalPdf = await PDFDocument.load(originalBytes);

    // 2. 새로운 PDF 문서 생성
    const newPdf = await PDFDocument.create();
    const totalPages = originalPdf.getPageCount();

    // 3. 각 페이지 순회
    for (let i = 0; i < totalPages; i++) {
      // 도장이 찍힌 페이지는 캔버스 이미지로 대체
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
        // 나머지 페이지는 그대로 복사
        const [copiedPage] = await newPdf.copyPages(originalPdf, [i]);
        newPdf.addPage(copiedPage);
      }
    }

    // 4. PDF 저장 및 다운로드
    const pdfBytes = await newPdf.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "stamped.pdf";
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

export default PDFCanvas;
