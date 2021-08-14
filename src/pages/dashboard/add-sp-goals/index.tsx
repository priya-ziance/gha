import { useContext, useState } from 'react';
import { BreadcrumbProps, Intent, Checkbox, MenuItem } from '@blueprintjs/core';
import { Select, IItemRendererProps } from "@blueprintjs/select";
import { Formik } from 'formik';
import get from 'lodash/get';
import moment from 'moment';

import { FIELDS_TYPE, SP_GOALS_FIELDS_TYPE } from '../../../types';

import api from '../../../api';

import URLS from '../../../utils/urls';

import { Button, DateInput, FormGroup, InputGroup, PageHeading, TextArea } from '../../../components';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import Client from '../../../models/client';

import * as helpers from './helpers';

import { FIELDS, GOALS } from './constants';

import IGoalModel from '../../../models/goal';


import './index.scss';


const FormSelect = Select.ofType<string>();

interface AddGoalProps {
  goal?: IGoalModel | undefined;
  update?: boolean;
}

const Content = (props: AddGoalProps) => {
  const [clients, setClients] = useState<Client[] | []>([]);
  const [loading, setLoading] = useState(false);

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
    <div className='add-case-note'>
      <PageHeading
        title='Add SP Goal Detail'
        breadCrumbs={BREADCRUMBS}
      />
      <div className='add-case-note__container'>
        <Formik
            initialValues={helpers.initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);

              try {
                if (props.update) {
                  await api.goals.updateGoal(get(props, 'client.id', ''), values);
                } else {
                  await api.goals.createGoal(values);
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
              touched,
              handleChange,
              handleBlur,
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
                      value={'Support'}
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
                  {getTextAreaFormGroup('notes')}

                  <Checkbox label='Active' onChange={handleChange('active')} checked={values.active} />


                  <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                    Submit
                  </Button>
                </form>
              )
            }}
        </Formik>
      </div>
    </div>
  );
}

export default Content;