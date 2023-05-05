import { Intent } from '@blueprintjs/core';
import { AnchorButton, Button } from '../../../components';
import { IAddInventoryModel } from '../../../types';

export const nameColumn = (data: IAddInventoryModel) => {
  return (
    <>{data.id}&nbsp;{data.id}</>
  )
}

export const itemColumn = (data: IAddInventoryModel) => {
  return (
    <>{data.item}</>
  )
}

export const dateColumn = (data: IAddInventoryModel) => {
  return (
    <>{data.purchase_date}</>
  )
}
export const quantityColumn = (data: IAddInventoryModel) => {
  return (
    <>{data.quantity}</>
  )
}

export const addressColumn = (data: IAddInventoryModel) => {
  return (
    <>{data.notes}</>
  )
}

export const actionColumn = (data: IAddInventoryModel, { onDelete,viewLink }: any) => {
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
