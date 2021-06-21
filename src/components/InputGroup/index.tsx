import { InputGroup, InputGroupProps as _InputGroupProps } from '@blueprintjs/core';

const CustomInputGroup = (props: _InputGroupProps) => {
  return (
    <InputGroup {...props} />
  )
}

export default CustomInputGroup;

export type InputGroupProps = _InputGroupProps;