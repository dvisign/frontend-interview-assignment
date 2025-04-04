import { useState, useCallback, useEffect } from "react";
import { usePdfStore } from "@/stores/pdfStore";
import Button from "@/components/form/Button";
import FileUploader from "@/components/form/FileUploader";
import { getStamp, uploadStamp } from "@/services/stamp";
import { PdfStamperStyles } from "./styles";
import { STAMP_LIST_TYPE } from "./types";

const PdfStamper = () => {
  const { file, setFile } = usePdfStore();
  const [stampList, setStampList] = useState<STAMP_LIST_TYPE[]>([]);

  const handlePDFChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    e.target.value = "";
  }, []);

  const handlePDFRemove = useCallback(() => {
    setFile(null);
  }, []);

  const handleStampChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);

    await uploadStamp(formData);
    const getStamper = await getStamp();
    if (getStamper.success) setStampList(getStamper.data);
    e.target.value = "";
  }, []);

  const handleStampDraw = async () => {};

  useEffect(() => {
    (async () => {
      const getStamper = await getStamp();
      if (getStamper.success) setStampList(getStamper.data);
    })();
  }, []);

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
            <FileUploader accept=".png" onChange={handleStampChange}>
              도장 업로드
            </FileUploader>
          </div>

          <div className="stamps">
            {/* <img src={Stamp1} /> */}
            {stampList.map((v, i) => {
              return <img key={i} src={v.base64} alt={v.name} />;
            })}
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
