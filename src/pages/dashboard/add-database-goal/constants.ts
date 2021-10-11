import * as yup from 'yup';

import { GOAL_FIELDS_FORM_TYPE } from '../../../types';

export const FIELDS : GOAL_FIELDS_FORM_TYPE = {
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
