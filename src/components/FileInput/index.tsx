import { FileInput, FileInputProps as _FileInputProps } from '@blueprintjs/core';

type CustomFileInputProps = {
  id?: string
}

const CustomFileInput = (props: _FileInputProps | CustomFileInputProps) => {
  return (
    <FileInput {...props} />
  )
}

export default CustomFileInput;

export type FileInputProps = _FileInputProps | CustomFileInputProps;