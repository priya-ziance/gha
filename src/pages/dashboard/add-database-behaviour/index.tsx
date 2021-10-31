import { useContext } from 'react';
import { BreadcrumbProps, Intent} from '@blueprintjs/core';
import { Formik } from 'formik';
import get from 'lodash/get';
import pick from 'lodash/pick';

import { BEHAVIOUR_FIELDS_TYPE } from '../../../types';

import api from '../../../api';

import URLS from '../../../utils/urls';

import { Button, FormGroup, InputGroup, PageHeading, Switch, TextArea } from '../../../components';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import { IBehaviourModel } from '../../../types';

import * as helpers from './helpers';

import { FIELDS } from './constants';

import './index.scss';


interface AddGoalProps {
  behaviour?: IBehaviourModel | undefined;
  update?: boolean;
}


const Content = (props: AddGoalProps) => {
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  const { behaviour, update } = props;
  let initialValues;


  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links')},
    { href: URLS.getPagePath('behaviours', { clientId }), icon: 'document', text: URLS.getPagePathName('behaviours') },
    { href: URLS.getPagePath('behaviours-database', { clientId }), icon: 'document', text: URLS.getPagePathName('behaviours-database') },
  ];

  if (update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName('edit-database-behaviour') })
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName('add-database-behaviour') })
  }

  /**
   * This assigns the behaviour's info as the initial values if a behaviour
   * is passed in
   */
   if (props.behaviour) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.behaviour.behaviour, Object.keys(helpers.initialValues))
    );
  } else {
    initialValues = helpers.initialValues;
  }

  return (
    <div className='database-behaviour'>
      <PageHeading
        title={
          update ? 'Update Database Behaviour' : 'Add Database Behaviour'
        }
        breadCrumbs={BREADCRUMBS}
      />
      <div className='database-behaviour__container'>
        <Formik
            initialValues={initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              setSubmitting(true);

              try {
                if (update) {
                  await api.behaviours.updateBehaviour(behaviour?.id, values, { clientId });

                  addToast({
                    message: 'Behaviour Updated',
                    intent: 'primary'
                  })
                } else {
                  await api.behaviours.createBehaviour(values, { clientId });

                  addToast({
                    message: 'Behaviour Created',
                    intent: 'primary'
                  })
                }

                // Reset the form
                resetForm();
              } catch(e) {
                addToast({
                  message: 'Something went wrong',
                  intent: 'danger'
                })
              }

              setSubmitting(false);
            }}
            >

            {({
              values,
              errors,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue
            }) => {
              const getInputFormGroup = (key: BEHAVIOUR_FIELDS_TYPE) => (
                <FormGroup
                  intent={helpers.getFormIntent(errors[key])}
                  label={get(FIELDS, key, { name: '' }).name}
                  labelFor={`text-input__${key}`}
                  helperText={errors[key]}
                >
                  <InputGroup
                    id={`text-input__${key}`}
                    intent={helpers.getFormIntent(errors[key])}
                    onChange={handleChange(key)}
                    value={values[key]}
                  />
                </FormGroup>
              )

              const getTextAreaFormGroup = (key: BEHAVIOUR_FIELDS_TYPE) => (
                <FormGroup
                  intent={helpers.getFormIntent(errors[key])}
                  label={get(FIELDS, key, { name: '' }).name}
                  labelFor={`text-input__${key}`}
                  helperText={errors[key]}
                >
                  <TextArea
                    id={`text-area__${key}`}
                    intent={helpers.getFormIntent(errors[key])}
                    onChange={handleChange(key)}
                    value={values[key]}
                  />
                </FormGroup>
              )

              return (
                <form onSubmit={handleSubmit}>

                  {getInputFormGroup('behaviour_type')}

                  {getTextAreaFormGroup('behaviour_description')}

                  <Switch
                    label='Active'
                    checked={values.active}
                    onChange={e => {
                      setFieldValue('active', get(e, 'target.checked'))
                    }}
                  />

                  <div className='database-behaviour__submit-container'>
                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting} intent={Intent.PRIMARY} large>
                      <b>
                        { update ? 'Update' : 'Submit' }
                      </b>
                    </Button>
                  </div>
                </form>
              )
            }}
        </Formik>
      </div>
    </div>
  );
}

export default Content;