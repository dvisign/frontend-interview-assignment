import { useEffect, useState } from "react";
import { usePdfStore } from "@/stores/pdfStore";
import { getImageByFile } from "@/utils";
import { PdfPreviewStyles } from "./styles";

const PdfPreview = () => {
  const { file } = usePdfStore();
  const [fileImage, setFileImage] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    (async () => {
      setFileImage((await getImageByFile(file)) ?? "");
    })();
  }, [file]);

  return (
    <PdfPreviewStyles className="C">
      <div className="top">
        {fileImage && (
          <div>
            <div className="image">
              <img src={fileImage} />
            </div>
            <div className="imageIndex">1</div>
          </div>
        )}
      </div>
    </PdfPreviewStyles>
  );
};

export default PdfPreview;
