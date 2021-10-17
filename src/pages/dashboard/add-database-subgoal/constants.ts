import * as yup from 'yup';

import { SUBGOAL_FIELDS_FORM_TYPE } from '../../../types';

export const FIELDS : SUBGOAL_FIELDS_FORM_TYPE = {
  active: {
    name: 'Active',
    default: false,
    validation: yup.bool(),
  },
  description: {
    name: 'Description',
    default: '',
    validation: yup.string(),
  },
  goal: {
    name: 'Goal',
    default: '',
    validation: yup.string(),
  }
}
