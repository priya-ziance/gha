import { Intent } from '@blueprintjs/core';
import { AnchorButton, Button } from '../../../components';
import {IPersonalFundsModel } from '../../../types';

export const nameColumn = (data: IPersonalFundsModel) => {
  return (
    <>{data.firstName}&nbsp;{data.lastName}</>
  )
}

export const emailColumn = (data: IPersonalFundsModel) => {
  return (
    <>{data.email}</>
  )
}

export const mobileColumn = (data: IPersonalFundsModel) => {
  return (
    <>{data.mobile}</>
  )
}

export const addressColumn = (data: IPersonalFundsModel) => {
  return (
    <>{data.address}</>
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