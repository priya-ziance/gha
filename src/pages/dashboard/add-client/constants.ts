import * as yup from 'yup';

export const FUNDS_METHODS_OPTIONS = [
  'SSI',
  'SSA',
  'Other'
];

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

export const SEX_OPTIONS = [
  'Male',
  'Female'
];

export const FIELDS = {
  email: {
    name: 'Email',
    default: '',
    validation: yup.string().label('Email').email().required(),
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
    validation: yup.string(),
  },
  florida_id: {
    name: 'Florida Id',
    default: '',
    validation: yup.string(),
  },
  medicaid: {
    name: 'Medicaid #',
    default: '',
    validation: yup.string(),
  },
  medicare: {
    name: 'Medicare #',
    default: '',
    validation: yup.string(),
  },
  medicaid_waiver: {
    name: 'Medicaid Waiver #',
    default: '',
    validation: yup.string(),
  },
  current_month_weight: {
    name: ' Current Month Weight',
    default: '',
    validation: yup.string(),
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
  location: {
    name: 'Location',
    default: '',
    validation: yup.string(),
  },
  health_insurance: {
    name: 'Health Insurance',
    default: '',
    validation: yup.string(),
  },
  effective_date: {
    name: 'Effective Date',
    default: '',
    validation: yup.string(),
  },
  monthly_ssi_amount: {
    name: 'Monthly SSI Amount',
    default: '',
    validation: yup.string(),
  },
  funds_method: {
    name: 'Funds Method',
    default: FUNDS_METHODS_OPTIONS[0],
    validation: yup.string(),
  },
  special_equipments: {
    name: 'Special Equipments',
    default: '',
    validation: yup.string(),
  },
  bank_account_name: {
    name: 'Bank Account Name',
    default: '',
    validation: yup.string(),
  },
  bank_account_number: {
    name: 'Bank Account Number',
    default: '',
    validation: yup.string(),
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
  vision: {
    name: 'Vision',
    default: '',
    validation: yup.string(),
  },
  hearing: {
    name: 'Hearing',
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
