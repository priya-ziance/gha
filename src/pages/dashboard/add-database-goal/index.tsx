import { useContext } from 'react';
import { BreadcrumbProps, Intent} from '@blueprintjs/core';
import { Formik } from 'formik';
import get from 'lodash/get';
import pick from 'lodash/pick';

import { GOAL_FIELDS_TYPE } from '../../../types';

import api from '../../../api';

import URLS from '../../../utils/urls';

import { Button, FormGroup, PageHeading, Switch, TextArea } from '../../../components';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import { IGoalModel } from '../../../types';

import * as helpers from './helpers';

import { FIELDS } from './constants';

import './index.scss';


interface AddGoalProps {
  goal?: IGoalModel | undefined;
  update?: boolean;
}


const Content = (props: AddGoalProps) => {
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  const { goal, update } = props;
  let initialValues;


  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links')},
    { href: URLS.getPagePath('goals', { clientId }), icon: 'document', text: URLS.getPagePathName('goals') },
    { href: URLS.getPagePath('goals-database', { clientId }), icon: 'document', text: URLS.getPagePathName('goals-database') },
    { href: URLS.getPagePath('goals-database-goals', { clientId }), icon: 'document', text: URLS.getPagePathName('goals-database-goals') },
  ];

  if (update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName('edit-database-goal') })
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName('add-database-goal') })
  }

  /**
   * This assigns the goal's info as the initial values if a goal
   * is passed in
   */
   if (props.goal) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.goal.goal, Object.keys(helpers.initialValues))
    );
  } else {
    initialValues = helpers.initialValues;
  }

  return (
    <div className='database-goal'>
      <PageHeading
        title={
          update ? 'Update Database Goal' : 'Add Database Goal'
        }
        breadCrumbs={BREADCRUMBS}
      />
      <div className='database-goal__container'>
        <Formik
            initialValues={initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              setSubmitting(true);

              try {
                if (update) {
                  await api.goals.updateGoal(goal?.id, values, { clientId });

                  addToast({
                    message: 'Goal Updated',
                    intent: 'primary'
                  })
                } else {
                  await api.goals.createGoal(values, { clientId });

                  addToast({
                    message: 'Goal Created',
                    intent: 'primary'
                  })
                }

                // Reset the form
                resetForm();
              } catch(e: any) {
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
              const getTextAreaFormGroup = (key: GOAL_FIELDS_TYPE) => (
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

                  {getTextAreaFormGroup('description')}

                  <Switch
                    label='Active'
                    checked={values.active}
                    onChange={e => {
                      setFieldValue('active', get(e, 'target.checked'))
                    }}
                  />

                  <div className='database-goal__submit-container'>
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