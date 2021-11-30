import * as yup from 'yup';

import { MEDICATION_FIELDS_FORM_TYPE } from '../../../types';

export const TAKEN_DAYS = {
  daily: 'Daily',
  two_times_a_week: 'Two times a week',
  three_times_a_week: 'Three times a week',
  four_times_a_week: 'Four times a week',
  five_times_a_week: 'Five times a week',
  six_times_a_week: 'Six times a week',
  weekly: 'Weekly',
  bi_weekly: 'Bi-Weekly',
  monthly: 'Monthly',
}


export const FIELDS : MEDICATION_FIELDS_FORM_TYPE = {
  medication: {
    name: 'Medication',
    default: '',
    validation: yup.string(),
  },
  type: {
    name: 'Type',
    default: '',
    validation: yup.string(),
  },
  dosage: {
    name: 'Dosage',
    default: '',
    validation: yup.string(),
  },
  route_name: {
    name: 'Route',
    default: '',
    validation: yup.string().label('Route'),
  },
  side_effect: {
    name: 'Side Effect',
    default: null,
    validation: yup.string().label('Side Effect').nullable(),
  },
  script_date: {
    name: 'Script Date',
    default: null,
    validation: yup.string().label('Script Date').nullable(),
  },
  directions: {
    name: 'Directions',
    default: '',
    validation: yup.string().label('Directions'),
  },
  med_time: {
    name: 'Time',
    default: [],
    validation: yup.array().label('Time'),
  },
  doctor: {
    name: 'Doctor',
    default: '',
    validation: yup.string().label('Doctor'),
  },
  refills: {
    name: 'Refills',
    default: '',
    validation: yup.string().label('Refills'),
  },
  quantity: {
    name: 'Quantity',
    default: '',
    validation: yup.string(),
  },
  notes: {
    name: 'Notes #',
    default: '',
    validation: yup.string(),
  },
  medication_reason: {
    name: 'Medication Reason',
    default: '',
    validation: yup.string(),
  },
  status: {
    name: 'Status',
    default: '',
    validation: yup.string()
  },
  taken_days: {
    name: 'Taken Days',
    default: Object.keys(TAKEN_DAYS)[0],
    validation: yup.string()
  },
  prn_med: {
    name: 'PRN Med',
    default: false,
    validation: yup.bool()
  },
  temp_med: {
    name: 'Temporary Med',
    default: false,
    validation: yup.bool()
  }

}
