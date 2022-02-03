import * as yup from 'yup';

import { PLACES_FIELDS_FORM_TYPE } from '../../../types';

export const FIELDS : PLACES_FIELDS_FORM_TYPE = {
  active: {
    name: 'Active',
    default: false,
    validation: yup.bool(),
  },
  description: {
    name: 'Description',
    default: '',
    validation: yup.string(),
  }
}
