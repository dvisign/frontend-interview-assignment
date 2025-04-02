import { useRef } from "react";
import { useStore } from "@/store";
import Button from "@/components/form/Button";
import { PdfStamperStyles } from "./styles";

import Stamp1 from "../../../../files/stamp-1.jpg";

const PdfStamper = () => {
  const { file, setFile } = useStore();

  const stampInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setFile(file!);

    e.target.value = "";
  };

  const handleStampUpload = () => {
    stampInputRef.current?.click();
  };

  const handlePDFUpload = () => {
    pdfInputRef.current?.click();
  };

  const handlePDFRemove = () => {
    setFile(null);
  };

  const handleStampDraw = async () => {};

  return (
    <PdfStamperStyles className="A">
      <div className="top">
        <div>
          <div className="pdfUpload">
            <input ref={pdfInputRef} type="file" onChange={handlePDFChange} style={{ display: "none" }} />
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
            <input ref={stampInputRef} type="file" accept=".png" onChange={() => {}} style={{ display: "none" }} />
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
