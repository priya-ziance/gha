import * as yup from 'yup';

import { BANK_STATEMENT_FIELDS_FORM_TYPE } from '../../../types';


export const BANK_STATEMENT_ACCOUNT_TYPES = {
  main_account: 'Main Account',
  personal_funds: 'Personal Funds'
};

export const FIELDS : BANK_STATEMENT_FIELDS_FORM_TYPE= {
  from_date: {
    name: 'From Date',
    default: null,
    validation: yup.string().nullable(),
  },
  to_date: {
    name: 'To Date',
    default: null,
    validation: yup.string().nullable(),
  },
  statement_description: {
    name: 'Statement Description',
    default: '',
    validation: yup.string(),
  },
  document: {
    name: 'Document',
    default: '',
    validation: yup.object(),
  },
  statement_name: {
    name: 'Statement Name',
    default: '',
    validation: yup.string(),
  },
  active: {
    name: 'Active',
    default: false,
    validation: yup.bool(),
  },
  type: {
    name: 'Type',
    default: 'main_account',
    validation: yup.string().required().label('Expense Account Type'),
  }
}
