import {  Intent } from '@blueprintjs/core';
import { AnchorButton, Button } from '../../../components';
import { IClientWithnessModel } from '../../../types';


export const nameColumn = (data: IClientWithnessModel) => {
  return (
    <>{data.firstName}&nbsp;{data.lastName}</>
  )
}

export const emailColumn = (data: IClientWithnessModel) => {
  return (
    <>{data.email}</>
  )
}

export const mobileColumn = (data: IClientWithnessModel) => {
  return (
    <>{data.mobile}</>
  )
}

export const contactTypeColumn = (data: IClientWithnessModel) => {
  return (
    <>{data.contactType}</>
  )
}

export const actionColumn = (data: IClientWithnessModel, { viewLink,onDelete }: any) => {
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