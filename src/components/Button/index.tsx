import { ReactElement } from 'react';
import { Button, ButtonProps as _ButtonProps } from '@blueprintjs/core';

interface CustomButtonProps {
  children: ReactElement | string
}

const CustomButton = (props: _ButtonProps | CustomButtonProps) => {
  return (
    <Button {...props} />
  )
}

export default CustomButton;

export type ButtonProps = _ButtonProps | CustomButtonProps;