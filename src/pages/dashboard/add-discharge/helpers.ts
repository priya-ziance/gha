import { Intent } from '@blueprintjs/core';
import * as yup from 'yup';
import moment from "moment";
import get from 'lodash/get';
import { FIELDS } from './constants';
import { DateInputProps } from '../../../components/DateInput';
import { ADD_DISCHARGE_FIELDS_TYPE} from '../../../types';

const formFields: any = Object.keys(FIELDS);

export const initialValues = Object.assign({}, ...formFields.map((formField: ADD_DISCHARGE_FIELDS_TYPE) => {
  return {
    [formField]: get(FIELDS,formField, { default: '' }).default
  }
}))

export const validationSchema = yup.object().shape(
  Object.assign({}, ...formFields.map((formField: ADD_DISCHARGE_FIELDS_TYPE) => {
    return {
      [formField]: get(FIELDS,formField, { validation: '' }).validation
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