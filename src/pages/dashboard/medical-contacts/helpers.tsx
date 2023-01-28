import { Checkbox, Intent } from '@blueprintjs/core';
import get from 'lodash/get';

import { AnchorButton } from '../../../components';

import { IClientContactModel } from '../../../types';


export const firstNameColumn = (data: IClientContactModel) => {
  return (
    <>{data.firstName}</>
  )
}

export const lastNameColumn = (data: IClientContactModel) => {
  return (
    <>{data.lastName}</>
  )
}

export const addressColumn = (data: IClientContactModel) => {
  return (
    <>{data.address}</>
  )
}

export const contactTypeColumn = (data: IClientContactModel) => {
  return (
    <>{data.contactType}</>
  )
}

export const activeColumn = (data: IClientContactModel) => {
  return (
    <Checkbox checked={data.active} disabled/>
  )
}

export const medicalContactColumn = (data: IClientContactModel) => {
  return (
    <Checkbox checked={data.medicalContact} disabled/>
  )
}

export const dateOfBirthColumn = (data: IClientContactModel) => {
  const date = get(data, 'dateOfBirth');
  
  if (date) {
    return (
      <>{date.format('MMMM Do YYYY')}</>
    )
  }

  return (<></>)
}

export const actionColumn = (data: IClientContactModel, { viewLink }: any) => {
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