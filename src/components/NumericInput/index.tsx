import { NumericInput, NumericInputProps as _NumericInputProps } from '@blueprintjs/core';

type CustomNumericInputProps = {
  id?: string
}

const CustomNumericInput = (props: _NumericInputProps | CustomNumericInputProps) => {
  return (
    <NumericInput {...props} />
  )
}

export default CustomNumericInput;

export type NumericInputProps = _NumericInputProps | CustomNumericInputProps;