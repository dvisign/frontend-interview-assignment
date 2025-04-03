import styled from "@emotion/styled";

export const PdfCanvasStyles = styled("div")({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  canvas: {
    width: "100%",
    height: "100%",
  },
  button: {
    position: "absolute",
    right: "12px",
    top: "12px",
  },
});
