import { Checkbox, Intent } from '@blueprintjs/core';
import * as yup from 'yup';
import moment from "moment";
import get from 'lodash/get';

import { IInstructionModel } from '../../../types';

import { INSTRUCTION_FIELDS_TYPE } from '../../../types';

import { Button } from '../../../components';
import { DateInputProps } from '../../../components/DateInput';

import { FIELDS } from './constants';

const formFields: any = Object.keys(FIELDS);

export const initialValues = Object.assign({}, ...formFields.map((formField: INSTRUCTION_FIELDS_TYPE) => {
  return {
    [formField]: get(FIELDS, formField, { default: '' }).default
  }
}))

export const validationSchema = yup.object().shape(
  Object.assign({}, ...formFields.map((formField: INSTRUCTION_FIELDS_TYPE) => {
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

export const descriptionColumn = (data: IInstructionModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{data.description}</p>
  )
}

export const activeColumn = (data: IInstructionModel) => {
  return (
    <Checkbox checked={data.active} disabled/>
  )
}

export const dateColumn = (data: IInstructionModel) => {
  const date = get(data, 'createdAt');
  
  if (date) {
    return (
      <p>{date.format('MMMM Do YYYY')}</p>
    )
  }

  return (<p></p>)
}

export const actionColumn = (data: IInstructionModel, { onView }: any) => {
  return (
    <>
      <Button
        onClick={() => {
          if (onView) {
            onView(data)
          }
        }}
        intent={Intent.PRIMARY}
      >
        <b>view</b>
      </Button>
    </>
  )
}