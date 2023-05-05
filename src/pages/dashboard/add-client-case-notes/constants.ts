import * as yup from 'yup';

import { CASE_NOTE_FIELDS_FORM_TYPE } from '../../../types';

export const FIELDS : CASE_NOTE_FIELDS_FORM_TYPE = {
  active: {
    name: 'Active',
    default: false,
    validation: yup.bool(),
  },
  date: {
    name: 'Date',
    default: null,
    validation: yup.string().label('Date').required().nullable(),
  },
  title: {
    name: 'Title',
    default: '',
    validation: yup.string().label('Title').required(),
  },
  significant_event: {
    name: 'Significant Event',
    default: false,
    validation: yup.bool(),
  },
  significant_event_notes: {
    name: 'Significant Event Notes',
    default: '',
    validation: yup.string(),
  },
  notes: {
    name: 'Notes',
    default: '',
    validation: yup.string().label('Notes').required(),
  },
  // client_name: {
  //   name: 'Client Name',
  //   default: '',
  //   validation: yup.string(),
  // }
}
