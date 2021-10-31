import * as yup from 'yup';

import { BEHAVIOUR_PROBLEMS_FIELDS_FORM_TYPE } from '../../../types';

export const URI_OPTIONS = [
  'No',
  'Yes'
];

export const FIELDS : BEHAVIOUR_PROBLEMS_FIELDS_FORM_TYPE = {
  frequency: {
    name: 'Frequency',
    default: '',
    validation: yup.number(),
  },
  uri: {
    name: 'URI',
    default: '',
    validation: yup.string(),
  },
  notes: {
    name: 'Notes',
    default: '',
    validation: yup.string(),
  }
}
