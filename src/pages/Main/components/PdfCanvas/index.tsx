import { useCallback, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import { usePdfStore } from "@/stores/pdfStore";
import { usePreviewStore } from "@/stores/previewStore";
import Button from "@/components/form/Button";
import useRefCallback from "@/hooks/useRefCallback";
import { PdfCanvasStyles } from "./styles";
import { PdfCanvasPropTypes } from "./types";
import { isEmpty } from "lodash";

const PdfCanvas = ({ createCanvas = () => null, fabricCanvasRef = { current: null } }: PdfCanvasPropTypes) => {
  const { file } = usePdfStore();
  const { selectPage, stampPageList, setStampPageList, removeStampPage } = usePreviewStore();
  const [canvasRef, canvasRefCreator] = useRefCallback<HTMLCanvasElement>();

  const handlePDFDownload = useCallback(async () => {
    if (!fabricCanvasRef.current || !file) return;

    const originalBytes = await file.arrayBuffer();
    const originalPdf = await PDFDocument.load(originalBytes);
    const newPdf = await PDFDocument.create();
    const totalPages = originalPdf.getPageCount();

    for (let i = 0; i < totalPages; i++) {
      const stamped = stampPageList.find(page => page.index === i);
      if (stamped) {
        const imageBytes = await fetch(stamped.base64).then(res => res.arrayBuffer());
        const pngImage = await newPdf.embedPng(imageBytes);

        const originalPage = await originalPdf.getPage(i);
        const { width, height } = originalPage.getSize();

        const page = newPdf.addPage([width, height]);
        page.drawImage(pngImage, {
          x: 0,
          y: 0,
          width,
          height,
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
  }, [file, stampPageList]);

  const handleStampRemove = useCallback(() => {
    removeStampPage(selectPage);
  }, [file, selectPage]);

  useEffect(() => {
    if (!canvasRef.current) return;
    createCanvas(canvasRef.current);
  }, [file, selectPage, stampPageList]);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const updateStampBase64 = () => {
      const base64 = canvas.toDataURL({
        format: "png",
        multiplier: 2,
      });
      setStampPageList({ index: selectPage, base64 });
    };

    canvas.on("object:modified", updateStampBase64);

    return () => {
      canvas.off("object:modified", updateStampBase64);
    };
  }, [selectPage]);

  return (
    <PdfCanvasStyles className="B">
      <div>
        <canvas ref={canvasRefCreator} />
        <div className="buttonGroup">
          {!isEmpty(stampPageList.find(page => page.index === selectPage)) && (
            <Button type="button" onClick={handleStampRemove}>
              도장제거
            </Button>
          )}
          <Button type="button" onClick={handlePDFDownload}>
            PDF 다운로드
          </Button>
        </div>
      </div>
    </PdfCanvasStyles>
  );
};

export default PdfCanvas;
