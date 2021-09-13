import * as yup from 'yup';

import { FIELDS_TYPE } from '../../../types';


export const CRITICAL_INCIDENTS_OPTIONS = [
  'Yes',
  'No'
]

export const REPORTABLE_INCIDENTS_OPTIONS = [
  'Yes',
  'No'
]

export const FIELDS : FIELDS_TYPE = {
  county: {
    name: 'County',
    default: '',
    validation: yup.string(),
  },
  incident_date_time: {
    name: 'Incident Date and Time',
    default: null,
    validation: yup.string().nullable(),
  },
  notes: {
    name: 'Notes',
    default: '',
    validation: yup.string(),
  },
  critical_incident: {
    name: 'Was it a critical incident',
    default: CRITICAL_INCIDENTS_OPTIONS[0],
    validation: yup.string(),
  },
  reportable_incident: {
    name: 'Was it a reportable incident',
    default: REPORTABLE_INCIDENTS_OPTIONS[0],
    validation: yup.string(),
  },
}
