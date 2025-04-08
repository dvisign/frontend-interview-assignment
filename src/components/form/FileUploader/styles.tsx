import styled from "@emotion/styled";

export const FileUploaderStyles = styled("div")(() => {
  return {
    "& > input": {
      display: "none",
    },
  } as const;
});
