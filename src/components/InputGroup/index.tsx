import { InputGroup, InputGroupProps as _InputGroupProps } from '@blueprintjs/core';

type CustomInputGroupProps = {
  id?: string
}

const CustomInputGroup = (props: _InputGroupProps | CustomInputGroupProps) => {
  return (
    <InputGroup {...props} />
  )
}

export default CustomInputGroup;

export type InputGroupProps = _InputGroupProps | CustomInputGroupProps;