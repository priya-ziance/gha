import * as yup from 'yup';

import { ACCOUNT_EXPENSE_FIELDS_FORM_TYPE } from '../../../types';


export const EXPENSE_TYPES = [
  'Credit',
  'Debit',
  'Withdrawal'
];

export const EXPENSE_ACCOUNT_TYPES = {
  main_account: 'Main Account',
  personal_funds: 'Personal Funds'
};

export const FIELDS : ACCOUNT_EXPENSE_FIELDS_FORM_TYPE= {
  expense_date: {
    name: 'Expense Date',
    default: null,
    validation: yup.string().nullable(),
  },
  expense_type: {
    name: 'Expense Type',
    default: EXPENSE_TYPES[0],
    validation: yup.string(),
  },
  expense_description: {
    name: 'Expense Description',
    default: '',
    validation: yup.string(),
  },
  expense: {
    name: 'Expense',
    default: 0,
    validation: yup.number().required().label('Expense'),
  },
  document: {
    name: 'Document',
    default: '',
    validation: yup.string(),
  },
  location: {
    name: 'Location',
    default: '',
    validation: yup.string(),
  },
  active: {
    name: 'Active',
    default: false,
    validation: yup.bool(),
  },
  community_activity_save: {
    name: 'Community Activity Save',
    default: false,
    validation: yup.bool(),
  },
  inventory_save: {
    name: 'Inventory Save',
    default: false,
    validation: yup.bool(),
  },
  type: {
    name: 'Type',
    default: 'main_account',
    validation: yup.string().required().label('Expense Account Type'),
  },
}
