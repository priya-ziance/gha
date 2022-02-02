import { FormikProps } from 'formik';
import get from 'lodash/get';
import moment from 'moment';
import { Intent } from '@blueprintjs/core';
import { TimePicker } from '@blueprintjs/datetime';

import {
  DateInput,
  FormGroup,
  InputGroup,
  Switch,
  NumericInput,
  TextArea
} from '../components';

import { getMomentFormatter } from '../utils/helpers'


interface IInputOptions {
  // These are the props for the main component
  childProps: Object
}

interface ChildrenProps {
  wrapperProps: {
    getSwitchInputFormGroup: (key: string, props?: IInputOptions) => {};
    getInputFormGroup: (key: string, props?: IInputOptions) => {};
    getDateInputFormGroup: (key: string, props?: IInputOptions) => {};
    getNumericInputFormGroup: (key: string, props?: IInputOptions) => {};
    getTextAreaInputFormGroup: (key: string, props?: IInputOptions) => {};
    getTimeInputFormGroup: (key: string, props?: IInputOptions) => {};
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

  const getTimeInputFormGroup = (key: string, props?: IInputOptions) => {
    const cProps = get(props, 'childProps', {});

    return (
      <FormGroup
        intent={getFormIntent(errors[key])}
        label={get(fields, key, { name: '' }).name}
        helperText={errors[key]}
      >
        <TimePicker
          value={values[key] ? moment(values[key]).toDate() : null}
          onChange={onFormDateChange(key)}
          useAmPm
          {...cProps}
        />
      </FormGroup>
    )
  };

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
  );

  const getNumericInputFormGroup = (key: string, props?: IInputOptions) => {
    const cProps = get(props, 'childProps', {});
    
    return (
      <FormGroup
        intent={getFormIntent(errors[key])}
        label={get(fields, key, { name: '' }).name}
        labelFor={`text-area__${key}`}
        helperText={errors[key]}
      >
        <NumericInput
          id={`numeric-input__${key}`}
          intent={getFormIntent(errors[key])}
          onValueChange={(_: any, value: string) => {
            setFieldValue(key, value)
          }}
          value={values[key]}
          {...cProps}
        />
      </FormGroup>
    );
  }

  return (
    <>
      {child({
        wrapperProps: {
          getDateInputFormGroup,
          getInputFormGroup,
          getNumericInputFormGroup,
          getSwitchInputFormGroup,
          getTextAreaInputFormGroup,
          getTimeInputFormGroup
        },
        formikProps
      })}
    </>
  )
}

export default formikWrapper;