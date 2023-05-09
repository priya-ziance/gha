import { Intent } from '@blueprintjs/core';
import { AnchorButton, Button } from '../../../components';
import { ICommunityActivitiesModel } from '../../../types';

export const nameColumn = (data: ICommunityActivitiesModel) => {
  return (
    <>{data.id}</>
  )
}

export const emailColumn = (data: ICommunityActivitiesModel) => {
  return (
    <>{data.place_1}</>
  )
}

export const mobileColumn = (data: ICommunityActivitiesModel) => {
  return (
    <>{data.place_2}</>
  )
}

export const addressColumn = (data: ICommunityActivitiesModel) => {
  return (
    <>{data.notes}</>
  )
}

export const actionColumn = (data: ICommunityActivitiesModel, { onDelete,viewLink }: any) => {
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