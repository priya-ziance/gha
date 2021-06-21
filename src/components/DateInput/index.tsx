import { DateInput, DateInputProps as _DateInputProps } from '@blueprintjs/datetime';

const CustomDateInput = (props: _DateInputProps) => {
  return (
    <DateInput {...props} />
  )
}

export default CustomDateInput;

export type DateInputProps = _DateInputProps;