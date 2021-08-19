import { TextArea, TextAreaProps as _TextAreaProps } from '@blueprintjs/core';

const CustomTextArea = (props: _TextAreaProps) => {
  return (
    <TextArea {...props} />
  )
}

export default CustomTextArea;

export type TextAreaProps = _TextAreaProps;