import { useContext, useState } from 'react';
import { BreadcrumbProps, Intent, Checkbox } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Formik } from 'formik';
import get from 'lodash/get';

import { FIELDS_TYPE, JOINED_FIELDS_TYPE } from '../../../types';

import api from '../../../api';

import URLS from '../../../utils/urls';

import { Button, FormGroup, InputGroup, PageHeading, Row, TextArea } from '../../../components';

import ClientContext from '../../../contexts/client';

import Client from '../../../models/client';

import * as helpers from './helpers';

import { FIELDS } from './constants';

import './index.scss';


const Content = () => {
  const [clients, setClients] = useState<Client[] | []>([]);
  const [loading, setLoading] = useState(false);

  const { id: clientId } = useContext(ClientContext);

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links') },
    { href: URLS.getPagePath('apd', { clientId }), icon: 'document', text: URLS.getPagePathName('apd') },
    { text: URLS.getPagePathName('add-apd') }
  ];


  return (
    <div className='add-case-note'>
      <PageHeading
        title='Add APD'
        breadCrumbs={BREADCRUMBS}
      />
      <div className='add-case-note__container'>
        <Formik
            initialValues={helpers.initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);

              try {
                await api.clients.createClient(values);
              } catch(e) {}

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
              const getInputFormGroup = (key: JOINED_FIELDS_TYPE) => (
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

              const getTextAreaFormGroup = (key: JOINED_FIELDS_TYPE) => (
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

                  {getInputFormGroup('contact_type')}
                  {getInputFormGroup('first_name')}
                  {getInputFormGroup('last_name')}
                  {getTextAreaFormGroup('address')}
                  {getInputFormGroup('phone')}
                  {getInputFormGroup('mobile')}
                  {getInputFormGroup('fax')}
                  {getInputFormGroup('email')}
                  {getInputFormGroup('company')}
                  {getTextAreaFormGroup('notes')}

                  <Checkbox label='Significant Event' />

                  <Checkbox label='Active' />

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