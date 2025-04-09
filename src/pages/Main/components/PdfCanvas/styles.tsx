import styled from "@emotion/styled";

export const PdfCanvasStyles = styled("div")(() => {
  return {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    canvas: {
      width: "100%",
      height: "100%",
    },
    "& .buttonGroup": {
      position: "absolute",
      right: "12px",
      top: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
  } as const;
});
