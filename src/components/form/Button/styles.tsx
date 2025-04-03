import styled from "@emotion/styled";
import { ButtonStylesProps, BUTTON_VARINTS_INTERFACE, BUTTON_SIZE_INTERFACE } from "./types";

export const ButtonStyles = styled("button")<ButtonStylesProps>(({ varint, size }) => {
  const varintType = varint && BUTTON_VARINTS_INTERFACE?.[varint] ? true : false;
  const sized = size && BUTTON_SIZE_INTERFACE?.[size] ? true : false;
  return {
    borderRadius: "12px",
    padding: "8px 12px",
    ...(!sized || size === BUTTON_SIZE_INTERFACE.LG
      ? {
          padding: "8px 12px",
        }
      : {}),
    ...(sized && size === BUTTON_SIZE_INTERFACE.SM
      ? {
          padding: "4px 8px",
        }
      : {}),
    ...(!varintType && {
      backgroundColor: "lightgray",
      color: "#000",
    }),
    ...(varintType && varint === BUTTON_VARINTS_INTERFACE.PRIMARY
      ? {
          backgroundColor: "#5e5e5e",
          color: "#fff",
        }
      : {}),
    ...(varintType && varint === BUTTON_VARINTS_INTERFACE.DANGER
      ? {
          backgroundColor: "red",
          color: "#5e5e5e",
        }
      : {}),
  };
});
