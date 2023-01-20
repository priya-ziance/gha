import { InputGroup, InputGroupProps as _InputGroupProps } from '@blueprintjs/core';
import { AsYouType } from 'libphonenumber-js';


type PhoneInputGroupProps = {
  id?: string
  onPhone: (value: string) => void;
}

const formatPhoneNumber = (value?: string | number) => {
  if (!value) return '';
  value = value.toString();
  if (value.includes('(') && !value.includes(')')) {
      return value.replace('(', '');
  }
  return new AsYouType('US').input(value);
};

const PhoneInputGroup = (props: _InputGroupProps & PhoneInputGroupProps) => {
  const onInputChange = (e: any) => {
    props.onPhone(formatPhoneNumber(e.target.value));
  };

  return <InputGroup onChange={onInputChange} {...props}/>
}

export default PhoneInputGroup;

export type InputGroupProps = _InputGroupProps | PhoneInputGroupProps;