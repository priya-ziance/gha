import * as yup from 'yup';

import { FIELDS_TYPE } from '../../../types';

export const FIELDS : FIELDS_TYPE = {
  active: {
    name: 'Active',
    default: false,
    validation: yup.bool(),
  },
  goal: {
    name: 'Goal',
    default: '',
    validation: yup.string().required().label('Goal'),
  },
  end_date: {
    name: 'End Date',
    default: null,
    validation: yup.string().nullable().required().label('End Date'),
  },
  entries: {
    name: 'Entries',
    default: '',
    validation: yup.string(),
  },
  notes: {
    name: 'Notes',
    default: '',
    validation: yup.string(),
  },
  start_date: {
    name: 'Start Date',
    default: null,
    validation: yup.string().nullable().required().label('Start Date'),
  },
  sub_goals: {
    name: 'Sub Goals',
    default: null,
    validation: yup.string().required().label('sub_goals'),
  }
}
