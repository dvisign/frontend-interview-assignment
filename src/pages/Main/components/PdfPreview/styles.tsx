import styled from "@emotion/styled";

export const PdfPreviewStyles = styled("div")(() => {
  return {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "& > div": {
      padding: "12px",
    },
    "& .top": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflowX: "hidden",
      overflowY: "auto",
      gap: "12px",
      flex: "1",
      width: "100%",
      height: "100%",
      "& .previewItmes": {
        "&.active": {
          "& .image": {
            border: "1px solid blue",
          },
        },
        "& .image": {
          cursor: "pointer",
          display: "flex",
          flex: "0 0 auto",
          flexDirection: "column",
          overflow: "hidden",
          width: "160px",
          borderRadius: "12px",
          backgroundColor: "aliceblue",
          img: {
            width: "100%",
            height: "auto",
          },
        },
        "& .imageIndex": {
          display: "flex",
          justifyContent: "center",
          padding: "4px 0",
          fontSize: "12px",
        },
      },
    },
  } as const;
});
