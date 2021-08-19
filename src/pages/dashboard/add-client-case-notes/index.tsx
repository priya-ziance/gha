import { useContext, useState } from 'react';
import { BreadcrumbProps, Intent, Checkbox } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Formik } from 'formik';
import get from 'lodash/get';
import moment from 'moment';

import { CASE_NOTE_FIELDS_TYPE } from '../../../types';

import api from '../../../api';

import URLS from '../../../utils/urls';

import { Button, Col, DateInput, FormGroup, InputGroup, PageHeading, Switch, TextArea } from '../../../components';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import * as helpers from './helpers';

import { FIELDS } from './constants';

import './index.scss';


const Content = () => {
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: 'Dashboard'},
    { href: URLS.getPagePath('clients'), icon: 'document', text: "Clients" },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: 'Links' },
    { href: URLS.getPagePath('client-case-notes', { clientId }), icon: 'document', text: 'Case Notes' },
    { text: 'Add Client Case Note' }
  ];

  return (
    <div className='add-case-note'>
      <PageHeading
        title='Add Case Note Detail'
        breadCrumbs={BREADCRUMBS}
      />
      <div className='add-case-note__container'>
        <Formik
            initialValues={helpers.initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              setSubmitting(true);

              values.client = clientId;

              try {
                await api.caseNotes.createCaseNote(values);

                addToast({
                  message: 'Case Note Created',
                  intent: 'primary'
                })

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

              const getInputFormGroup = (key: CASE_NOTE_FIELDS_TYPE) => (
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

              const getTextAreaFormGroup = (key: CASE_NOTE_FIELDS_TYPE) => (
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

              const getDateInputFormGroup = (key: CASE_NOTE_FIELDS_TYPE) => (
                <FormGroup
                  intent={helpers.getFormIntent(errors[key])}
                  label={get(FIELDS, key, { name: '' }).name}
                  helperText={errors[key]}
                >
                  <DateInput
                    value={values[key] ? moment(values[key]).toDate() : null}
                    onChange={onFormDateChange(key)}
                    maxDate={new Date()}
                    {...helpers.getMomentFormatter('LL')}
                  />
                </FormGroup>
              );

              return (
                <form onSubmit={handleSubmit}>

                  {getInputFormGroup('title')}
                  {getDateInputFormGroup('date')}
                  {getTextAreaFormGroup('significant_event_notes')}
                  {getTextAreaFormGroup('notes')}
                  

                  <Switch
                    label='Significant Event'
                    checked={values.significant_event}
                    onChange={e => {
                      setFieldValue('significant_event', get(e, 'target.checked'))
                    }}
                  />

                  <Switch
                    label='Active'
                    checked={values.active}
                    onChange={e => {
                      setFieldValue('active', get(e, 'target.checked'))
                    }}
                  />

                  <div className='add-client-case-note__submit-container'>
                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting} intent={Intent.PRIMARY} large>
                      <b>
                        Submit
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