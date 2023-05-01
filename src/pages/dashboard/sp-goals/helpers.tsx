import { Checkbox, Intent } from '@blueprintjs/core';
import get from 'lodash/get';

import { AnchorButton, Button } from '../../../components';

import { ISpGoalModel } from '../../../types';


export const notesColumn = (data: ISpGoalModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{data.notes}</p>
  )
}

export const activeColumn = (data: ISpGoalModel) => {
  return (
    <Checkbox checked={data.active} disabled/>
  )
}

export const dateColumn = (data: ISpGoalModel) => {
  const date = get(data, 'createdAt');
  
  if (date) {
    return (
      <p>{date.format('MMMM Do YYYY')}</p>
    )
  }

  return (<p></p>)
}

export const actionColumn = (data: ISpGoalModel, { viewLink ,onDelete}: any) => {
 
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