import { To, useNavigate } from "react-router-dom";
import { ReactChild, ReactChildren } from "react";
import Button from "../util/Button";

export interface NavButtonParams {
  to: To,
  className?: string,
  outline?: boolean,
  children?: ReactChild | ReactChildren | ReactChild[] | ReactChildren[],
  disabled?: boolean
}

const NavButton = (props: Readonly<NavButtonParams>) => {
  const navigate = useNavigate();
  return <Button className={props.className} onClick={() => navigate(props.to)} type="button" outline={props.outline} disabled={props.disabled}>{props.children}</Button>;
};

export default NavButton;
