import { useMemo } from "react";
import isEmpty from "lodash/isEmpty";
import Button from "@/components/form/Button";
import { usePreviewStore } from "@/stores/previewStore";
import { PreviewImagePropTypes } from "./types";

const PreviewImage = ({ active = false, index = 0, src = "", onChange = () => null }: PreviewImagePropTypes) => {
  const { stampPageList } = usePreviewStore();
  const resource = useMemo(() => {
    const filterData = stampPageList.find(v => v.index === index);
    return isEmpty(filterData) ? { base64: src } : filterData;
  }, [src, stampPageList, index]);

  return (
    <div className={`previewItmes ${active ? "active" : ""}`}>
      <Button className="image" onClick={() => onChange(index)}>
        <img src={resource.base64} />
      </Button>
      <div className="imageIndex">{index}</div>
    </div>
  );
};

export default PreviewImage;
