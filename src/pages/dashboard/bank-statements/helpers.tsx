import { Checkbox, Intent } from '@blueprintjs/core';
import get from 'lodash/get';

import { AnchorButton, Button } from '../../../components';

import { IBankStatementModel } from '../../../types';


export const nameColumn = (data: IBankStatementModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{data.statementName}</p>
  )
}

export const descriptionColumn = (data: IBankStatementModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{data.statementDescription}</p>
  )
}

export const activeColumn = (data: IBankStatementModel) => {
  return (
    <Checkbox checked={data.active} disabled/>
  )
}

export const fromDateColumn = (data: IBankStatementModel) => {
  const date = data.fromDate
  
  if (date) {
    return (
      <p>{date.format('MMMM Do YYYY')}</p>
    )
  }

  return (<p></p>)
}


export const toDateColumn = (data: IBankStatementModel) => {
  const date = data.toDate
  
  if (date) {
    return (
      <p>{date.format('MMMM Do YYYY')}</p>
    )
  }

  return (<p></p>)
}

export const dateColumn = (data: IBankStatementModel) => {
  const date = get(data, 'createdAt');
  
  if (date) {
    return (
      <p>{date.format('MMMM Do YYYY')}</p>
    )
  }

  return (<p></p>)
}

export const actionColumn = (data: IBankStatementModel, { viewLink }: any) => {
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