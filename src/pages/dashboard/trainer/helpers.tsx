import { Intent } from '@blueprintjs/core';
import { AnchorButton, Button } from '../../../components';
import { IStaffWithnessModel } from '../../../types';

export const nameColumn = (data: IStaffWithnessModel) => {
  return (
    <>{data.firstName}&nbsp;{data.lastName}</>
  )
}

export const emailColumn = (data: IStaffWithnessModel) => {
  return (
    <>{data.email}</>
  )
}

export const mobileColumn = (data: IStaffWithnessModel) => {
  return (
    <>{data.mobile}</>
  )
}

export const addressColumn = (data: IStaffWithnessModel) => {
  return (
    <>{data.address}</>
  )
}

export const actionColumn = (data: IStaffWithnessModel, { onDelete,viewLink }: any) => {
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