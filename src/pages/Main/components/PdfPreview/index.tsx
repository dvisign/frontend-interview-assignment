import { useEffect, useState } from "react";
import Button from "@/components/form/Button";
import { usePdfStore } from "@/stores/pdfStore";
import { loadPdfFromFile, renderAllPagesToImages } from "@/utils";
import { PdfPreviewStyles } from "./styles";
import { PdfPreviewPropTypes } from "./types";

const PdfPreview = ({ selectPage, setSelectPage }: PdfPreviewPropTypes) => {
  const { file } = usePdfStore();
  const [fileImage, setFileImage] = useState<string[] | null>(null);

  useEffect(() => {
    console.log("selectPage, setSelectPage", selectPage, setSelectPage);
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
              <div key={v}>
                <Button className="image">
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
