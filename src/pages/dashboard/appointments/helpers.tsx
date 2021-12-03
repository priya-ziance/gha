import { Checkbox, Intent } from '@blueprintjs/core';
import get from 'lodash/get';
import moment from 'moment';

import { AnchorButton } from '../../../components';

import { IAppointmentModel } from '../../../types';


export const contactNameColumn = (data: IAppointmentModel) => {
  return (
    <>{data.doctor}</>
  )
}

export const appointmentTypeColumn = (data: IAppointmentModel) => {
  return (
    <>{data.typeOfAppointment}</>
  )
}

export const contactTypeColumn = (data: IAppointmentModel) => {
  return (
    <>{data.contactType}</>
  )
}

export const timeColumn = (data: IAppointmentModel) => {
  if (data.time) {
    return (
      <>{moment(data.time).format('LT')}</>
    )
  }

  return <></>
}

export const activeColumn = (data: IAppointmentModel) => {
  return (
    <Checkbox checked={data.active} disabled/>
  )
}

export const appointmentDateColumn = (data: IAppointmentModel) => {
  const date = get(data, 'appointmentDate');
  
  if (date) {
    return (
      <>{date.format('MMMM Do YYYY')}</>
    )
  }

  return (<></>)
}

export const actionColumn = (data: IAppointmentModel, { viewLink }: any) => {
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
