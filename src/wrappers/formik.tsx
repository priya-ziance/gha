import { FormikProps } from 'formik';
import get from 'lodash/get';
import moment from 'moment';
import { Intent } from '@blueprintjs/core';
import { TimePicker } from '@blueprintjs/datetime';

import {
  DateInput,
  FormGroup,
  FormItemSelect,
  InputGroup,
  PhoneInput,
  Switch,
  NumericInput,
  TextArea
} from '../components';
import { getMomentFormatter, capitalizeFirstLetter } from '../utils/helpers'
import AutocompleteInput, { AutocompletResult } from '../controlled-components/AutocompleteInput';


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
    getSelectFieldInputFormGroup: (key: string, props?: IInputOptions) => {};
    getTextAreaInputFormGroup: (key: string, props?: IInputOptions) => {};
    getTimeInputFormGroup: (key: string, props?: IInputOptions) => {};
    getAutocompleteInputFormGroup: (key: string, props?: IInputOptions) => {};
    getPhoneInputFormGroup: (key: string, props?: IInputOptions) => {};
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

  const getInputFormGroup = (key: string, props?: IInputOptions) => {
    const cProps = get(props, 'childProps', {});

    return (
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
          {...cProps}
        />
      </FormGroup>
    )
  }

  const getDateInputFormGroup = (key: string) => {
    const minDate = new Date();
    minDate.setFullYear(1900);

    return (
      <FormGroup
        intent={getFormIntent(errors[key])}
        label={get(fields, key, { name: '' }).name}
        helperText={errors[key]}
      >
        <DateInput
          minDate={minDate}
          value={values[key] ? moment(values[key]).toDate() : null}
          onChange={onFormDateChange(key)}
          {...getMomentFormatter('LL')}
        />
      </FormGroup>
    )
  };

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

  const getAutocompleteInputFormGroup = (key: string, props?: IInputOptions) => {
    const cProps = get(props, 'childProps', {}) as any;

    const onSelect = (result: AutocompletResult) => {
      setFieldValue(key, result.address);
    }
    
    return (
      <FormGroup
        intent={getFormIntent(errors[key])}
        label={get(fields, key, { name: '' }).name}
        labelFor={`text-area__${key}`}
        helperText={errors[key]}
      >
        <AutocompleteInput
          defaultAddress={cProps.defaultAddress}
          onSelect={onSelect}
        />
      </FormGroup>
    );
  }

  const getPhoneInputFormGroup = (key: string, props?: IInputOptions) => {
    const cProps = get(props, 'childProps', {});
    
    return (
      <FormGroup
        intent={getFormIntent(errors[key])}
        label={get(fields, key, { name: '' }).name}
        labelFor={`phone-input__${key}`}
        helperText={errors[key]}
      >
        <PhoneInput
          id={`phone-input__${key}`}
          intent={getFormIntent(errors[key])}
          onPhone={(value: string) => {
            setFieldValue(key, value)
          }}
          value={values[key]}
          {...cProps}
        />
      </FormGroup>
    );
  }

  const getSelectFieldInputFormGroup = (key: string, props?: IInputOptions) => {
    const childProps = props?.childProps
    const selectOptions = get(childProps, 'selectOptions', [])
    const menuRenderer = get(childProps, 'menuRenderer')
    const btnTextRenderer = get(childProps, 'btnTextRenderer')
    const capitalizeFirst = get(childProps, 'capitalizeFirst', false)
    let btnTxt = ''

    if (btnTextRenderer) {
      btnTxt = btnTextRenderer(values[key])
    } else {
      btnTxt = values[key]

      if (capitalizeFirst) {
        btnTxt = capitalizeFirstLetter(btnTxt)
      }
    }

    const defaultRenderer = (item: string) => {
      if (capitalizeFirst) {
        return capitalizeFirstLetter(item)
      }

      return item;
    }


    return (
      <FormGroup
        intent={getFormIntent(errors[key])}
        label={get(fields, key, { name: '' }).name}
        helperText={errors[key]}
      >
        <FormItemSelect
          buttonText={btnTxt}
          items={selectOptions}
          menuRenderer={menuRenderer || defaultRenderer}
          onFormSelectChange={(value: any) => {
            setFieldValue(key, value)
          }}
        />
      </FormGroup>
    )
  }

  return (
    <>
      {child({
        wrapperProps: {
          getDateInputFormGroup,
          getInputFormGroup,
          getNumericInputFormGroup,
          getSelectFieldInputFormGroup,
          getSwitchInputFormGroup,
          getTextAreaInputFormGroup,
          getTimeInputFormGroup,
          getAutocompleteInputFormGroup,
          getPhoneInputFormGroup
        },
        formikProps
      })}
    </>
  )
}

export default formikWrapper;