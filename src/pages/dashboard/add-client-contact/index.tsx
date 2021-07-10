import { useContext } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import get from 'lodash/get';
import moment from 'moment';

import { CLIENT_CONTACT_FIELDS_TYPE } from '../../../types';

import api from '../../../api';

import URLS from '../../../utils/urls';

import { Button, Col, DateInput, FormGroup, InputGroup, PageHeading, Row, Switch, TextArea } from '../../../components';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import * as helpers from './helpers';

import { FIELDS } from './constants';

import './index.scss';


const AddClientContact = () => {
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: 'Dashboard'},
    { href: URLS.getPagePath('clients'), icon: 'document', text: "Clients" },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: 'Links' },
    { href: URLS.getPagePath('client-contacts', { clientId }), icon: 'document', text: 'Client Contacts' },
    { text: 'Add Client Contact' }
  ];

  return (
    <div className='add-client-contact'>
      <PageHeading
        title='Add Client Contact Detail'
        breadCrumbs={BREADCRUMBS}
      />
      <div className='add-client-contact__container'>
        <Formik
            initialValues={helpers.initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              setSubmitting(true);

              values.client = clientId;

              try {
                await api.clientContacts.createClientContact(values);
                addToast({
                  message: 'Client Contact Created',
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

              const getInputFormGroup = (key: CLIENT_CONTACT_FIELDS_TYPE) => (
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

              const getTextAreaFormGroup = (key: CLIENT_CONTACT_FIELDS_TYPE) => (
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

              const getDateInputFormGroup = (key: CLIENT_CONTACT_FIELDS_TYPE) => (
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

                  {getInputFormGroup('contact_type')}
                  <Row>
                    <Col xs={12} md={6}>
                      {getInputFormGroup('first_name')}
                    </Col>
                    <Col xs={12} md={6}>
                      {getInputFormGroup('last_name')}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      {getDateInputFormGroup('date_of_birth')}
                    </Col>
                    <Col xs={12} md={6}>
                      {getInputFormGroup('address')}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={4}>
                      {getInputFormGroup('phone')}
                    </Col>
                    <Col xs={12} md={4}>
                      {getInputFormGroup('mobile')}
                    </Col>
                    <Col xs={12} md={4}>
                      {getInputFormGroup('fax')}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      {getInputFormGroup('email')}
                    </Col>
                    <Col xs={12} md={6}>
                      {getInputFormGroup('company')}
                    </Col>
                  </Row>
                  {getTextAreaFormGroup('notes')}
                  <Switch
                    label='Active'
                    checked={values.active}
                    onChange={e => {
                      setFieldValue('active', get(e, 'target.checked'))
                    }}
                  />

                  <div className='add-client-contact__submit-container'>
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

export default AddClientContact;