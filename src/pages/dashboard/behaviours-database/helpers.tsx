import { Checkbox, Intent } from '@blueprintjs/core';
import get from 'lodash/get';

import { AnchorButton } from '../../../components';

import { IBehaviourModel } from '../../../types';


export const behaviourTypeColumn = (data: IBehaviourModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{data.behaviourType}</p>
  )
}

export const descriptionColumn = (data: IBehaviourModel) => {
  return (
    <p className='bp3-table-truncated-cell'>{data.behaviourDescription}</p>
  )
}

export const activeColumn = (data: IBehaviourModel) => {
  return (
    <Checkbox checked={data.active} disabled/>
  )
}

export const dateColumn = (data: IBehaviourModel) => {
  const date = get(data, 'createdAt');
  
  if (date) {
    return (
      <p>{date.format('MMMM Do YYYY')}</p>
    )
  }

  return (<p></p>)
}

export const actionColumn = (data: IBehaviourModel, { viewLink }: any) => {
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