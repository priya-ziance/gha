import { useContext, useState } from 'react';
import { BreadcrumbProps, Button, Intent } from '@blueprintjs/core';
import { Formik, FormikHelpers } from 'formik';
import get from 'lodash/get';
import { Col, PageHeading, Row } from '../../components';
import OmniContactsInput from '../../controlled-components/OmniContactInput';
import api from '../../api';
import URLS from '../../utils/urls';
import ToastsContext from '../../contexts/toasts';
import * as helpers from './helpers';
import formikWrapper from '../../wrappers/formik';
import { FIELDS } from './constants';
import { FAMILY_CONTACT_LIST, MEDICAL_CONTACT_LIST } from '../../utils/constants';
import './index.scss';
import { IClientWithnessModel } from '../../types';
import { pick } from 'lodash';

interface AddClientWitnessProps {
  clientWitness?: IClientWithnessModel;
  update?: boolean;
}

const AddClientWitness = (props: AddClientWitnessProps) => {
  const [isOmniOpen, setIsOmniOpen] = useState(false);
  const [selectedMedical, setSelectedMedical] = useState<IClientWithnessModel | undefined>(undefined)
  const clientId = "h9YwkW4gyE"
  const { addToast } = useContext(ToastsContext);
  let initialValues;

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard') },
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links') },
    { href: URLS.getPagePath('client-witness', { clientId }), icon: 'document', text: URLS.getPagePathName('client-witness') }
  ];

  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName('edit-client-contact') })
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName('add-client-witness') })
  }

  /**
 * This assigns the client's info as the initial values if a client
 * is passed in
 */
  if (props.clientWitness) {
    console.log("props.clientWitness : " , props.clientWitness)
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.clientWitness.clientWitness, Object.keys(helpers.initialValues))
    );
  } else {
    initialValues = helpers.initialValues;
  }

  const handleSelectClientWitnessClose = () => {
    setIsOmniOpen(false);
  }

  const onSubmit = async (values: any, options: FormikHelpers<any>) => {
    const { resetForm, setSubmitting } = options;
    setSubmitting(true);
    const clientWitnessId = get(props, 'clientWitness.id', '')
    values.client = clientId;

    try {
      if (props.update) {
        await api.clientWitness.updateClientWitness(clientWitnessId, values);
        addToast({
          message: 'Client Witness Updated',
          intent: Intent.SUCCESS
        })
      } else {
        await api.clientWitness.createClientWitness(values);
        addToast({
          message: 'Client Witness Created',
          intent: Intent.SUCCESS
        })

        // Reset the form
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
    <div className='dashboard'>
      <div className='dashboard_container'>
        <div className='add-client-witness'>
          <PageHeading
            title={
              props.update ?
                'Update Client Witness Detail' :
                'Add Client Witness Detail'
            }
            breadCrumbs={BREADCRUMBS}
          />
          <div className='add-client-witness__container'>
            <Formik
              initialValues={initialValues}
              validationSchema={helpers.validationSchema}
              onSubmit={onSubmit}
            >

              {formikWrapper(({
                wrapperProps: {
                  getDateInputFormGroup,
                  getSelectFieldInputFormGroup,
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

                return (
                  <form
                    onSubmit={handleSubmit}
                  >
                    <OmniContactsInput
                      isOpen={isOmniOpen}
                      onClose={handleSelectClientWitnessClose}
                      onSelect={(clientWitness: any) => {
                        setFieldValue("first_name", clientWitness.first_name)
                        setFieldValue("last_name", clientWitness.lastName)
                        setFieldValue("address", clientWitness.add)
                        setFieldValue("mobile", clientWitness.mobile)
                        setFieldValue("email", clientWitness.email)
                        setFieldValue("contact_type", clientWitness.contactType);
                        setFieldValue("hired_date", clientWitness.hiredDate);
                        setFieldValue("location", clientWitness.location);
                        validateForm();
                        setIsOmniOpen(false);
                        setSelectedMedical(clientWitness);
                      }}
                    />

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
                        {getInputFormGroup('email', { childProps: { disabled: !!selectedMedical } })}
                      </Col>

                      <Col xs={12} md={6}>
                        {getPhoneInputFormGroup('mobile', { childProps: { type: "tel", disabled: !!selectedMedical } })}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        {getInputFormGroup('location', { childProps: { disabled: !!selectedMedical } })}
                      </Col>
                      <Col xs={6}>
                        {getDateInputFormGroup('hired_date', { childProps: { type: "date", disabled: !!selectedMedical } })}
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} md={12}>
                        {getAutocompleteInputFormGroup('address', { childProps: { disabled: !!selectedMedical } })}
                      </Col>
                    </Row>
                    
                    <div className='add-client-witness__submit-container'>
                      <Button type="submit"
                        disabled={isSubmitting} loading={isSubmitting}
                        intent={Intent.PRIMARY} large>
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
      </div>
    </div>

  );
}

export default AddClientWitness;