import { Intent } from '@blueprintjs/core';
import get from 'lodash/get';

import { AnchorButton } from '../../../components';

import { IMedicationModel } from '../../../types';


export const propriataryNameColumn = (data: IMedicationModel) => {
  return (
    <>{data.medication}</>
  )
}

export const typeColumn = (data: IMedicationModel) => {
  return (
    <>{data.type}</>
  )
}

export const directionsColumn = (data: IMedicationModel) => {
  return (
    <>{data.directions}</>
  )
}

export const medTimeColumn = (data: IMedicationModel) => {
  return (
    <>
      {get(data, 'medTime', []).map((i: string) => {
        return (
          <p>{i}</p>
        )
      })}
    </>
  )
}

export const dosageColumn = (data: IMedicationModel) => {
  return (
    <> {data.dosage} </>
  )
}

export const expiryColumn = (data: IMedicationModel) => {
  const date = get(data, 'scriptDate');
  
  if (date) {
    return (
      <>{date.format('MMMM Do YYYY')}</>
    )
  }

  return (<></>)
}

export const actionColumn = (data: IMedicationModel, { viewLink }: any) => {
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