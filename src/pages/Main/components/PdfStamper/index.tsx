import { useState, useCallback, useEffect } from "react";
import { usePdfStore } from "@/stores/pdfStore";
import Button from "@/components/form/Button";
import FileUploader from "@/components/form/FileUploader";
import { getStamp, uploadStamp } from "@/services/stamp";
import { getPdf } from "@/services/pdf";
import { StampType } from "@/types/stamp";
import { PdfStamperStyles } from "./styles";

const PdfStamper = () => {
  const { file, setFile } = usePdfStore();
  const [stampList, setStampList] = useState<StampType[]>([]);

  const handlePDFChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    e.target.value = "";
  }, []);

  const handlePDFRemove = useCallback(() => {
    setFile(null);
  }, []);

  const handleStampChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || stampList.length >= 5)
        return alert("도장 업로드 갯수를 초과하였습니다. 최대 5개까지 등록 가능합니다.");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name);

      await uploadStamp(formData);
      const getStamper = await getStamp();
      if (getStamper.success) setStampList(getStamper.data);
      e.target.value = "";
    },
    [stampList],
  );

  const handleStampDraw = async () => {};

  useEffect(() => {
    (async () => {
      const getPdfFiles = await getPdf();
      if (getPdfFiles.success) setFile(getPdfFiles.data?.file);
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
