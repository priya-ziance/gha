import { Checkbox, Intent } from '@blueprintjs/core';
import get from 'lodash/get';

import { AnchorButton, Button } from '../../../components';

import { IExpenseModel } from '../../../types';


export const descriptionColumn = (data: IExpenseModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{data.expenseDescription}</p>
  )
}

export const activeColumn = (data: IExpenseModel) => {
  return (
    <Checkbox checked={data.active} disabled/>
  )
}

export const dateColumn = (data: IExpenseModel) => {
  const date = get(data, 'createdAt');
  
  if (date) {
    return (
      <p>{date.format('MMMM Do YYYY')}</p>
    )
  }

  return (<p></p>)
}

export const actionColumn = (data: IExpenseModel, { viewLink }: any) => {
  return (
    <>
      <AnchorButton
        linkProps={{
          to: viewLink
        }}
        buttonProps={{
          intent: Intent.PRIMARY
        }}
      >
        <b>view</b>
      </AnchorButton>
    </>
  )
}