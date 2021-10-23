import * as yup from 'yup';

import { TASK_FIELDS_FORM_TYPE, INSTRUCTION_FIELDS_FORM_TYPE } from '../../../types';

export const FIELDS : TASK_FIELDS_FORM_TYPE | INSTRUCTION_FIELDS_FORM_TYPE = {
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
  },
  sub_goal: {
    name: 'Sub Goal',
    default: '',
    validation: yup.string(),
  }
}
