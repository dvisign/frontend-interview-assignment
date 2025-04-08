import { useCallback } from "react";
import Button from "@/components/form/Button";
import useRefCallback from "@/hooks/useRefCallback";
import { FileUploaderPropsTypes } from "./types";
import { FileUploaderStyles } from "./styles";

const FileUploader = ({
  accept,
  multiple = false,
  onChange = () => null,
  disabled = false,
  children,
}: FileUploaderPropsTypes) => {
  const [inputRef, inputRefCreator] = useRefCallback<HTMLInputElement>();

  const handleUpload = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <FileUploaderStyles>
      <input
        ref={inputRefCreator}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={onChange}
        disabled={disabled}
      />
      <Button type="button" onClick={handleUpload}>
        {children}
      </Button>
    </FileUploaderStyles>
  );
};

export default FileUploader;
