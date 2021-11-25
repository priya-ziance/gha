import * as yup from 'yup';

import { EXPENSES_LIST_FIELDS_FORM_TYPE } from '../../../types';

export const EXPENSE_TYPES = [
  'Credit',
  'Debit',
  'Withdrawal'
];

export const EXPENSE_LIST_TYPES = {
  normal: 'Normal',
  recurring: 'Recurring'
};

export const FIELDS : EXPENSES_LIST_FIELDS_FORM_TYPE = {
  active: {
    name: 'Active',
    default: false,
    validation: yup.bool(),
  },
  expense_description: {
    name: 'Expense Description',
    default: '',
    validation: yup.string().label('Title').required(),
  },
  expense_type: {
    name: 'Expense Type',
    default: EXPENSE_TYPES[0],
    validation: yup.string(),
  },
  expense: {
    name: 'Expense',
    default: '',
    validation: yup.number().required().label('Expense').min(0),
  },
  type: {
    name: 'Expense List Type',
    default: Object.keys(EXPENSE_LIST_TYPES)[0],
    validation: yup.string(),
  }
}
