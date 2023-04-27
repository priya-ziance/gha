import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Button, Intent } from '@blueprintjs/core';
import { Formik, FormikHelpers } from 'formik';
import get from 'lodash/get';
import pick from 'lodash/pick';

import { Col, PageHeading, Row } from '../../../components';
import OmniContactsInput from '../../../controlled-components/OmniContactInput';

import { IClientContactModel, IClientModel } from '../../../types';
import api from '../../../api';
import URLS from '../../../utils/urls';
import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';
import * as helpers from './helpers';
import formikWrapper from '../../../wrappers/formik';
import { FIELDS } from './constants';
import { FAMILY_CONTACT_LIST, MEDICAL_CONTACT_LIST } from '../../../utils/constants';
import './index.scss';
import Client from '../../../models/client';


interface AddClientContactProps {
  clientContact?: IClientContactModel;
  update?: boolean;
}

const AddClientContact = (props: AddClientContactProps) => {
  const [isOmniOpen, setIsOmniOpen] = useState(false);
  const [selectedMedical, setSelectedMedical] = useState<IClientContactModel | undefined>(undefined)
  const [clientNames, setClientNames] = useState<IClientModel[]>([])
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  let initialValues;

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard') },
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
    const nameResult = clientNames.find((item) => item?.id === clientId)
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.clientContact.clientContact, Object.keys(helpers.initialValues))
    );
    initialValues = { ...initialValues, client_name: nameResult?.firstName || "" }
  } else {
    const nameResult = clientNames.find((item) => item?.id === clientId)
    initialValues = { ...helpers.initialValues, client_name: nameResult?.firstName || "" }
  }

  const handleSelectMedicalContactClick = () => {
    setIsOmniOpen(true);
  }

  const handleSelectMedicalContactClose = () => {
    setIsOmniOpen(false);
  }
  useEffect(() => {
    (async () => {
      try {
        setClientNames(
          await api.clients.getClients()
        )
      } catch (e: any) { }
    })()
  })

  const onSubmit = async (values: any, options: FormikHelpers<any>) => {
    const { resetForm, setSubmitting } = options;


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
        resetForm();
      }
    } catch (e: any) {
      addToast({
        message: 'Something went wrong',
        intent: Intent.DANGER
      })
    }

    setSubmitting(false);
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
          enableReinitialize
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
              isSubmitting,
              setFieldValue,
              validateForm
            }
          }) => {
            const clearMedicalContact = () => {
              setSelectedMedical(undefined);
              setFieldValue("medical_contact_id", undefined);
            }

            return (
              <form onSubmit={handleSubmit}>
                <OmniContactsInput
                  isOpen={isOmniOpen}
                  onClose={handleSelectMedicalContactClose}
                  onSelect={(medicalContact: IClientContactModel) => {
                    setFieldValue("first_name", medicalContact.firstName)
                    setFieldValue("last_name", medicalContact.lastName)
                    setFieldValue("address", medicalContact.address)
                    setFieldValue("phone", medicalContact.phone)
                    setFieldValue("fax", medicalContact.fax)
                    setFieldValue("mobile", medicalContact.mobile)
                    setFieldValue("notes", medicalContact.notes)
                    setFieldValue("company", medicalContact.company)
                    setFieldValue("email", medicalContact.email)
                    setFieldValue("medical_contact_id", medicalContact.id);
                    setFieldValue("contact_type", medicalContact.contactType);
                    setFieldValue("medical_contact", true);
                    validateForm();
                    setIsOmniOpen(false);
                    setSelectedMedical(medicalContact);
                  }}
                />

                {!!selectedMedical && (
                  <Button
                    intent='danger'
                    className='mb-4 mt-3'
                    onClick={clearMedicalContact}
                    text="Clear Medical Contact" />
                )}

                <div className='flex flex-row items-center gap-4'>
                  <div>
                    {
                      getSelectFieldInputFormGroup(
                        'contact_type',
                        {
                          childProps: {
                            selectOptions: [...MEDICAL_CONTACT_LIST, ...FAMILY_CONTACT_LIST],
                            capitalizeFirst: true,
                            disabled: selectedMedical
                          }
                        }
                      )
                    }
                  </div>
                  {!props.update &&
                    <>
                      <span className='mt-[-8px]'>or</span>
                      <div className='mt-[-8px]'>
                        <Button
                          text="Find medical contact"
                          intent='primary'
                          style={{
                            maxWidth: 200
                          }}
                          onClick={handleSelectMedicalContactClick}
                        />
                      </div>
                    </>
                  }
                  {getInputFormGroup('client_name', { childProps: { disabled:true } })}
                </div>
                <Row>
                  <Col xs={12} md={6}>
                    {getInputFormGroup('first_name', { childProps: { disabled: !!selectedMedical } })}
                  </Col>
                  <Col xs={12} md={6}>
                    {getInputFormGroup('last_name', { childProps: { disabled: !!selectedMedical } })}
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    {getAutocompleteInputFormGroup('address', { childProps: { disabled: !!selectedMedical } })}
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={4}>
                    {getPhoneInputFormGroup('phone', { childProps: { type: "tel", disabled: !!selectedMedical } })}
                  </Col>
                  <Col xs={12} md={4}>
                    {getPhoneInputFormGroup('mobile', { childProps: { type: "tel", disabled: !!selectedMedical } })}
                  </Col>
                  <Col xs={12} md={4}>
                    {getPhoneInputFormGroup('fax', { childProps: { type: "tel", disabled: !!selectedMedical } })}
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    {getInputFormGroup('email', { childProps: { disabled: !!selectedMedical } })}
                  </Col>
                  <Col xs={12} md={6}>
                    {getInputFormGroup('company', { childProps: { disabled: !!selectedMedical } })}
                  </Col>
                </Row>
                {getTextAreaInputFormGroup('notes', { childProps: { disabled: !!selectedMedical } })}
                {getSwitchInputFormGroup('active')}
                {getSwitchInputFormGroup('medical_contact', { childProps: { disabled: !!selectedMedical } })}

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