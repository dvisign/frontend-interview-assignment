import { useCallback } from "react";
import { useStore } from "@/store";
import Button from "@/components/form/Button";
import FileUploader from "@/components/form/FileUploader";
import { PdfStamperStyles } from "./styles";

import Stamp1 from "../../../../files/stamp-1.jpg";

const PdfStamper = () => {
  const { file, setFile } = useStore();

  const handlePDFChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    e.target.value = "";
  }, []);

  const handlePDFRemove = useCallback(() => {
    setFile(null);
  }, []);

  const handleStampDraw = async () => {};

  return (
    <PdfStamperStyles className="A">
      <div className="top">
        <div>
          <div className="pdfUpload">
            <FileUploader onChange={handlePDFChange}>PDF 업로드</FileUploader>
          </div>
          <div className="pdfFile">
            {!!file?.name && (
              <>
                📄 파일명: <strong>{file?.name}</strong>
                <Button
                  type="button"
                  onClick={handlePDFRemove}
                  varint="PRIMARY"
                  size="SM"
                  style={{
                    backgroundColor: "transparent",
                    color: "#5e5e5e",
                    fontSize: "16px",
                  }}>
                  X
                </Button>
              </>
            )}
          </div>
        </div>

        <div>
          <div className="stampUpload">
            <FileUploader accept=".png">도장 업로드</FileUploader>
          </div>

          <div className="stamps">
            <img src={Stamp1} />
          </div>
        </div>
      </div>

      <div className="bottom">
        <Button type="button" onClick={handleStampDraw}>
          도장 찍기
        </Button>
      </div>
    </PdfStamperStyles>
  );
};

export default PdfStamper;
