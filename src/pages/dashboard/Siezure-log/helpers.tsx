import { Checkbox, Intent } from '@blueprintjs/core';
import { AnchorButton,Button } from '../../../components';
import { ISeizureLogsModel } from '../../../types';

export const idColumn = (data: ISeizureLogsModel) => {
  return (
    <>{data.seizurelogs?._id}</>
  )
}
export const dateColumn = (data: ISeizureLogsModel) => {
  return (
    <>{data.seizurelogs?.date}</>
  )
}

export const timeColumn = (data: ISeizureLogsModel) => {
  return (
    <>{data.seizurelogs?.time}</>
  )
}

export const InjuriesColumn = (data: ISeizureLogsModel) => {
  return (
    <>{data.seizurelogs?.Injuries}</>
  )
}

export const activeColumn = (data: ISeizureLogsModel) => {
  return (
    <Checkbox checked={data.seizurelogs?.active} disabled/>
  )
}

export const actionColumn = (data: ISeizureLogsModel, { viewLink,onDelete }: any) => {
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