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
  contact_type: {
    name: 'Contact Type',
    default: '',
    validation: yup.string().label('Contact Type'),
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
