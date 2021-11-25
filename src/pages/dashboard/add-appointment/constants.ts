import * as yup from 'yup';

import { APPOINTMENT_FIELDS_FORM_TYPE } from '../../../types';

// Start: Add Client Custom Form Constants

export const KEY_USE = [
  'Agree and will follow theresponsibilities and want a copy of key',
  'Decline having my personal copy of a key'
];

export const IMPLEMENTATION_PLAN = [
  'Hand delivered',
  'Faxed',
  'Secured Email',
  'Kept on Record',
  'Refused'
];

export const ROOM_AND_BOARD = [
  'Private',
  'Semi-Private'
];

export const MEDICAL_RELEASE_FORM = [
  'IS ALLOWED',
  'IS NOT ALLOWED'
];

// End: Add Client Custom Form Constants

export const DIALOG_NAMES = {
  clientCustomForm: 'clientCustomForm',
  levelsOfService: 'levelsOfService'
}

export const FUNDS_METHODS_OPTIONS = [
  'SSI',
  'SSA',
  'Other'
];

export const LEGAL_STATUS_OPTIONS = [
  'Competent',
  'Incompetent'
];

export const PRIMARY_DIAGNOSIS_OPTIONS = [
  'Autism',
  'Cerebral Palsy',
  'Intelectual Disability',
  'Prada Willi Syndrome',
  'Spina Bifida'
];

export const SEX_OPTIONS = [
  'Male',
  'Female'
];

export const FIELDS : APPOINTMENT_FIELDS_FORM_TYPE= {
  client_name: {
    name: 'Client Name',
    default: '',
    validation: yup.string().label('Client Name').required(),
  },
  appointment_date: {
    name: 'Appointment Date',
    default: null,
    validation: yup.string().nullable(),
  },
  time:{
    name: 'Time',
    default: null,
    validation: yup.string().nullable(),
  },
  doctor: {
    name: 'Doctor',
    default: SEX_OPTIONS[0],
    validation: yup.string(),
  },
  type_of_appointment: {
    name: 'Type Of Appointment',
    default: PRIMARY_DIAGNOSIS_OPTIONS[0],
    validation: yup.string(),
  },
  appt_notes: {
    name: 'Appt Notes',
    default: '',
    validation: yup.string(),
  },
  physicain_notes: {
    name: 'Physician Notes',
    default: '',
    validation: yup.string(),
  },
  physician_documents: {
    name: 'Physician Document',
    default: '',
    validation: yup.string(),
  },
  contact_type: {
    name: 'Contact Type',
    default: '',
    validation: yup.string(),
  },
  follow_up_date: {
    name: 'Follow Up Date',
    default: '',
    validation: yup.string(),
  },
  annual_dental: {
    name: 'Annual Dental',
    default: true,
    validation: yup.boolean(),
  },
  annual_medical: {
    name: 'Annual Medical',
    default: false,
    validation: yup.boolean(),
  },
  reporgram_medication: {
    name: 'Reprogram Medication',
    default: '',
    validation: yup.string(),
  },
  labs: {
    name: 'Labs',
    default: '',
    validation: yup.string(),
  },
  active: {
    name: 'Active',
    default: true,
    validation: yup.boolean()
  },
 
}
