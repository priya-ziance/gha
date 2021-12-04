import { Checkbox, Intent } from '@blueprintjs/core';
import get from 'lodash/get';

import { AnchorButton } from '../../../components';

import { ICaseNoteModel } from '../../../types';


export const titleColumn = (data: ICaseNoteModel) => {
  return (
    <p>{data.title}</p>
  )
}

export const descriptionColumn = (data: ICaseNoteModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{data.notes}</p>
  )
}

export const activeColumn = (data: ICaseNoteModel) => {
  return (
    <Checkbox checked={data.active} disabled/>
  )
}

export const dateColumn = (data: ICaseNoteModel) => {
  const date = get(data, 'date');
  
  if (date) {
    return (
      <p>{date.format('MMMM Do YYYY')}</p>
    )
  }

  return (<p></p>)
}

export const actionColumn = (data: ICaseNoteModel, { viewLink }: any) => {
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
    </>
  )
}