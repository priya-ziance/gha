import * as yup from 'yup';

import { CLIENT_CONTACT_FIELDS_FORM_TYPE } from '../../../types';


export const FIELDS : CLIENT_CONTACT_FIELDS_FORM_TYPE = {
  active: {
    name: 'Active',
    default: false,
    validation: yup.bool(),
  },
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
    validation: yup.string().label('Contact Type').required(),
  },
  date_of_birth: {
    name: 'Date Of Birth',
    default: null,
    validation: yup.string().label('Date Of Birth').required().nullable(),
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
    name: 'Fax',
    default: '',
    validation: yup.string().label('Fax'),
  },
  last_name: {
    name: 'Last Name',
    default: '',
    validation: yup.string().label('Last Name'),
  },
  phone: {
    name: 'Phone #',
    default: '',
    validation: yup.string().required(),
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
