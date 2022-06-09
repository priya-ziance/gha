import { Checkbox, Intent } from '@blueprintjs/core';
import get from 'lodash/get';

import { AnchorButton } from '../../../components';

import { ILocationModel } from '../../../types';


export const addressColumn = (data: ILocationModel) => {
  return (
    <p>{data.address}</p>
  )
}

export const phoneColumn = (data: ILocationModel) => {
  return (
    <p>{data.phoneNumber}</p>
  )
}

export const actionColumn = (data: ILocationModel, { viewLink }: any) => {
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