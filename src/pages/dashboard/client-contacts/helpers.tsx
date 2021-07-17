import { Checkbox, Intent } from '@blueprintjs/core';
import get from 'lodash/get';

import { Button } from '../../../components';

import { IClientContactModel } from '../../../types';


export const firstNameColumn = (data: IClientContactModel) => {
  return (
    <>{data.firstName}</>
  )
}

export const lastNameColumn = (data: IClientContactModel) => {
  return (
    <>{data.lastName}</>
  )
}

export const addressColumn = (data: IClientContactModel) => {
  return (
    <>{data.address}</>
  )
}

export const activeColumn = (data: IClientContactModel) => {
  return (
    <Checkbox checked={data.active} disabled/>
  )
}

export const dateOfBirthColumn = (data: IClientContactModel) => {
  const date = get(data, 'dateOfBirth');
  
  if (date) {
    return (
      <>{date.format('MMMM Do YYYY')}</>
    )
  }

  return (<></>)
}

export const actionColumn = (data: IClientContactModel) => {
  return (
    <>
      <Button intent={Intent.PRIMARY} small>
        <b>view</b>
      </Button>
    </>
  )
}