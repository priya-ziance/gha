import { useContext } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import get from 'lodash/get';
import pick from 'lodash/pick';

import { IClientContactModel } from '../../../types';

import api from '../../../api';

import URLS from '../../../utils/urls';

import { Button, Col, PageHeading, Row } from '../../../components';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import * as helpers from './helpers';

import formikWrapper from '../../../wrappers/formik';

import { CONTACT_TYPES, FIELDS } from './constants';

import './index.scss';


interface AddClientContactProps {
  clientContact?: IClientContactModel;
  update?: boolean;
}

const AddClientContact = (props: AddClientContactProps) => {
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  let initialValues;

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links') },
    { href: URLS.getPagePath('client-contacts', { clientId }), icon: 'document', text: URLS.getPagePathName('client-contacts') }
  ];

  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName('edit-client-contact') })
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName('add-client-contact') })
  }

    /**
   * This assigns the client's info as the initial values if a client
   * is passed in
   */
    if (props.clientContact) {
      initialValues = Object.assign(
        {},
        helpers.initialValues,
        pick(props.clientContact.clientContact, Object.keys(helpers.initialValues))
      );
    } else {
      initialValues = helpers.initialValues;
    }

  return (
    <div className='add-client-contact'>
      <PageHeading
        title={
          props.update ?
          'Update Client Contact Detail' :
          'Add Client Contact Detail'
        }
        breadCrumbs={BREADCRUMBS}
      />
      <div className='add-client-contact__container'>
        <Formik
            initialValues={initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              setSubmitting(true);

              const clientContactId = get(props, 'clientContact.id', '')

              values.client = clientId;

              try {
                if (props.update) {
                  await api.clientContacts.updateClientContact(clientContactId, values);
                  addToast({
                    message: 'Client Contact Updated',
                    intent: Intent.SUCCESS
                  })
                } else {
                  await api.clientContacts.createClientContact(values);
                  addToast({
                    message: 'Client Contact Created',
                    intent: Intent.SUCCESS
                  })

                  // Reset the form
                  resetForm();
                  }
              } catch(e) {
                addToast({
                  message: 'Something went wrong',
                  intent: Intent.DANGER
                })
              }

              setSubmitting(false);
            }}
            >

            {formikWrapper(({
              wrapperProps: {
                getDateInputFormGroup,
                getTextAreaInputFormGroup,
                getSelectFieldInputFormGroup,
                getSwitchInputFormGroup,
                getInputFormGroup
              },
              formikProps: {
                handleSubmit,
                isSubmitting
              }
            }) => {
              return (
                <form onSubmit={handleSubmit}>

                  {getSelectFieldInputFormGroup('contact_type', { childProps: { selectOptions: CONTACT_TYPES, capitalizeFirst: true } })}
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
                  {getTextAreaInputFormGroup('notes')}
                  {getSwitchInputFormGroup('active')}
                  {getSwitchInputFormGroup('medical_contact')}

                  <div className='add-client-contact__submit-container'>
                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting} intent={Intent.PRIMARY} large>
                      <b>
                        {props.update ? 'Update' : 'Submit'}
                      </b>
                    </Button>
                  </div>
                </form>
              )
            }, FIELDS)}
        </Formik>
      </div>
    </div>
  );
}

export default AddClientContact;