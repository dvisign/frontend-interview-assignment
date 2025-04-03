import styled from "@emotion/styled";
import { ButtonStylesProps, BUTTON_VARINTS_INTERFACE, BUTTON_SIZE_INTERFACE } from "./types";

export const ButtonStyles = styled("button")<ButtonStylesProps>(({ varint, size }) => {
  const varintType = BUTTON_VARINTS_INTERFACE?.[varint];
  const sized = BUTTON_SIZE_INTERFACE?.[size];
  return {
    borderRadius: "12px",
    padding: "8px 12px",
    ...((!sized || size === BUTTON_SIZE_INTERFACE.LG) && {
      padding: "8px 12px",
    }),
    ...(sized === BUTTON_SIZE_INTERFACE.SM && {
      padding: "4px 8px",
    }),
    ...(varintType === undefined && {
      backgroundColor: "lightgray",
      color: "#000",
    }),
    ...(varintType === BUTTON_VARINTS_INTERFACE.PRIMARY && {
      backgroundColor: "#5e5e5e",
      color: "#fff",
    }),
    ...(varintType === BUTTON_VARINTS_INTERFACE.DANGER && {
      backgroundColor: "red",
      color: "#5e5e5e",
    }),
  };
});
