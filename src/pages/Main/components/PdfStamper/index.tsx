import { useCallback, useEffect } from "react";
import * as fabric from "fabric";
import { usePdfStore } from "@/stores/pdfStore";
import Button from "@/components/form/Button";
import FileUploader from "@/components/form/FileUploader";
import { getStamp, uploadStamp } from "@/services/stamp";
import { getPdf, uploadPdf, deletePdf } from "@/services/pdf";
import { base64ToFile } from "@/utils";
import { PdfStamperStyles } from "./styles";
import { PdfStamperPropTypes } from "./types";

const PdfStamper = ({ fabricCanvasRef = { current: null } }: PdfStamperPropTypes) => {
  const { file, setFile, stampList, setStampList, selectStamp, setSelectStamp } = usePdfStore();

  const handlePDFChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const upload = await uploadPdf(formData);
    if (upload.success) setFile(base64ToFile(upload.data?.base64, upload.data?.name));
    e.target.value = "";
  }, []);

  const handlePDFRemove = useCallback(async () => {
    await deletePdf();
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

  const onSelectStamp = useCallback(
    (index: number) => {
      setSelectStamp(index);
    },
    [stampList],
  );

  const handleStampDraw = useCallback(async () => {
    if (selectStamp === null || !fabricCanvasRef.current) return;
    const stamper = stampList[selectStamp].base64;
    const addStamper = await fabric.FabricImage.fromURL(stamper);
    const fixedWidth = 100;
    const scale = fixedWidth / addStamper.width!;
    addStamper.set({
      left: 0,
      top: 0,
      scaleX: scale,
      scaleY: scale,
    });
    fabricCanvasRef.current.add(addStamper);
    fabricCanvasRef.current.requestRenderAll();
  }, [stampList, selectStamp]);

  useEffect(() => {
    (async () => {
      const getPdfFiles = await getPdf();
      if (getPdfFiles.success && getPdfFiles.data?.base64 && getPdfFiles.data?.name) {
        setFile(base64ToFile(getPdfFiles.data?.base64, getPdfFiles.data?.name));
      }
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
              return (
                <button
                  className={`stampItems ${selectStamp === i ? "active" : ""}`}
                  key={i}
                  onClick={() => onSelectStamp(i)}>
                  <img src={v.base64} alt={v.name} />
                </button>
              );
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
