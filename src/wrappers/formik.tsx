import { FormikProps } from 'formik';
import get from 'lodash/get';
import moment from 'moment';
import { Intent } from '@blueprintjs/core';

import {
  DateInput,
  FormGroup,
  InputGroup,
  Switch,
  TextArea
} from '../components';

import { getMomentFormatter } from '../utils/helpers'


interface ChildrenProps {
  wrapperProps: {
    getSwitchInputFormGroup: (key: string) => {};
    getInputFormGroup: (key: string) => {};
    getDateInputFormGroup: (key: string) => {};
    getTextAreaInputFormGroup: (key: string) => {};
  };
  formikProps: FormikProps<any>;
}

const getFormIntent = (error: any) => {
  if (error) { 
    return Intent.DANGER
  }

  return Intent.NONE
}


const formikWrapper = (child: (props: ChildrenProps) => JSX.Element, fields: any) => (formikProps: FormikProps<any>) => {
  const {
    values,
    errors,
    handleChange,
    setFieldValue
  } = formikProps;
  const onFormDateChange = (field: string) => (date: Date) => {
    setFieldValue(field, moment(date).toISOString());
  }
  
  const getSwitchInputFormGroup = (key: string) => {
    const onChange = (e: any) => {
      setFieldValue(key, get(e, 'target.checked'))
    }

    return (
      <FormGroup
        intent={Intent.PRIMARY}
        label={get(fields, key, { name: '' }).name}
        labelFor={`switch_input__${key}`}
      >
        <Switch
          id={`switch-input__${key}`}
          large checked={values[key]}
          onChange={onChange}
        />
      </FormGroup> 
    )
  }

  const getInputFormGroup = (key: string) => (
    <FormGroup
      intent={getFormIntent(errors[key])}
      label={get(fields, key, { name: '' }).name}
      labelFor={`text-input__${key}`}
      helperText={errors[key]}
    >
      <InputGroup
        id={`text-input__${key}`}
        intent={getFormIntent(errors[key])}
        onChange={handleChange(key)}
        value={values[key]}
      />
    </FormGroup>
  )

  const getDateInputFormGroup = (key: string) => (
    <FormGroup
      intent={getFormIntent(errors[key])}
      label={get(fields, key, { name: '' }).name}
      helperText={errors[key]}
    >
      <DateInput
        value={values[key] ? moment(values[key]).toDate() : null}
        onChange={onFormDateChange(key)}
        {...getMomentFormatter('LL')}
      />
    </FormGroup>
  );

  const getTextAreaInputFormGroup = (key: string) => (
    <FormGroup
      intent={getFormIntent(errors[key])}
      label={get(fields, key, { name: '' }).name}
      labelFor={`text-area__${key}`}
      helperText={errors[key]}
    >
      <TextArea
        id={`text-area__${key}`}
        intent={getFormIntent(errors[key])}
        onChange={handleChange(key)}
        value={values[key]}
      />
    </FormGroup>
  )
  return (
    <>
      {child({
        wrapperProps: {
          getDateInputFormGroup,
          getInputFormGroup,
          getSwitchInputFormGroup,
          getTextAreaInputFormGroup
        },
        formikProps
      })}
    </>
  )
}

export default formikWrapper;