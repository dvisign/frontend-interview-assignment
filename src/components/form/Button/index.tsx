import { ButtonTypes } from "./types";
import { ButtonStyles } from "./styles";

const Button = ({ varint = "PRIMARY", size = "LG", children, ...props }: ButtonTypes) => {
  return (
    <ButtonStyles {...props} varint={varint} size={size}>
      {children}
    </ButtonStyles>
  );
};

export default Button;
