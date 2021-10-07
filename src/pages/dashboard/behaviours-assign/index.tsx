import { useContext, useState } from 'react';
import { BreadcrumbProps, Intent, Checkbox } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Formik } from 'formik';
import get from 'lodash/get';
import moment from 'moment';

import api from '../../../api';

import URLS from '../../../utils/urls';

import { Button, Col, DateInput, FormGroup, InputGroup, PageHeading, Row, Switch, TextArea } from '../../../components';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import * as helpers from './helpers';

import './index.scss';


const Content = () => {
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links'), icon: 'document', text: URLS.getPagePathName('client-links') },
    { href: URLS.getPagePath('behaviours'), icon: 'document', text: URLS.getPagePathName('behaviours') },
    { text: URLS.getPagePathName('behaviours-assign') }
  ];

  return (
    <div className='behaviours-assign'>
      <PageHeading
        title='Assign Behaviour'
        breadCrumbs={BREADCRUMBS}
      />
      <div className='behaviours-assign__container'>
        <Formik
            initialValues={helpers.initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              setSubmitting(true);

              values.client = clientId;

              try {
                // await api.caseNotes.createCaseNote(values);

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
              return (
                <form onSubmit={handleSubmit}>
                  <Row className=''>
                    <Switch
                      label='Active'
                      checked={values.active}
                      onChange={e => {
                        setFieldValue('active', get(e, 'target.checked'))
                      }}
                    />
                    <Switch
                      label='Active'
                      checked={values.active}
                      onChange={e => {
                        setFieldValue('active', get(e, 'target.checked'))
                      }}
                    />
                    <Switch
                      label='Active'
                      checked={values.active}
                      onChange={e => {
                        setFieldValue('active', get(e, 'target.checked'))
                      }}
                    />
                    <Switch
                      label='Active'
                      checked={values.active}
                      onChange={e => {
                        setFieldValue('active', get(e, 'target.checked'))
                      }}
                    />
                    <Switch
                      label='Active'
                      checked={values.active}
                      onChange={e => {
                        setFieldValue('active', get(e, 'target.checked'))
                      }}
                    />
                  </Row>


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