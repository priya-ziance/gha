import { Checkbox, Intent } from '@blueprintjs/core';
import get from 'lodash/get';

import { Button } from '../../../components';

import { IClientContactModel } from '../../../types';


export const titleColumn = (data: IClientContactModel) => {
  return (
    <p>{data.title}</p>
  )
}

export const descriptionColumn = (data: IClientContactModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{data.notes}</p>
  )
}

export const activeColumn = (data: IClientContactModel) => {
  return (
    <Checkbox checked={data.active} disabled/>
  )
}

export const dateColumn = (data: IClientContactModel) => {
  const date = get(data, 'date');
  
  if (date) {
    return (
      <p>{date.format('MMMM Do YYYY')}</p>
    )
  }

  return (<p></p>)
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