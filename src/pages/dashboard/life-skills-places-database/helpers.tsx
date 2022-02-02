import { Checkbox, Intent } from '@blueprintjs/core';
import get from 'lodash/get';

import { AnchorButton, Button } from '../../../components';

import { IPlaceDatabaseModel } from '../../../types';

import * as yup from 'yup';

import { PLACES_FIELDS_TYPE } from '../../../types';

import { FIELDS } from './constants';

const formFields: any = Object.keys(FIELDS);

export const initialValues = Object.assign({}, ...formFields.map((formField: PLACES_FIELDS_TYPE) => {
  return {
    [formField]: get(FIELDS, formField, { default: '' }).default
  }
}))

export const validationSchema = yup.object().shape(
  Object.assign({}, ...formFields.map((formField: PLACES_FIELDS_TYPE) => {
    return {
      [formField]: get(FIELDS,formField, { validation: '' }).validation
    }
  }))
);


export const descriptionColumn = (data: IPlaceDatabaseModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{data.description}</p>
  )
}

export const activeColumn = (data: IPlaceDatabaseModel) => {
  return (
    <Checkbox checked={data.active} disabled/>
  )
}

export const dateColumn = (data: IPlaceDatabaseModel) => {
  const date = get(data, 'createdAt');
  
  if (date) {
    return (
      <p>{date.format('MMMM Do YYYY')}</p>
    )
  }

  return (<p></p>)
}

export const actionColumn = (data: IPlaceDatabaseModel, { onDelete, onView }: any) => {
  return (
    <div className='life-skills-places__actions'>
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
      <Button
        onClick={() => {
          if (onDelete) {
            onDelete(data)
          }
        }}
        intent={Intent.DANGER}
      >
        <b>delete</b>
      </Button>
    </div>
  )
}