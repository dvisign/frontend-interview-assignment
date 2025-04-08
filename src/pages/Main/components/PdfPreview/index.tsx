import { useCallback, useEffect, useState } from "react";
import Button from "@/components/form/Button";
import { usePdfStore } from "@/stores/pdfStore";
import { loadPdfFromFile, renderAllPagesToImages } from "@/utils";
import { PdfPreviewStyles } from "./styles";
import { PdfPreviewPropTypes } from "./types";

const PdfPreview = ({ setSelectPage }: PdfPreviewPropTypes) => {
  const { file } = usePdfStore();
  const [fileImage, setFileImage] = useState<string[] | null>(null);

  const onChangeDocument = useCallback((index: number) => {
    console.log(index);
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
              <div key={i}>
                <Button className="image" onClick={() => onChangeDocument(i)}>
                  <img src={v} />
                </Button>
                <div className="imageIndex">{i + 1}</div>
              </div>
            );
          })}
      </div>
    </PdfPreviewStyles>
  );
};

export default PdfPreview;
