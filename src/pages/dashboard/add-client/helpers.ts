import { Intent } from '@blueprintjs/core';
import * as yup from 'yup';
import moment from "moment";

import { CLIENT_FIELDS_TYPE } from '../../../types';

import { DateInputProps } from '../../../components/DateInput';

import { FIELDS } from './constants';

const formFields: any = Object.keys(FIELDS);

export const initialValues = Object.assign({}, ...formFields.map((formField: CLIENT_FIELDS_TYPE) => {
  return {
    [formField]: FIELDS[formField].default
  }
}))

export const validationSchema = yup.object().shape(
  Object.assign({}, ...formFields.map((formField: CLIENT_FIELDS_TYPE) => {
    return {
      [formField]: FIELDS[formField].validation
    }
  }))
);

export const getFormIntent = (error: any) => {
  if (error) { 
    return Intent.DANGER
  }

  return Intent.NONE
}

export const getMomentFormatter = (format: string, placeholder = ''): DateInputProps => {
  // note that locale argument comes from locale prop and may be undefined
  return {
      formatDate: (date) => moment(date).format(format),
      parseDate: (str) => moment(str, format).toDate(),
      placeholder,
  }
};