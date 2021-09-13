import { DateInput, DateInputProps as _DateInputProps } from '@blueprintjs/datetime';

type CustomDateInputProps = {
  style: any
}

const CustomDateInput = (props: _DateInputProps | CustomDateInputProps) => {
  return (
    <DateInput {...props} />
  )
}

export default CustomDateInput;

export type DateInputProps = _DateInputProps;