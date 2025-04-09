import { useCallback, useEffect, useState } from "react";
import PreviewImage from "../PreviewImage";
import { usePdfStore } from "@/stores/pdfStore";
import { usePreviewStore } from "@/stores/previewStore";
import { loadPdfFromFile, renderAllPagesToImages } from "@/utils";
import { PdfPreviewStyles } from "./styles";

const PdfPreview = () => {
  const { file } = usePdfStore();
  const { selectPage, setSelectPage } = usePreviewStore();
  const [fileImage, setFileImage] = useState<string[] | null>(null);

  const onChangeDocument = useCallback((index: number) => {
    setSelectPage(index);
  }, []);

  useEffect(() => {
    if (!file) {
      return setFileImage(null);
    }
    (async () => {
      const pdf = await loadPdfFromFile(file);
      const allImage = await renderAllPagesToImages(pdf);
      setFileImage(allImage ?? null);
    })();
  }, [file]);

  return (
    <PdfPreviewStyles className="C">
      <div className="top">
        {fileImage &&
          fileImage.map((v, i) => {
            return (
              <PreviewImage key={i} active={i === selectPage} index={i} src={v} onChange={onChangeDocument} />
              // <div key={i} className={`previewItmes ${i === selectPage ? "active" : ""}`}>
              //   <Button className="image" onClick={() => onChangeDocument(i)}>
              //     <img loading="lazy" src={v} />
              //   </Button>
              //   <div className="imageIndex">{i + 1}</div>
              // </div>
            );
          })}
      </div>
    </PdfPreviewStyles>
  );
};

export default PdfPreview;
