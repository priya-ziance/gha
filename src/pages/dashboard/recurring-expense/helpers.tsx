import { Checkbox, Intent } from '@blueprintjs/core';
import get from 'lodash/get';

import { AnchorButton } from '../../../components';

import { IExpenseListModel } from '../../../types';

import { formatCurrency } from '../../../utils/formatters';


export const expenseTypeColumn = (data: IExpenseListModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{data.expenseType}</p>
  )
}

export const expenseColumn = (data: IExpenseListModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{formatCurrency(get(data, 'expense', 0) * 100)}</p>
  )
}

export const descriptionColumn = (data: IExpenseListModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{data.expenseDescription}</p>
  )
}

export const expenseListColumn = (data: IExpenseListModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{data.type}</p>
  )
}

export const activeColumn = (data: IExpenseListModel) => {
  return (
    <Checkbox checked={data.active} disabled/>
  )
}

export const dateColumn = (data: IExpenseListModel) => {
  const date = get(data, 'createdAt');
  
  if (date) {
    return (
      <p>{date.format('MMMM Do YYYY')}</p>
    )
  }

  return (<p></p>)
}

export const actionColumn = (data: IExpenseListModel, { viewLink }: any) => {
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