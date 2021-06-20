import { ReactElement } from 'react';
import { Link, LinkProps } from "react-router-dom";

import Button, { ButtonProps } from '../Button';

interface AnchorButtonProps {
  linkProps?: LinkProps;
  buttonProps?: ButtonProps;
  children: ReactElement | string
}

const AnchorButton = (props: AnchorButtonProps) => {
  return (
    <Link {...props.linkProps} className='anchor-button'>
      <Button
        {...props.buttonProps}
      >
          {props.children}
      </Button>
    </Link>
  )
};

export default AnchorButton;