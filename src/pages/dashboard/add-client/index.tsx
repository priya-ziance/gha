import { useContext, useState } from 'react';
import { BreadcrumbProps, Intent , MenuItem } from '@blueprintjs/core';
import { Formik } from 'formik';
import { Select, IItemRendererProps } from "@blueprintjs/select";
import moment from 'moment';
import get from 'lodash/get';
import pick from 'lodash/pick';

import ToastsContext from '../../../contexts/toasts';

import LevelsOfServiceDialog from './levelsOfService';
import ClientCustomDialog from './clientCustomForm';

import IClientModel from '../../../models/client';

import api from '../../../api';

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

import { CLIENT_FIELDS_TYPE } from '../../../types';

import * as helpers from './helpers';

import './index.scss';


const BREADCRUMBS: BreadcrumbProps[] = [
  { href: '/dashboard', icon: "document", text: 'Dashboard'},
  { href: '/dashboard/clients', icon: 'document', text: "Clients" },
  { text: 'Client' }
];

const FormSelect = Select.ofType<string>();

interface AddClientProps {
  client?: IClientModel | undefined;
  update?: boolean;
}


const AddClient = (props: AddClientProps) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [currentDialog, setCurrentDialog] = useState('');
  const { addToast } = useContext(ToastsContext);
  let initialValues;

  const handleDialogClose = () => setCurrentDialog('');

  const onLevelOfService = () => setCurrentDialog(DIALOG_NAMES.levelsOfService);
  const onClientCustomForm = () => setCurrentDialog(DIALOG_NAMES.clientCustomForm);

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
          'Client updated successfully'
          :
          'Client created successfully'
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
      <div className='client'>
        <PageHeading
          title='Client Detail'
          breadCrumbs={BREADCRUMBS}
        />
        <div className='client__container'>
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
                console.log(e)
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

              const getInputFormGroup = (key: CLIENT_FIELDS_TYPE) => (
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

              const getDateInputFormGroup = (key: CLIENT_FIELDS_TYPE) => (
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

              const getTextAreaInputFormGroup = (key: CLIENT_FIELDS_TYPE) => (
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

              const levelOfServiceOpen = currentDialog === DIALOG_NAMES.levelsOfService;
              const clientCustomFormOpen = currentDialog === DIALOG_NAMES.clientCustomForm;

              return (
                <form onSubmit={handleSubmit}>
                  <FormGroup
                    intent={Intent.PRIMARY}
                    label={'User Image'}
                  >
                    <ImageDropzone />
                  </FormGroup>
                  <Row>
                    {/* ---------------------------COL 1------------------------------- */}
                    <Col>
                      {getInputFormGroup('first_name')}
                      {getInputFormGroup('middle_name')}
                      {getInputFormGroup('last_name')}

                      {getDateInputFormGroup('date_of_birth')}

                      {getInputFormGroup('email')}

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={get(FIELDS, 'sex', { name: '' }).name}
                        labelFor="text-input"
                        labelInfo={"(required)"}
                      >
                        <FormSelect
                            items={SEX_OPTIONS}
                            filterable={false}
                            itemRenderer={formSelectItemRenderer}
                            noResults={<MenuItem disabled={true} text="No results." />}
                            onItemSelect={onFormSelectChange('sex')}
                        >
                            {/* children become the popover target; render value here */}
                            <Button text={values.sex} rightIcon="double-caret-vertical" />
                        </FormSelect>
                      </FormGroup>

                      {getInputFormGroup('address_line_1')}
                      {getInputFormGroup('address_line_2')}
                      {getInputFormGroup('city')}
                      {getInputFormGroup('state')}

                      {getInputFormGroup('zip_code')}
                      {getInputFormGroup('phone')}
                      {getInputFormGroup('mobile')}
                      {getInputFormGroup('ssn')}
                      
                      {getTextAreaInputFormGroup('behaviours')}

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
                        label={"Signature"}
                      >
                        <Button intent={Intent.PRIMARY}>
                          <b>Add Signature</b>
                        </Button>
                      </FormGroup>
                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Trainers"}
                      >
                        <Button intent={Intent.PRIMARY}>
                          <b>Add Trainers</b>
                        </Button>
                      </FormGroup>
                    </Col>
  
                    {/* ---------------------------COL 2------------------------------- */}
                    <Col>
                      {getInputFormGroup('florida_id')}
                      {getInputFormGroup('medicaid')}
                      {getInputFormGroup('medicare')}
                      {getInputFormGroup('medicaid_waiver')}

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={get(FIELDS, 'current_month_weight', { name: '' }).name}
                        labelFor="text-input"
                        labelInfo={"(required)"}
                      >
                        <InputGroup id="text-input" />
                      </FormGroup>

                      {getInputFormGroup('height')}
                      {getInputFormGroup('eye_color')}
                      {getInputFormGroup('hair_color')}
                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={get(FIELDS, 'legal_status', { name: '' }).name}
                        labelFor="text-input"
                        labelInfo={"(required)"}
                      >
                        <FormSelect
                            items={LEGAL_STATUS_OPTIONS}
                            filterable={false}
                            itemRenderer={formSelectItemRenderer}
                            noResults={<MenuItem disabled={true} text="No results." />}
                            onItemSelect={onFormSelectChange('legal_status')}
                        >
                            {/* children become the popover target; render value here */}
                            <Button text={values.legal_status} rightIcon="double-caret-vertical" />
                        </FormSelect>
                      </FormGroup>

                      {getInputFormGroup('language')}

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={get(FIELDS, 'primary_diagnosis', { name: '' }).name}
                        labelFor="text-input"
                        labelInfo={"(required)"}
                      >
                        <FormSelect
                            items={PRIMARY_DIAGNOSIS_OPTIONS}
                            filterable={false}
                            itemRenderer={formSelectItemRenderer}
                            noResults={<MenuItem disabled={true} text="No results." />}
                            onItemSelect={onFormSelectChange('primary_diagnosis')}
                        >
                            {/* children become the popover target; render value here */}
                            <Button text={values.primary_diagnosis} rightIcon="double-caret-vertical" />
                        </FormSelect>
                      </FormGroup>
                      
                      {getInputFormGroup('secondary_diagnosis')}
                      {getInputFormGroup('allergies')}
                      
                      {getTextAreaInputFormGroup('likes')}
                      {getTextAreaInputFormGroup('definition_of_abuse')}

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Witnessess"}
                        labelFor="text-input"
                      >
                        <Button intent={Intent.PRIMARY}>
                          <b>Add Witnessess</b>
                        </Button>
                      </FormGroup>
                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Services"}
                        labelFor="text-input"
                      >
                        <Button intent={Intent.PRIMARY}>
                          <b>Services</b>
                        </Button>
                      </FormGroup>
                    </Col>
  
                    {/* ---------------------------COL 3------------------------------- */}
                    <Col>
                      {getInputFormGroup('health_insurance')}
                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={get(FIELDS, 'effective_date', { name: '' }).name}
                        labelFor="text-input"
                        labelInfo={"(required)"}
                      >
                        <DateInput {...helpers.getMomentFormatter('LL')}/>
                      </FormGroup>

                      {getInputFormGroup('monthly_ssi_amount')}

                      {getInputFormGroup('special_equipments')}
                      {getInputFormGroup('bank_account_name')}
                      {getInputFormGroup('bank_account_number')}
                      {getInputFormGroup('race')}
                      
                      {getDateInputFormGroup('home_entry_date')}
                      {getDateInputFormGroup('home_discharge_date')}

                      {getInputFormGroup('religion')}
                      {getInputFormGroup('vision')}
                      {getInputFormGroup('hearing')}
                      {getInputFormGroup('mobility')}
                      
                      {getTextAreaInputFormGroup('dislikes')}
                      {getTextAreaInputFormGroup('notes')}

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Custom Forms"}
                        labelFor="text-input"
                      >
                        <Button intent={Intent.PRIMARY} onClick={onClientCustomForm}>
                          <b>Add Custom Forms</b>
                        </Button>
                      </FormGroup>
                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Level of Service"}
                        labelFor="text-input"
                      >
                        <Button intent={Intent.PRIMARY} onClick={onLevelOfService}>
                          <b>Level of Service</b>
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup
                    intent={Intent.PRIMARY}
                    label={"Client History"}
                    labelFor="text-input"
                  >
                    <TextArea id="text-input" />
                  </FormGroup>
                  <Button type="submit" disabled={isSubmitting} loading={isSubmitting} large intent={Intent.PRIMARY}>
                    {props.update ? 'Update' : 'Submit'}
                  </Button>

                  <LevelsOfServiceDialog isOpen={levelOfServiceOpen} handleClose={handleDialogClose} />

                  <ClientCustomDialog isOpen={clientCustomFormOpen} handleClose={handleDialogClose} />
                </form>
              )
            }}
          </Formik>
        </div>
      </div>
    </LoadingView>
  );
}

export default AddClient;