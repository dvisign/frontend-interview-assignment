import { useEffect, useState } from "react";
import { useStore } from "@/store";
import { getImageByFile } from "@/utils";
import { PdfPreviewStyles } from "./styles";

const PdfPreview = () => {
  const { file } = useStore();
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
