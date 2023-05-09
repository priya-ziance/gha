// @ts-nocheck
import { Intent } from '@blueprintjs/core';
import { AnchorButton, Button } from '../../../components';
import { IDischargeModel} from '../../../types';

export const ClientColumn = (data: IDischargeModel) => {
  return (
    <>{data.clientName}</>
  )
}

export const dischargeDateColumn = (data: IDischargeModel) => {
  return (
    <>{data?.homeDischargeDate?.format("DD MM YYYY")}</>
  )
}

export const orgNameColumn = (data: IDischargeModel) => {
  return (
    <>{data.organizationName}</>
  )
}

export const orgLocationColumn = (data: IDischargeModel) => {
  return (
    <>{data.organizationLocation}</>
  )
}

export const orgPhoneColumn = (data: IDischargeModel) => {
  return (
    <>{data.organizationPhone}</>
  )
}

export const orgMainContactColumn = (data: IDischargeModel) => {
  return (
    <>{data.organizationMainContact}</>
  )
}

export const actionColumn = (data: IDischargeModel, { onDelete,viewLink }: any) => {
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