import { useContext, useState } from 'react';
import { BreadcrumbProps, Intent , MenuItem } from '@blueprintjs/core';
import { Formik } from 'formik';
import { Select, IItemRendererProps } from "@blueprintjs/select";
import moment from 'moment';
import get from 'lodash/get';
import pick from 'lodash/pick';

import ToastsContext from '../../../contexts/toasts';

import IClientModel from '../../../models/client';

import api from '../../../api';

import URLS from '../../../utils/urls'; 

import ClientContext from '../../../contexts/client';

import {
  Button,
  Col,
  DateInput,
  FormGroup,
  ImageDropzone,
  InputGroup,
  LoadingView,
  PageHeading,
  Row,
  Switch,
  TextArea
} from '../../../components';

import {
  DIALOG_NAMES,
  FIELDS,
  LEGAL_STATUS_OPTIONS,
  PRIMARY_DIAGNOSIS_OPTIONS,
  SEX_OPTIONS
} from './constants';

import { APPOINTMENT_FIELDS_TYPE } from '../../../types';

import * as helpers from './helpers';

import './index.scss';


const FormSelect = Select.ofType<string>();

interface AddClientProps {
  client?: IClientModel | undefined;
  update?: boolean;
}


const AddAppointment = (props: AddClientProps) => {
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  let initialValues;

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links')},
    { href: URLS.getPagePath('appointments', { clientId }), icon: 'document', text: URLS.getPagePathName('appointments')},
    { text: URLS.getPagePathName('add-appointment') } 
  ];

  const doctorList: string[] = [];



  const formSelectItemRenderer = (item: string, props: IItemRendererProps) => {
    return (
        <MenuItem
            text={item}
            // active={active}
            onClick={props.handleClick}
            shouldDismissPopover={false}
        />
    )
  }

  const getErrorToast = (message: string) => {
    return (
      <CreateClientErrorToast message={message} />
    )
  }

  const CreateClientSuccessToast = (
    <>
      <strong>Success</strong>
      <div>
        {props.update ?
          'Appointment updated successfully'
          :
          'Appointment created successfully'
        }
      </div>
    </>
  );

  const CreateClientErrorToast = (props: any) => (
    <>
      <strong>Error</strong>
      <div> {props.message} </div>
    </>
  );


  /**
   * This assigns the client's info as the initial values if a client
   * is passed in
   */
  if (props.client) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.client.client, Object.keys(helpers.initialValues))
    );
  } else {
    initialValues = helpers.initialValues;
  }

  return (
    <LoadingView loading={loading}>
      <div className='add-appointment'>
        <PageHeading
          title='Schedule Client Appointment'
          breadCrumbs={BREADCRUMBS}
        />
        <div className='add-appointment__container'>
          <Formik
            initialValues={initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);

              try {
                if (props.update) {
                  await api.clients.updateClient(get(props, 'client.id', ''), values);
                } else {
                  await api.clients.createClient(values);
                }

                addToast(
                  {
                    message: CreateClientSuccessToast,
                    timeout: 5000,
                    intent:  Intent.SUCCESS
                  }
                );
              } catch(e) {
                addToast(
                  {
                    message: getErrorToast(e.message),
                    timeout: 5000,
                    intent:  Intent.DANGER
                  }
                );
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
              const onFormSelectChange = (field: string) => (value: string) => {
                setFieldValue(field, value);
              }
              
              const onFormDateChange = (field: string) => (date: Date) => {
                setFieldValue(field, moment(date).toISOString());
              }

              const getInputFormGroup = (key: APPOINTMENT_FIELDS_TYPE) => (
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

              const getDateInputFormGroup = (key: APPOINTMENT_FIELDS_TYPE) => (
                <FormGroup
                  intent={helpers.getFormIntent(errors[key])}
                  label={get(FIELDS, key, { name: '' }).name}
                  helperText={errors[key]}
                >
                  <DateInput
                    value={values[key] ? moment(values[key]).toDate() : null}
                    onChange={onFormDateChange(key)}
                    {...helpers.getMomentFormatter('LL')}
                  />
                </FormGroup>
              );

              const getTextAreaInputFormGroup = (key: APPOINTMENT_FIELDS_TYPE) => (
                <FormGroup
                  intent={helpers.getFormIntent(errors[key])}
                  label={get(FIELDS, key, { name: '' }).name}
                  labelFor={`text-area__${key}`}
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
                  <Row>
                    {/* ---------------------------COL 1------------------------------- */}
                    <Col>
                      {getDateInputFormGroup('appointment_date')}

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={get(FIELDS, 'doctor', { name: '' }).name}
                        labelFor="text-input"
                        labelInfo={"(required)"}
                      >
                        <FormSelect
                            items={doctorList}
                            filterable={false}
                            itemRenderer={formSelectItemRenderer}
                            noResults={<MenuItem disabled={true} text="No results." />}
                            onItemSelect={onFormSelectChange('doctor')}
                        >
                            {/* children become the popover target; render value here */}
                            <Button text={values.sex} rightIcon="double-caret-vertical" />
                        </FormSelect>
                      </FormGroup>

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Type Of Appointment"}
                        labelFor="text-input"
                      >
                        <TextArea id="text-input" />
                      </FormGroup>

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Physician Notes"}
                        labelFor="text-input"
                      >
                        <TextArea id="text-input" />
                      </FormGroup>

                      {/* {getInputFormGroup('address_line_1')}
                      {getInputFormGroup('address_line_2')}
                      {getInputFormGroup('city')}
                      {getInputFormGroup('state')}

                      {getInputFormGroup('zip_code')}
                      {getInputFormGroup('phone')}
                      {getInputFormGroup('mobile')}
                      {getInputFormGroup('ssn')} */}
                      

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={get(FIELDS, 'active', { name: '' }).name}
                        labelFor="text-input"
                        labelInfo={"(required)"}
                      >
                        <Switch id="switch-input" large checked={values.active} onChange={handleChange('active')}/>
                      </FormGroup> 

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={get(FIELDS, 'annual_dental', { name: '' }).name}
                        labelFor="text-input"
                      >
                        <Switch id="switch-input" large checked={values.active} onChange={handleChange('annual_dental')}/>
                      </FormGroup> 

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={get(FIELDS, 'annual_medical', { name: '' }).name}
                        labelFor="text-input"
                      >
                        <Switch id="switch-input" large checked={values.active} onChange={handleChange('annual_medical')}/>
                      </FormGroup> 
                    </Col>
  
                    {/* ---------------------------COL 2------------------------------- */}
                    <Col>
                      {getInputFormGroup('client_name')}
                      {getInputFormGroup('time')}
                      {getInputFormGroup('contact_type')}

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Staff Notes"}
                        labelFor="text-input"
                      >
                        <TextArea id="text-input" />
                      </FormGroup>

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Appt Notes"}
                        labelFor="text-input"
                      >
                        <TextArea id="text-input" />
                      </FormGroup>

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Reprogram Medication"}
                        labelFor="text-input"
                      >
                        <Button intent={Intent.PRIMARY}>
                          <b>Reprogram Meds</b>
                        </Button>
                        
                      </FormGroup>
                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Labs"}
                        labelFor="text-input"
                      >
                        <Button intent={Intent.PRIMARY}>
                          <b>Labs</b>
                        </Button>
                      </FormGroup>
                    </Col>

                  </Row>
                  
                  <Button type="submit" disabled={isSubmitting} loading={isSubmitting} large intent={Intent.PRIMARY}>
                    {props.update ? 'Update' : 'Save'}
                  </Button>
                </form>
              )
            }}
          </Formik>
        </div>
      </div>
    </LoadingView>
  );
}

export default AddAppointment;
