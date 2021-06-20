import { Button, ButtonProps as _ButtonProps } from '@blueprintjs/core';

const CustomButton = (props: _ButtonProps) => {
  return (
    <Button {...props} />
  )
}

export default CustomButton;

export type ButtonProps = _ButtonProps;