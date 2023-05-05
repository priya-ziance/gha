import { Intent } from '@blueprintjs/core';
import { AnchorButton, Button } from '../../../components';
import { IPersonalBankStatementModel } from '../../../types';

export const nameColumn = (data: IPersonalBankStatementModel) => {
  return (
    <>{data.firstName}&nbsp;{data.lastName}</>
  )
}

export const emailColumn = (data: IPersonalBankStatementModel) => {
  return (
    <>{data.email}</>
  )
}

export const mobileColumn = (data: IPersonalBankStatementModel) => {
  return (
    <>{data.mobile}</>
  )
}

export const addressColumn = (data: IPersonalBankStatementModel) => {
  return (
    <>{data.address}</>
  )
}

export const actionColumn = (data: IPersonalBankStatementModel, { onDelete,viewLink }: any) => {
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