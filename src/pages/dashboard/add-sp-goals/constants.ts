import * as yup from 'yup';

import { FIELDS_TYPE } from '../../../types';


export const GOALS = [
  'Chew smaller bites to prevent choking'
]


export const FIELDS : FIELDS_TYPE = {
  active: {
    name: 'Active',
    default: false,
    validation: yup.bool(),
  },
  description: {
    name: 'Goal',
    default: GOALS[0],
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
  }
}
