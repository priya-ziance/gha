import { Checkbox, Intent } from '@blueprintjs/core';
import get from 'lodash/get';

import { Button } from '../../../../components';

import { ILogModel } from '../../../../types';


export const firstNameColumn = (data: ILogModel) => {
  return (
    <p>{get(data, 'client.firstName', '')}</p>
  )
}

export const lastNameColumn = (data: ILogModel) => {
  return (
    <p>{get(data, 'client.lastName', '')}</p>
  )
}

export const addressColumn = (data: ILogModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{get(data, 'client.location.address', '')}</p>
  )
}

export const activeColumn = (data: ILogModel) => {
  return (
    <Checkbox checked={!!data} disabled/>
  )
}

export const medicaidColumn = (data: ILogModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{get(data, 'client.medicaidId', '')}</p>
  )
}

export const locationColumn = (data: ILogModel) => {
  const date = get(data, 'date');
  
  if (date) {
    return (
      <p>{date.format('MMMM Do YYYY')}</p>
    )
  }

  return (<p></p>)
}

export const actionColumn = (data: ILogModel, actions?: any) => {
  return (
    <>
      <Button intent={Intent.PRIMARY} small onClick={actions.onView}>
        <b>view</b>
      </Button>
    </>
  )
}


