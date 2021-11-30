import * as yup from 'yup';

import { APPOINTMENT_FIELDS_FORM_TYPE } from '../../../types';


export const FIELDS : APPOINTMENT_FIELDS_FORM_TYPE= {
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
    default: '',
    validation: yup.string(),
  },
  type_of_appointment: {
    name: 'Type Of Appointment',
    default: '',
    validation: yup.string(),
  },
  appt_notes: {
    name: 'Appt Notes',
    default: '',
    validation: yup.string(),
  },
  staff_notes: {
    name: 'Staff Notes',
    default: '',
    validation: yup.string(),
  },
  physicain_notes: {
    name: 'Physician Notes',
    default: '',
    validation: yup.string(),
  },
  physician_document: {
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
