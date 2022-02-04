import { Checkbox, Intent } from '@blueprintjs/core';
import get from 'lodash/get';

import { Button } from '../../../../components';

import { ILogModel } from '../../../../types';


export const firstNameColumn = (data: ILogModel) => {
  return (
    <p>{get(data, 'firstName', '')}</p>
  )
}

export const lastNameColumn = (data: ILogModel) => {
  return (
    <p>{get(data, 'lastName', '')}</p>
  )
}

export const addressColumn = (data: ILogModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{get(data, 'location.address', '')}</p>
  )
}

export const medicaidColumn = (data: ILogModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{get(data, 'medicaidId', '')}</p>
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
    <div className='log-entry__actions'>
      <Button intent={Intent.PRIMARY} small onClick={actions.onView}>
        <b>view logs</b>
      </Button>
      <Button intent={Intent.PRIMARY} small onClick={actions.onEdit}>
        <b>edit</b>
      </Button>
    </div>
  )
}


