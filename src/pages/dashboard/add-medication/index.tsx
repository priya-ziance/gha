import { useContext, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import get from 'lodash/get';
import pick from 'lodash/pick';
import moment from 'moment';

import { IMedicationModel, MEDICATION_FIELDS_TYPE } from '../../../types';

import api from '../../../api';

import URLS from '../../../utils/urls';

import {
  Button,
  Col,
  DateInput,
  FileInput,
  FormGroup,
  FormItemSelect,
  InputGroup,
  NumericInput,
  PageHeading,
  Row,
  Switch,
  TextArea
} from '../../../components';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import * as helpers from './helpers';

import { FIELDS, TAKEN_DAYS } from './constants';

import './index.scss';


interface AddMedicationProps {
  medication?: IMedicationModel;
  update?: boolean;
}

const AddMedication = (props: AddMedicationProps) => {
  const [pillPictureFile, setPillPictureFile] = useState<File | null>(null); 
  const [scriptFile, setScriptFile] = useState<File | null>(null); 
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);

  let initialValues;

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: 'Dashboard'},
    { href: URLS.getPagePath('clients'), icon: 'document', text: "Clients" },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: 'Links' },
    { href: URLS.getPagePath('medication', { clientId }), icon: 'document', text: URLS.getPagePathName('medication') },
    { href: URLS.getPagePath('medication-list', { clientId }), icon: 'document', text: URLS.getPagePathName('medication-list') }
  ];

  if (props.update) {
    BREADCRUMBS.push({ text: 'Update Client Medication' })
  } else {
    BREADCRUMBS.push({ text: 'Add Client Medication' })
  }

  const uploadDocument = async (document: File) => {
    if (document) {
      return api.files.uploadFile(clientId, 'image', document);
    }
  }

  const getDocumentText = (documentFile: any, savedDocument: any) => {
    if (documentFile) {
      return get(documentFile, 'name')
    } else {
      return get(savedDocument, 'key')
    }
  }

    /**
   * This assigns the expense's info as the initial values if a client
   * is passed in
   */
     if (props.medication) {
      initialValues = Object.assign(
        {},
        helpers.initialValues,
        pick(props.medication.medication, Object.keys(helpers.initialValues))
      );
    } else {
      initialValues = helpers.initialValues;
    }

  const onDocumentChange = (setDocumentFile: any) => (e: any) => {
    setDocumentFile(get(e, 'target.files', [])[0])
  }

  return (
    <div className='add-medication'>
      <PageHeading
        title='Add Client Medication'
        breadCrumbs={BREADCRUMBS}
      />
      <div className='add-medication__container'>
        <Formik
            initialValues={initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              const medicationId = get(props, 'medication.id')

              setSubmitting(true);

              values.client = clientId;

              if (pillPictureFile) {
                try {
                  let file = await uploadDocument(pillPictureFile);
                  values.picture = file?.id;
                } catch(e) {}
              }

              if (scriptFile) {
                try {
                  let file = await uploadDocument(scriptFile);
                  values.script = file?.id;
                } catch(e) {}
              }

              try {
                if (props.update) {
                  await api.medications.updateMedication(medicationId, values);
                  addToast({
                    message: 'Client Medication Updated',
                    intent: Intent.SUCCESS
                  })
                } else {
                  await api.medications.createMedication(values);
                  addToast({
                    message: 'Client Medication Added',
                    intent: Intent.SUCCESS
                  })
                }

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
                  className='gha__form-group--width-100'
                >
                  <InputGroup
                    id={`text-input__${key}`}
                    intent={helpers.getFormIntent(errors[key])}
                    onChange={handleChange(key)}
                    value={values[key]}
                    className='gha__form-group--width-100'
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
                    className='gha__form-group--width-100'
                  />
                </FormGroup>
              )

              const getNumericInput = (key: MEDICATION_FIELDS_TYPE, inputOptions = {}) => (
                <FormGroup
                  intent={helpers.getFormIntent(errors[key])}
                  label={get(FIELDS, key, { name: '' }).name}
                  labelFor={`numeric-input__${key}`}
                  helperText={errors[key]}
                >
                  <NumericInput
                    id={`numeric-input__${key}`}
                    intent={helpers.getFormIntent(errors[key])}
                    onValueChange={(_: any, value: string) => {
                      setFieldValue(key, value)
                    }}
                    value={values[key]}
                    min={0}
                    {...inputOptions}
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
                      {getNumericInput('dosage')}
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
                      {getNumericInput('quantity')}
                    </Col>
                  </Row>

                  <FormGroup
                    intent={Intent.PRIMARY}
                    label={'Pill Picture'}
                  >
                    <FileInput
                      text={getDocumentText(pillPictureFile, get(props, 'medication.picture'))}
                      onChange={onDocumentChange(setPillPictureFile)}
                    />
                  </FormGroup>

                  {getTextAreaFormGroup('notes')}
                  {getTextAreaFormGroup('medication_reason')}

                  {getDateInputFormGroup('script_date')}

                  <FormGroup
                    intent={Intent.PRIMARY}
                    label={'Upload Script'}
                  >
                    <FileInput
                      text={getDocumentText(scriptFile, get(props, 'medication.script'))}
                      onChange={onDocumentChange(setScriptFile)}
                    />
                  </FormGroup>

                  <FormItemSelect
                    buttonText={get(TAKEN_DAYS, values.taken_days, '')}
                    items={Object.keys(TAKEN_DAYS)}
                    label={get(FIELDS, 'taken_days', { name: '' }).name}
                    menuRenderer={item => get(TAKEN_DAYS, item, '')}
                    onFormSelectChange={(handleChange('taken_days'))}
                  />

                  <Switch
                    label='Temporary Med'
                    checked={values.temp_meds}
                    onChange={e => {
                      setFieldValue('temp_meds', get(e, 'target.checked'))
                    }}
                  />

                  <Switch
                    label='PRN Med'
                    checked={values.prn_meds}
                    onChange={e => {
                      setFieldValue('prn_meds', get(e, 'target.checked'))
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
