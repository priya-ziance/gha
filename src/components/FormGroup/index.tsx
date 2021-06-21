import { ReactElement } from 'react';

import { FormGroup, FormGroupProps as _FormGroupProps } from '@blueprintjs/core';

interface CustomFormGroupProps {
  children: ReactElement | string
}

const CustomFormGroup = (props: _FormGroupProps | CustomFormGroupProps) => {
  return (
    <FormGroup {...props} />
  )
}

export default CustomFormGroup;

export type FormGroupProps = _FormGroupProps | CustomFormGroupProps;