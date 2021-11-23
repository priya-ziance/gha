import * as yup from 'yup';

import { MEDICATION_FIELDS_FORM_TYPE } from '../../../types';


export const FIELDS : MEDICATION_FIELDS_FORM_TYPE = {
  medication: {
    name: 'Medication',
    default: false,
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
  route: {
    name: 'Route',
    default: '',
    validation: yup.string().label('Contact Type').required(),
  },
  side_effect: {
    name: 'Side Effect',
    default: null,
    validation: yup.string().label('Side Effecrs').required().nullable(),
  },
  directions: {
    name: 'Directions',
    default: '',
    validation: yup.string().label('Directions').email(),
  },
  time: {
    name: 'Time',
    default: '',
    validation: yup.string().label('First Name').required(),
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
    validation: yup.string().required(),
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
    default: '',
    validation: yup.string()
  },
  prn_meds: {
    name: 'PRN Med',
    default: '',
    validation: yup.string()
  },
  temporary_meds: {
    name: 'Temporary Med',
    default: '',
    validation: yup.string()
  }

}
