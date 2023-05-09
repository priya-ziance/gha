import { Checkbox, Intent } from '@blueprintjs/core';
import { AnchorButton, Button } from '../../../components';
import {IPersonalFundsModel } from '../../../types';

export const idColumn = (data: IPersonalFundsModel) => {
  console.log("data",data);
  
  return (
    <>{data.personalFunds?._id}</>
  )
}

export const expenseTypeColumn = (data: IPersonalFundsModel) => {
  return (
    <>{data.expense_type}</>
  )
}

export const expenseDateColumn = (data: IPersonalFundsModel) => {
  return (
    <>{data.expense_date?.format("DD-MM-YYYY")}</>
  )
}

export const activeColumn = (data: IPersonalFundsModel) => {
  return (
    // <>{data.active}</>
    <Checkbox checked={data.active} disabled/>
  )
}

export const expenseColumn = (data: IPersonalFundsModel) => {
  return (
    <>{data.personalFunds?.expense}</>
  )
}
export const actionColumn = (data: IPersonalFundsModel, { onDelete,viewLink }: any) => {
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
      {" "}
      {" "}
      <Button
        onClick={() => {
          if (onDelete) {
            onDelete(data)
          }
        }}
        icon='trash'
        intent={Intent.DANGER}
      />
    </>
  )
}