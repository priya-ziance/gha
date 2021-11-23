import { useContext } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import get from 'lodash/get';
import moment from 'moment';

import { MEDICATION_FIELDS_TYPE } from '../../../types';

import api from '../../../api';

import URLS from '../../../utils/urls';

import { Button, Col, DateInput, FormGroup, InputGroup, PageHeading, Row, Switch, TextArea } from '../../../components';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import * as helpers from './helpers';

import { FIELDS } from './constants';

import './index.scss';


const AddMedication = () => {
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: 'Dashboard'},
    { href: URLS.getPagePath('clients'), icon: 'document', text: "Clients" },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: 'Links' },
    { href: URLS.getPagePath('medication', { clientId }), icon: 'document', text: URLS.getPagePathName('medication') },
    { text: 'Add Client Medication' }
  ];

  return (
    <div className='add-medication'>
      <PageHeading
        title='Add Client Medication'
        breadCrumbs={BREADCRUMBS}
      />
      <div className='add-medication__container'>
        <Formik
            initialValues={helpers.initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              setSubmitting(true);

              values.client = clientId;

              try {
                await api.clientContacts.createClientContact(values);
                addToast({
                  message: 'Client Medication Added',
                  intent: Intent.SUCCESS
                })

                // Reset the form
                resetForm();
              } catch(e) {
                addToast({
                  message: 'Something went wrong',
                  intent: Intent.DANGER
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
              const onFormDateChange = (field: string) => (date: Date) => {
                setFieldValue(field, moment(date).toISOString());
              }

              const getInputFormGroup = (key: MEDICATION_FIELDS_TYPE) => (
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

              const getTextAreaFormGroup = (key: MEDICATION_FIELDS_TYPE) => (
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

              const getDateInputFormGroup = (key: MEDICATION_FIELDS_TYPE) => (
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
                  <Row>
                    <Col xs={12} md={6}>
                      {getInputFormGroup('medication')}
                    </Col>
                    <Col xs={12} md={6}>
                      {getInputFormGroup('type')}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      {getDateInputFormGroup('dosage')}
                    </Col>
                    <Col xs={12} md={6}>
                      {getInputFormGroup('route')}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={4}>
                      {getInputFormGroup('side_effect')}
                    </Col>
                    <Col xs={12} md={4}>
                      {getInputFormGroup('directions')}
                    </Col>
                    <Col xs={12} md={4}>
                      {getInputFormGroup('doctor')}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      {getInputFormGroup('refills')}
                    </Col>
                    <Col xs={12} md={6}>
                      {getInputFormGroup('quantity')}
                    </Col>
                  </Row>
                  {getTextAreaFormGroup('notes')}
                  {getTextAreaFormGroup('medication_reason')}
                  <Switch
                    label='Active'
                    checked={values.active}
                    onChange={e => {
                      setFieldValue('active', get(e, 'target.checked'))
                    }}
                  />

                  <div className='add-medication__submit-container'>
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

export default AddMedication;
