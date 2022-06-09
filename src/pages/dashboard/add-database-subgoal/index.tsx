import { useMemo, useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent, MenuItem } from '@blueprintjs/core';
import { Select, IItemRendererProps } from '@blueprintjs/select';
import { Formik } from 'formik';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import pick from 'lodash/pick';

import { SUBGOAL_FIELDS_TYPE } from '../../../types';

import api from '../../../api';

import URLS from '../../../utils/urls';

import { Button, FormGroup, PageHeading, Switch, TextArea } from '../../../components';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import { ISubGoalModel } from '../../../types';

import Goal from '../../../models/goal';

import * as helpers from './helpers';

import { FIELDS } from './constants';

import './index.scss';


interface AddGoalProps {
  subGoal?: ISubGoalModel | undefined;
  update?: boolean;
}


const FormSelect = Select.ofType<Goal>();

const Content = (props: AddGoalProps) => {
  const [goals, setGoals] = useState<Goal[] | []>([]);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);

  const goalsObject: any = useMemo(() => groupBy(goals, g => g.id), [goals]);

  const { subGoal, update } = props;
  let initialValues;

  useEffect(() => {
    (async () => {
      try {
        setGoals(await api.goals.getGoals(clientId))
      } catch(e: any) {
        // TODO: Show error message
      }
    })()
  }, [clientId]);


  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links')},
    { href: URLS.getPagePath('goals', { clientId }), icon: 'document', text: URLS.getPagePathName('goals') },
    { href: URLS.getPagePath('goals-database', { clientId }), icon: 'document', text: URLS.getPagePathName('goals-database') },
    { href: URLS.getPagePath('goals-database-subgoals', { clientId }), icon: 'document', text: URLS.getPagePathName('goals-database-subgoals') },
  ];

  if (update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName('edit-database-goal') })
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName('add-database-subgoal') })
  }

  /**
   * This assigns the goal's info as the initial values if a goal
   * is passed in
   */
  if (props.subGoal) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.subGoal.subGoal, Object.keys(helpers.initialValues))
    );
  } else {
    initialValues = helpers.initialValues;
  }

  const formSelectItemRenderer = (item: Goal, props: IItemRendererProps) => {
    return (
      <MenuItem
          text={item.description}
          // active={active}
          onClick={props.handleClick}
          shouldDismissPopover={false}
      />
    )
  }

  return (
    <div className='database-subGoal'>
      <PageHeading
        title={
          update ? 'Update Database SubGoal' : 'Add Database SubGoal'
        }
        breadCrumbs={BREADCRUMBS}
      />
      <div className='database-subGoal__container'>
        <Formik
            initialValues={initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              setSubmitting(true);

              try {
                if (update) {
                  await api.subgoals.updateSubGoal(subGoal?.id, values, { clientId });

                  addToast({
                    message: 'SubGoal Updated',
                    intent: 'primary'
                  })
                } else {
                  await api.subgoals.createSubGoal(values, { clientId });

                  addToast({
                    message: 'SubGoal Created',
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
              const onFormSelectChange = (field: string) => (value: Goal) => {
                setFieldValue(field, value.id);
              }

              const getTextAreaFormGroup = (key: SUBGOAL_FIELDS_TYPE) => (
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

                  <FormGroup
                    intent={Intent.PRIMARY}
                    label={get(FIELDS, 'goal', { name: '' }).name}
                    labelFor="text-input"
                    labelInfo={"(required)"}
                  >
                    <FormSelect
                        items={goals}
                        filterable={false}
                        itemRenderer={formSelectItemRenderer}
                        noResults={<MenuItem disabled={true} text="No results." />}
                        onItemSelect={onFormSelectChange('goal')}
                    >
                        {/* children become the popover target; render value here */}
                        <Button text={goalsObject[values.goal] ? goalsObject[values.goal][0].description : ''} rightIcon="double-caret-vertical" />
                    </FormSelect>
                  </FormGroup>

                  {getTextAreaFormGroup('description')}

                  <Switch
                    label='Active'
                    checked={values.active}
                    onChange={e => {
                      setFieldValue('active', get(e, 'target.checked'))
                    }}
                  />

                  <div className='database-subGoal__submit-container'>
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