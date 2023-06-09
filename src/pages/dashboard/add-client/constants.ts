import * as yup from 'yup';

import { FIELDS_TYPE } from '../../../types';

// Start: Add Client Custom Form Constants

export const KEY_USE = [
  'Agree and will follow theresponsibilities and want a copy of key',
  'Decline having my personal copy of a key'
];

export const IMPLEMENTATION_PLAN = [
  'Hand delivered',
  'Faxed',
  'Secured Email',
  'Kept on Record',
  'Refused'
];

export const ROOM_AND_BOARD = [
  'Private',
  'Semi-Private'
];

export const MEDICAL_RELEASE_FORM = [
  'IS ALLOWED',
  'IS NOT ALLOWED'
];

// End: Add Client Custom Form Constants

export const DIALOG_NAMES = {
  clientCustomForm: 'clientCustomForm',
  levelsOfService: 'levelsOfService',
  services: 'services',
  witnesses: 'witnesses',
  trainers: 'trainers',
  clientWitness : "clientWitness",
  staffWitness : "staffWitness",
  behaviour: "behaviour"
}

// export const FUNDS_METHODS_OPTIONS = [
//   'SSI',
//   'SSA',
//   'Other'
// ];

export const LEGAL_STATUS_OPTIONS = [
  'Competent',
  'Incompetent'
];

export const PRIMARY_DIAGNOSIS_OPTIONS = [
  'Autism',
  'Cerebral Palsy',
  'Intelectual Disability',
  'Prada Willi Syndrome',
  'Spina Bifida'
];
export const FUNDS_METHODS_OPTIONS = [
  'Credit Card',
  'Debit Card',
  'Bank Account',
];

export const SEX_OPTIONS = [
  'Male',
  'Female'
];

export const FIELDS : FIELDS_TYPE = {
  email: {
    name: 'Email',
    default: '',
    validation: yup.string().label('Email').email(),
  },
  first_name: {
    name: 'First Name',
    default: '',
    validation: yup.string().label('First Name').required(),
  },
  middle_name: {
    name: 'Middle Name',
    default: '',
    validation: yup.string(),
  },
  last_name: {
    name: 'Last Name',
    default: '',
    validation: yup.string().label('Last Name').required(),
  },
  date_of_birth: {
    name: 'Date Of Birth',
    default: null,
    validation: yup.string().nullable(),
  },
  sex: {
    name: 'Sex',
    default: SEX_OPTIONS[0],
    validation: yup.string(),
  },
  current_month_weight:{
    name: 'Current Month Weight',
    default: '',
    validation: yup.string().label('Current Month Weight').required(),
  },
  address_line_1: {
    name: 'Address 1',
    default: '',
    validation: yup.string(),
  },
  address_line_2: {
    name: 'Address 2',
    default: '',
    validation: yup.string(),
  },
  city: {
    name: 'City',
    default: '',
    validation: yup.string(),
  },
  state: {
    name: 'State',
    default: '',
    validation: yup.string(),
  },
  monthly_ssi_amount: {
    name: 'monthly SSI amount',
    default: '',
    validation: yup.string(),
  },
  special_equipments: {
    name: ' Special equipments',
    default: '',
    validation: yup.string(),
  },
  bank_account_name: {
    name: 'Bank account name',
    default: '',
    validation: yup.string(),
  },
  bank_routing_number: {
    name: 'Bank Routing Number',
    default: '',
    validation: yup.string(),
  },
  bank_account_number: {
    name: 'Bank account number',
    default: '',
    validation: yup.string(),
  },
  funds_method:{
    name: 'Funds method',
    default: '',
    validation: yup.string(),
  },
  zip_code: {
    name: 'Zip Code',
    default: '',
    validation: yup.string(),
  },
  phone: {
    name: 'Phone #',
    default: '',
    validation: yup.string(),
  },
  mobile: {
    name: 'Mobile #',
    default: '',
    validation: yup.string(),
  },
  ssn: {
    name: 'SS #',
    default: '',
    validation: yup.number().max(999999999, 'Too many digits').min(100000000, 'Too few digits').required().label('SS #'),
  },
  medicaid: {
    name: 'Medicaid #',
    default: '',
    validation: yup.string(),
  },
  medicare: {
    name: 'Medicare #',
    default: '',
    validation: yup.number().max(999999999999999, 'Too many digits').min(100000000000000, 'Too few digits').label('Medicare #'),
  },
  medicaid_waiver: {
    name: 'Medicaid Waiver #',
    default: '',
    validation: yup.number().max(99999999, 'Too many digits').min(10000000, 'Too few digits').required().label('Medicaid Waiver #')
  },
  height: {
    name: 'Height',
    default: '',
    validation: yup.string(),
  },
  eye_color: {
    name: 'Eye Color',
    default: '',
    validation: yup.string(),
  },
  hair_color: {
    name: 'Hair Color',
    default: '',
    validation: yup.string(),
  },
  legal_status: {
    name: 'Legal Status',
    default: LEGAL_STATUS_OPTIONS[0],
    validation: yup.string(),
  },
  language: {
    name: 'Language',
    default: '',
    validation: yup.string(),
  },
  primary_diagnosis: {
    name: 'Primary Diagnosis',
    default: PRIMARY_DIAGNOSIS_OPTIONS[0],
    validation: yup.string(),
  },
  secondary_diagnosis: {
    name: 'Secondary Diagnosis',
    default: '',
    validation: yup.string(),
  },
  allergies: {
    name: 'Allergies',
    default: '',
    validation: yup.string(),
  },
  hearing: {
    name: 'hearing',
    default: '',
    validation: yup.string(),
  },
  vision:{
    name: 'vision',
    default: '',
    validation: yup.string(),
  },
  effective_date: {
    name: 'Insurance effective date',
    default: '',
    validation: yup.string(),
  },
  client_support_plan_starting_month:{
    name: 'client support plan starting month',
    default: '',
    validation: yup.string()
  },
  race: {
    name: 'Race',
    default: '',
    validation: yup.string(),
  },
  home_entry_date: {
    name: 'Home Entry Date',
    default: null,
    validation: yup.string().nullable(),
  },
  home_discharge_date: {
    name: 'Home Discharge Date',
    default: null,
    validation: yup.string().nullable(),
  },
  religion: {
    name: 'Religion',
    default: '',
    validation: yup.string(),
  },
  mobility: {
    name: 'Mobility',
    default: '',
    validation: yup.string(),
  },
  behaviours: {
    name: 'Behaviours',
    default: '',
    validation: yup.string(),
  },
  likes: {
    name: 'Likes',
    default: '',
    validation: yup.string(),
  },
  dislikes: {
    name: 'Dislikes',
    default: '',
    validation: yup.string(),
  },
  active: {
    name: 'Active',
    default: false,
    validation: yup.boolean()
  },
  definition_of_abuse: {
    name: 'Definition of Abuse',
    default: '',
    validation: yup.string(),
  },
  notes: {
    name: 'Notes',
    default: '',
    validation: yup.string(),
  }
}
