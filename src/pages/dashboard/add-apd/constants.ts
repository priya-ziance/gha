import * as yup from 'yup';

import { FIELDS_TYPE } from '../../../types';


export const FIELDS : FIELDS_TYPE = {
  address: {
    name: 'Address',
    default: '',
    validation: yup.string(),
  },
  company: {
    name: 'Company',
    default: '',
    validation: yup.string(),
  },  
  email: {
    name: 'Email',
    default: '',
    validation: yup.string().label('Email').email(),
  },
  first_name: {
    name: 'First Name',
    default: '',
    validation: yup.string().label('First Name').required(),
  },
  fax: {
    name: 'First Name',
    default: '',
    validation: yup.string().label('Fax'),
  },
  incident_date_time: {
    name: 'Incident Date and Time',
    default: null,
    validation: yup.string().nullable(),
  },
  last_name: {
    name: 'Last Name',
    default: '',
    validation: yup.string().label('Last Name').required(),
  },
  phone: {
    name: 'Phone #',
    default: '',
    validation: yup.string(),
  },
  mobile: {
    name: 'Mobile #',
    default: '',
    validation: yup.string(),
  },
  notes: {
    name: 'Notes',
    default: '',
    validation: yup.string(),
  }
}
