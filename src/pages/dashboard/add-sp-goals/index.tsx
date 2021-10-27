import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent, Checkbox, MenuItem } from '@blueprintjs/core';
import { Select, IItemRendererProps } from "@blueprintjs/select";
import { Formik } from 'formik';
import get from 'lodash/get';

import moment from 'moment';

import { SP_GOALS_FIELDS_TYPE } from '../../../types';

import api from '../../../api';

import URLS from '../../../utils/urls';

import { Button, DateInput, FormGroup, H4, InputGroup, PageHeading, TextArea } from '../../../components';

import LoadingWrapper from '../../../wrappers/loading';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import Client from '../../../models/client';

import * as helpers from './helpers';

import { FIELDS, GOALS } from './constants';

import IGoalModel from '../../../models/goal';
import SubGoal from '../../../models/subGoal';


import './index.scss';


const FormSelect = Select.ofType<string>();

interface AddGoalProps {
  goal?: IGoalModel | undefined;
  update?: boolean;
}

const Content = (props: AddGoalProps) => {
  const [client, setClient] = useState<Client | {}>({});
  const [subGoals, setSubGoals] = useState<SubGoal[] | []>([]);
  const [selectedSubGoals, setSelectedSubgoals] = useState<{ [key: string]: boolean }>({});
  const [loadingClient, setLoadingClient] = useState(false);

  const { addToast } = useContext(ToastsContext);
  const { id: clientId } = useContext(ClientContext);

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: 'Dashboard'},
    { href: URLS.getPagePath('clients'), icon: 'document', text: "Clients" },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: 'Links' },
    { href: URLS.getPagePath('goals', { clientId }), icon: 'document', text: 'Goals' },
    { href: URLS.getPagePath('sp-goals', { clientId }), icon: 'document', text: 'SP Goals' },
    { text: 'Add SP Goals' }
  ];

  useEffect(() => {
    (async () => {
      setLoadingClient(true);

      if (clientId) {
        try {
          setClient(await api.clients.getClient(clientId))
        } catch(e) {}
      }

      setLoadingClient(false);
    })()
  }, [clientId])

  useEffect(() => {
    (async () => {
      try {
        setSubGoals(await api.subgoals.getSubGoals(clientId))
      } catch(e) {
        // TODO: Show error message
      }
    })()
  }, [clientId]);

  const formSelectItemRenderer = (item: string, props: IItemRendererProps) => {
    return (
        <MenuItem
            text={item}
            // active={active}
            onClick={props.handleClick}
            shouldDismissPopover={false}
        />
    )
  }


  const SuccessToast = (
    <>
      <strong>Success</strong>
      <div>
        {props.update ?
          'Goal updated successfully'
          :
          'Goal created successfully'
        }
      </div>
    </>
  );

  const getErrorToast = (message: string) => {
    return (
      <CreateGoalErrorToast message={message} />
    )
  }
  const CreateGoalErrorToast = (props: any) => (
    <>
      <strong>Error</strong>
      <div> {props.message} </div>
    </>
  );

  return (
    <LoadingWrapper loading={loadingClient}>
      <div className='add-sp-goal'>
      <PageHeading
        title='Add SP Goal Detail'
        breadCrumbs={BREADCRUMBS}
      />
      <div className='add-sp-goal__container'>
        <Formik
            initialValues={helpers.initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);

              values.sub_goals = Object.keys(selectedSubGoals);

              try {
                if (props.update) {
                  await api.spGoals.updateSpGoal(get(props, 'client.id', ''), values);
                } else {
                  await api.spGoals.createSpGoal(values, { clientId });
                }

                addToast(
                  {
                    message: SuccessToast,
                    timeout: 5000,
                    intent:  Intent.SUCCESS
                  }
                );
              } catch(e) {
                console.log(e)
                addToast(
                  {
                    message: getErrorToast(e.message),
                    timeout: 5000,
                    intent:  Intent.DANGER
                  }
                );
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
              const onFormDateChange = (field: string) => (date: Date) => {
                setFieldValue(field, moment(date).toISOString());
              }

              const onFormSelectChange = (field: string) => (value: string) => {
                setFieldValue(field, value);
              }

              const getInputFormGroup = (key: SP_GOALS_FIELDS_TYPE, inputProps: any = {}) => (
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
                    {...inputProps}
                  />
                </FormGroup>
              )

              const getTextAreaFormGroup = (key: SP_GOALS_FIELDS_TYPE) => (
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

              const getDateInputFormGroup = (key: SP_GOALS_FIELDS_TYPE) => (
                <FormGroup
                  intent={helpers.getFormIntent(errors[key])}
                  label={get(FIELDS, key, { name: '' }).name}
                  helperText={errors[key]}
                >
                  <DateInput
                    value={values[key] ? moment(values[key]).toDate() : null}
                    onChange={onFormDateChange(key)}
                    {...helpers.getMomentFormatter('LL')}
                  />
                </FormGroup>
              );


              return (
                <form onSubmit={handleSubmit}>

                  <FormGroup
                    label={'Support Date'}
                  >
                    <InputGroup
                      value={'Support'}
                    />
                  </FormGroup>
                  <FormGroup
                    label={'Client Name'}
                  >
                    <InputGroup
                      value={get(client, 'name')}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup
                    intent={Intent.PRIMARY}
                    label={get(FIELDS, 'description', { name: '' }).name}
                    labelFor="text-input"
                  >
                    <FormSelect
                        items={GOALS}
                        filterable={false}
                        itemRenderer={formSelectItemRenderer}
                        noResults={<MenuItem disabled={true} text="No results." />}
                        onItemSelect={onFormSelectChange('description')}
                    >
                        {/* children become the popover target; render value here */}
                        <Button text={values.description} rightIcon="double-caret-vertical" />
                    </FormSelect>
                  </FormGroup>

                  {getInputFormGroup('entries')}
                  {getDateInputFormGroup('start_date')}
                  {getDateInputFormGroup('end_date')}

                  <Checkbox label='Active' onChange={handleChange('active')} checked={values.active} />

                  {getTextAreaFormGroup('notes')}

                  <div>
                    <H4>Subgoals</H4>
                    {subGoals.map(subGoal => {
                      const isSelected = selectedSubGoals[subGoal.id]

                      const onChange = () => {
                        if (!isSelected) {
                          setSelectedSubgoals((select: any) => {
                            select[subGoal.id] = true;

                            return Object.assign({}, select);
                          })
                        } else {
                          setSelectedSubgoals((select: any) => {
                            delete select[subGoal.id];

                            return Object.assign({}, select);
                          })
                        }
                      }
                      
                      return (
                        <Checkbox label={subGoal.description} onChange={onChange} checked={isSelected} />
                      )
                    })}
                  </div>

                  <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                    Submit
                  </Button>
                </form>
              )
            }}
        </Formik>
      </div>
    </div>
    </LoadingWrapper>
  );
}

export default Content;