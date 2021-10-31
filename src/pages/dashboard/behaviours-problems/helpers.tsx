import { Checkbox, Intent } from '@blueprintjs/core';
import * as yup from 'yup';
import moment from "moment";
import get from 'lodash/get';

import { Button } from '../../../components';

import { IClientBehaviourModel } from '../../../types';

import { BEHAVIOUR_PROBLEMS_FIELDS_TYPE } from '../../../types';

import { DateInputProps } from '../../../components/DateInput';

import { FIELDS } from './constants';

const formFields: any = Object.keys(FIELDS);

export const validationSchema = yup.object().shape(
  Object.assign({}, ...formFields.map((formField: BEHAVIOUR_PROBLEMS_FIELDS_TYPE) => {
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



export const behaviourTypeColumn = (data: IClientBehaviourModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{get(data, 'behaviour.behaviourType')}</p>
  )
}

export const notesColumn = (data: IClientBehaviourModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{data.notes}</p>
  )
}

export const uriColumn = (data: IClientBehaviourModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{get(data, 'uri', 'No')}</p>
  )
}

export const dateColumn = (data: IClientBehaviourModel) => {
  const date = get(data, 'createdAt');
  
  if (date) {
    return (
      <p>{date.format('MMMM Do YYYY')}</p>
    )
  }

  return (<p></p>)
}

export const actionColumn = (data: IClientBehaviourModel, { onView }: any) => {
  return (
    <>
      <Button
        intent={Intent.PRIMARY}
        onClick={() => {
          if (onView) onView(data)
        }}
      >
        <b>view</b>
      </Button>
    </>
  )
}