import { Intent } from '@blueprintjs/core';
import { AnchorButton, Button } from '../../../components';
import { IDischargeModel} from '../../../types';

export const nameColumn = (data: IDischargeModel) => {
  return (
    <>{data.firstName}&nbsp;{data.lastName}</>
  )
}

export const emailColumn = (data: IDischargeModel) => {
  return (
    <>{data.email}</>
  )
}

export const mobileColumn = (data: IDischargeModel) => {
  return (
    <>{data.mobile}</>
  )
}

export const addressColumn = (data: IDischargeModel) => {
  return (
    <>{data.address}</>
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