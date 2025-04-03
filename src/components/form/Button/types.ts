// 버튼 VARINT 타입
export const BUTTON_VARINTS_INTERFACE = { PRIMARY: "PRIMARY", DANGER: "DANGER" } as const;
export type BUTTON_VARINT_TYPE = (typeof BUTTON_VARINTS_INTERFACE)[keyof typeof BUTTON_VARINTS_INTERFACE];
// 버튼 Size타입
export const BUTTON_SIZE_INTERFACE = { LG: "LG", SM: "SM" } as const;
export type BUTTON_SIZE_TYPE = (typeof BUTTON_SIZE_INTERFACE)[keyof typeof BUTTON_SIZE_INTERFACE];

// 버튼 props type
export interface ButtonTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  varint?: BUTTON_VARINT_TYPE;
  size?: BUTTON_SIZE_TYPE;
}

// 버튼 스타일드 컴포넌트 props type
export interface ButtonStylesProps {
  varint: BUTTON_VARINT_TYPE;
  size: BUTTON_SIZE_TYPE;
}
