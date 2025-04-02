import styled from "@emotion/styled";

export const PdfStamperStyles = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  "> div": {
    padding: "12px",
  },
  ".top": {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    ".stampUpload": {
      minHeight: "48px",
    },
    ".stamps": {
      display: "flex",
      gap: "8px",
      minHeight: "54px",
      img: {
        cursor: "pointer",
        width: "48px",
        height: "48px",
        borderRadius: "4px",
      },
    },
    ".pdfUpload": {
      minHeight: "48px",
    },
  },
});
