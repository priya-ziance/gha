import { Intent } from '@blueprintjs/core';
import { AnchorButton, Button } from '../../../components';
import { IRelocateModel } from '../../../types';

export const contactTypeColumn = (data: IRelocateModel) => {
  console.log("data",data.relocate);
  
  return (
    <>{data.contact_type}</>
  )
}

export const clientColumn = (data: IRelocateModel) => {
  return (
    <>{data.client}</>
  )
}

export const homeNameColumn = (data: IRelocateModel) => {
  return (
    <>{data.group_home_name}</>
  )
}

export const phoneColumn = (data: IRelocateModel) => {
  return (
    <>{data.phone}</>
  )
}
export const transferDateColumn = (data: IRelocateModel) => {
  return (
    <>{data.home_transfer_date?.format("MM/DD/YYYY")}</>
  )
}

export const actionColumn = (data: IRelocateModel, { onDelete,viewLink }: any) => {
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