import * as yup from 'yup';

import { BEHAVIOUR_FIELDS_FORM_TYPE } from '../../../types';

export const FIELDS : BEHAVIOUR_FIELDS_FORM_TYPE = {
  active: {
    name: 'Active',
    default: false,
    validation: yup.bool(),
  },
  behaviour_type: {
    name: 'Behaviour Type',
    default: '',
    validation: yup.string(),
  },
  behaviour_description: {
    name: 'Behaviour Description',
    default: '',
    validation: yup.string(),
  }
}
