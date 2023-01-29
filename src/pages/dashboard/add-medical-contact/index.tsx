import { useContext } from 'react';
import { BreadcrumbProps, Button, Intent } from '@blueprintjs/core';
import { Formik, FormikHelpers } from 'formik';
import get from 'lodash/get';
import pick from 'lodash/pick';

import { Col, PageHeading, Row } from '../../../components';

import { IClientContactModel } from '../../../types';
import api from '../../../api';
import URLS from '../../../utils/urls';
import ToastsContext from '../../../contexts/toasts';
import * as helpers from './helpers';
import formikWrapper from '../../../wrappers/formik';
import { FIELDS } from './constants';
import { MEDICAL_CONTACT_LIST } from '../../../utils/constants';
import './index.scss';


interface AddClientContactProps {
  medicalContact?: IClientContactModel;
  update?: boolean;
}

const AddClientContact = (props: AddClientContactProps) => {
  const { addToast } = useContext(ToastsContext);
  let initialValues;

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('admins'), icon: 'document', text: URLS.getPagePathName('admins') },
    { href: URLS.getPagePath('medical-contacts'), icon: 'document', text: URLS.getPagePathName('medical-contacts') }
  ];

  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName('edit-medical-contact') })
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName('add-medical-contact') })
  }

    /**
   * This assigns the client's info as the initial values if a client
   * is passed in
   */
  if (props.medicalContact) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.medicalContact.clientContact, Object.keys(helpers.initialValues))
    );
  } else {
    initialValues = helpers.initialValues;
  }

  const onSubmit = async (values: any, options: FormikHelpers<any>) => {
    const { resetForm, setSubmitting } = options;

    setSubmitting(true);

    const clientContactId = get(props, 'medicalContact.id', '')

    try {
      if (props.update) {
        await api.clientContacts.updateMedicalContact(clientContactId, values);
        addToast({
          message: 'Medical Contact Updated',
          intent: Intent.SUCCESS
        })
      } else {
        await api.clientContacts.createMedicalContact(values);
        addToast({
          message: 'Medical Contact Created',
          intent: Intent.SUCCESS
        })

        // Reset the form
        resetForm();
        }
    } catch(e: any) {
      addToast({
        message: 'Something went wrong',
        intent: Intent.DANGER
      })
    }

    setSubmitting(false);
  }

  return (
    <div className='add-medical-contact'>
      <PageHeading
        title={
          props.update ?
          'Update Medical Contact Detail' :
          'Add Medical Contact Detail'
        }
        breadCrumbs={BREADCRUMBS}
      />
      <div className='add-medical-contact__container'>
        <Formik
            initialValues={initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={onSubmit}
            >

            {formikWrapper(({
              wrapperProps: {
                getTextAreaInputFormGroup,
                getSelectFieldInputFormGroup,
                getSwitchInputFormGroup,
                getInputFormGroup,
                getAutocompleteInputFormGroup,
                getPhoneInputFormGroup
              },
              formikProps: {
                handleSubmit,
                isSubmitting
              }
            }) => {

              return (
                <form onSubmit={handleSubmit}>
                  {
                    getSelectFieldInputFormGroup(
                      'contact_type',
                      {
                        childProps: {
                          selectOptions: MEDICAL_CONTACT_LIST,
                          capitalizeFirst: true
                        }
                      }
                    )
                  }
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
                      {getAutocompleteInputFormGroup('address')}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={4}>
                      {getPhoneInputFormGroup('phone', { childProps: { type: "tel" } })}
                    </Col>
                    <Col xs={12} md={4}>
                      {getPhoneInputFormGroup('mobile', { childProps: { type: "tel" } })}
                    </Col>
                    <Col xs={12} md={4}>
                      {getPhoneInputFormGroup('fax', { childProps: { type: "tel" } })}
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
                  {getSwitchInputFormGroup('medical_contact', { childProps: { disabled: true } })}

                  <div className='add-medical-contact__submit-container'>
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