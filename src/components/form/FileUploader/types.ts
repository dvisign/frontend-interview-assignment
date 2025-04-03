import { InputHTMLAttributes, ChangeEvent, ReactNode } from "react";

export interface FileUploaderPropsTypes {
  accept?: Pick<InputHTMLAttributes<HTMLInputElement>, "accept">["accept"];
  multiple?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  children: ReactNode;
}
