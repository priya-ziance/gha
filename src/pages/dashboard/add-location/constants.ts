import * as yup from 'yup';

import { LOCATION_FIELDS_FORM_TYPE } from '../../../types';

export const FIELDS : LOCATION_FIELDS_FORM_TYPE = {
  phoneNumber: {
    name: 'Phone Number',
    default: '',
    validation: yup.string().label('Phone Number'),
  },
  address: {
    name: 'Address',
    default: '',
    validation: yup.string().label('Address').required(),
  },
  city: {
    name: 'City',
    default: '',
    validation: yup.string().label('City'),
  },
  country: {
    name: 'Country',
    default: '',
    validation: yup.string().label('Country'),
  }
}
