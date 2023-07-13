import { FC, PropsWithChildren } from "react";
import "./ButtonUI.scss";

interface ButtonProps {
  style?: object;
  children?: React.ReactChild | React.ReactNode;
  onClick?: React.MouseEventHandler;
}

const ButtonUI: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  onClick,
  style,
}: ButtonProps) => {
  return (
    <button className="buttonUI" onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default ButtonUI;
