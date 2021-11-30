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

import formikWrapper from '../../../wrappers/formik';

import {
  Button,
  Col,
  DateInput,
  FormGroup,
  InputGroup,
  LoadingView,
  PageHeading,
  Row,
  Switch,
  TextArea
} from '../../../components';

import { FIELDS } from './constants';

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
                  await api.appointments.updateAppointment(get(props, 'appointment.id', ''), values);
                } else {
                  await api.appointments.createAppointment(values);
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

            {formikWrapper(({
              wrapperProps: {
                getDateInputFormGroup,
                getTextAreaInputFormGroup,
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
                    <Row>
                      {/* ---------------------------COL 1------------------------------- */}
                      <Col>
                        {getDateInputFormGroup('appointment_date')}
  
                        {/* <FormGroup
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
                              <Button text={values.sex} rightIcon="double-caret-vertical" />
                          </FormSelect>
                        </FormGroup>
   */}
                        {getTextAreaInputFormGroup('type_of_appointment')}
  
                        {getTextAreaInputFormGroup('physicain_notes')}
  
                        {getSwitchInputFormGroup('active')}
  
                        {getSwitchInputFormGroup('annual_dental')}
  
                        {getSwitchInputFormGroup('annual_medical')}
  
                      </Col>
    
                      {/* ---------------------------COL 2------------------------------- */}
                      <Col>
                        {getInputFormGroup('time')}
  
                        {getInputFormGroup('contact_type')}
  
                        {getTextAreaInputFormGroup('staff_notes')}
  
                        {getTextAreaInputFormGroup('appt_notes')}
  
                        {getDateInputFormGroup('follow_up_date')}
  
                        <FormGroup
                          intent={Intent.PRIMARY}
                          label={"Reprogram Medication"}
                        >
                          <Button intent={Intent.PRIMARY}>
                            <b>Reprogram Meds</b>
                          </Button>
                          
                        </FormGroup>
                        <FormGroup
                          intent={Intent.PRIMARY}
                          label={"Labs"}
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
              }, FIELDS
            )}
          </Formik>
        </div>
      </div>
    </LoadingView>
  );
}

export default AddAppointment;
