import { Checkbox, Intent } from '@blueprintjs/core';
import get from 'lodash/get';

import { Button } from '../../../components';

import { IAppointmentModel } from '../../../types';


export const clientNameColumn = (data: IAppointmentModel) => {
  return (
    <>{data.clientName}</>
  )
}

export const doctorColumn = (data: IAppointmentModel) => {
  return (
    <>{data.doctor}</>
  )
}

export const timeColumn = (data: IAppointmentModel) => {
  return (
    <>{data.time}</>
  )
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

export const actionColumn = (data: IAppointmentModel) => {
  return (
    <>
      <Button intent={Intent.PRIMARY} small>
        <b>view</b>
      </Button>
    </>
  )
}
