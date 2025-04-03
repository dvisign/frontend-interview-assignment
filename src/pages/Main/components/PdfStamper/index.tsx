import { useCallback } from "react";
import { useStore } from "@/store";
import Button from "@/components/form/Button";
import useRefCallback from "@/hooks/useRefCallback";
import { PdfStamperStyles } from "./styles";

import Stamp1 from "../../../../files/stamp-1.jpg";

const PdfStamper = () => {
  const { file, setFile } = useStore();

  const [stampInputRef, stampRefCreator] = useRefCallback<HTMLInputElement>();
  const [pdfInputRef, pdfRefCreator] = useRefCallback<HTMLInputElement>();

  const handlePDFChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    e.target.value = "";
  }, []);

  const handleStampUpload = useCallback(() => {
    stampInputRef.current?.click();
  }, []);

  const handlePDFUpload = useCallback(() => {
    pdfInputRef.current?.click();
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
            <input ref={pdfRefCreator} type="file" onChange={handlePDFChange} style={{ display: "none" }} />
            <Button type="button" onClick={handlePDFUpload}>
              PDF 업로드
            </Button>
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
            <input ref={stampRefCreator} type="file" accept=".png" onChange={() => {}} style={{ display: "none" }} />
            <Button type="button" onClick={handleStampUpload}>
              도장 업로드
            </Button>
          </div>

          <div className="stamps">
            <img src={Stamp1} />
          </div>
        </div>
      </div>

      <div className="bottom">
        <Button type="button" onClick={handleStampDraw}>
          도장 업로드
        </Button>
      </div>
    </PdfStamperStyles>
  );
};

export default PdfStamper;
