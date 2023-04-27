import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent , MenuItem } from '@blueprintjs/core';
import { Formik } from 'formik';
import { Select, IItemRendererProps } from "@blueprintjs/select";
import get from 'lodash/get';
import pick from 'lodash/pick';

import ToastsContext from '../../../contexts/toasts';
import LocationContext from '../../../contexts/location';

import LevelsOfServiceDialog from './levelsOfService';
import ClientCustomDialog from './clientCustomForm';
import ClientWitnessDialog from './clientWitnessForm';
import StaffWitnessDialog from './staffWitnessForm';
import Signature from './signature';
import Services from './servicesDialog';
import Witnesses from './witnessesDialog';
import Trainers from './trainersDialog';
import BehaviourDialog from './behaviourForm';

import IClientModel from '../../../models/client';

import api from '../../../api';

import URLS from '../../../utils/urls'; 
import { dataURItoBlob } from '../../../utils/helpers';

import formikWrapper from '../../../wrappers/formik';

import {
  Button,
  Col,
  FileDropzone,
  FormGroup,
  ImageDropzone,
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
  FUNDS_METHODS_OPTIONS,
  SEX_OPTIONS
} from './constants';

import * as helpers from './helpers';

import { IUserModel } from '../../../types';

import './index.scss';


const FormSelect = Select.ofType<string>();

interface AddClientProps {
  client?: IClientModel;
  update?: boolean;
}


const AddClient = (props: AddClientProps) => {
  const [loading, setLoading] = useState(false);
  const [signatureOpen, setSignatureOpen] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [floridaFile, setFloridaFile] = useState<File | null>(null);
  const [insuranceFile, setInsuranceFile] = useState<File | null>(null);
  const [currentDialog, setCurrentDialog] = useState('');
  const [signatureDataURL, setSignatureDataURL] = useState('');
  const [services, setServices] = useState<any>({})
  const [witnesses, setWitnesses] = useState<IUserModel[] | []>([])
  const [trainers, setTrainers] = useState<any[] | []>([])
  const { addToast } = useContext(ToastsContext);
  const { location, locations } = useContext(LocationContext);
  let initialValues;

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') }
  ];

  if (props.update) {
    BREADCRUMBS.push({
      href: URLS.getPagePath('client-links',
      { clientId: props.client?.id }),
      icon: 'document', text: URLS.getPagePathName('client-links') 
    })
    BREADCRUMBS.push({ text: URLS.getPagePathName('client-info') })
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName('client-info') })
  }

  useEffect(() => {
    if (props.client) {
      console.log("client data",props.client.trainers);
      setServices(props.client.services)
      setWitnesses(props.client.witnesses || [])
      setTrainers(props.client.trainers || [])
    }
  }, [props.client])

  const handleDialogClose = () => setCurrentDialog('');
  const onLevelOfService = () => setCurrentDialog(DIALOG_NAMES.levelsOfService);
  const onClientCustomForm = () => setCurrentDialog(DIALOG_NAMES.clientCustomForm);
  const onServicesForm = () => setCurrentDialog(DIALOG_NAMES.services);
  const onWitnessesForm = () => setCurrentDialog(DIALOG_NAMES.witnesses);
  const onTrainersForm = () => setCurrentDialog(DIALOG_NAMES.trainers);
  const onBehaviourForm = ()=> setCurrentDialog(DIALOG_NAMES.behaviour)
  const onClientWitnessForm = () => setCurrentDialog(DIALOG_NAMES.clientWitness);
  const onStaffWitnessForm = () => setCurrentDialog(DIALOG_NAMES.staffWitness);
  


  const uploadFile = async (file: File) => {
    if (file && props.client) {
      return api.files.uploadFile(get(props.client, 'id'), 'image', file);
    }
  }

  const uploadSignature = async () => {
    if (signatureDataURL && props.client) {
      return api.files.uploadFile(get(props.client, 'id'), 'image', dataURItoBlob(signatureDataURL));
    }
  }

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

  const setProfilePicture = (files: File[]) => {
    setProfilePictureFile(files[0]);
  }

  const onDocumentChange = (func: (f: File | null) => void) => (files: File[]) => {
    func(files[0])
  }


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
    initialValues.phone = location?.phoneNumber
    initialValues.address_line_1 = location?.address
  }

  const handleWitnessesChange = (users: { [key: string]: IUserModel }) => {
    setWitnesses(Object.values(users))
  }

  const handleTrainersChange = (users: { [key: string]: IUserModel }) => {
    setTrainers(Object.values(users))
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

              if (profilePictureFile) {
                let file = await uploadFile(profilePictureFile);
                values.profile_picture = file?.id;
              }

              if (floridaFile) {
                let fFile = await uploadFile(floridaFile);
                values.florida_id = fFile?.id;
              }

              if (insuranceFile) {
                let sFile = await uploadFile(insuranceFile);
                values.health_insurance = sFile?.id;
              }

              if (witnesses && Array.isArray(witnesses)) {
                values.witnesses = witnesses.map(w => w.id)
              }

              if (trainers && Array.isArray(trainers)) {
                values.trainers = trainers.map(w => w.id)
              }

              /**
               * signatureDataURL should only be available if a new signature was
               * added
               */
              if (signatureDataURL) { 
                try {
                  let signatureFile = await uploadSignature();
                  values.signature = signatureFile?.id;
                } catch(e: any) {}
              }

              values.services = services;

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
              } catch(e: any) {
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
                getInputFormGroup,
                getNumericInputFormGroup,
                getSelectFieldInputFormGroup
              },
              formikProps: {
                values,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                errors
              }
            }) => {
              const onFormSelectChange = (field: string) => (value: string) => {
                setFieldValue(field, value);
              }

              const onAddSignature = () => setSignatureOpen(true);
              const onCloseSignature = () => setSignatureOpen(false);

              const levelOfServiceOpen = currentDialog === DIALOG_NAMES.levelsOfService;
              const clientCustomFormOpen = currentDialog === DIALOG_NAMES.clientCustomForm;
              const servicesDialogOpen = currentDialog === DIALOG_NAMES.services;
              const witnessesDialogOpen = currentDialog === DIALOG_NAMES.witnesses;
              const trainersDialogOpen = currentDialog === DIALOG_NAMES.trainers;
              const behaviourDialogOpen = currentDialog === DIALOG_NAMES.behaviour;
              const clientWitnessesDialogOpen = currentDialog === DIALOG_NAMES.clientWitness;
              const staffWitnessesDialogOpen = currentDialog === DIALOG_NAMES.staffWitness;

              const profilePictureUrl = get(props, 'client.profilePicture.publicUrl', '')
              const floridaFileUrl = get(props, 'client.floridaId.publicUrl', '')
              const healthInsuranceFileUrl = get(props, 'client.healthInsurance.publicUrl', '')

              return (
                <form onSubmit={handleSubmit}>
                
                  <Row>
                    {/* ---------------------------COL 1------------------------------- */}
                    <Col>
                    <FormGroup
                    intent={Intent.PRIMARY}
                    label={'User Image'}
                  >
                    <ImageDropzone
                      files={profilePictureFile ? [profilePictureFile]: []}
                      setFiles={setProfilePicture}
                      imagesUrls={profilePictureUrl ? [profilePictureUrl] : []}
                    />
                  </FormGroup>
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

                      {
                        getSelectFieldInputFormGroup(
                          'address_line_1',
                          {
                            childProps: {
                              // Allow the client to only select from the
                              // current business locations
                              selectOptions: locations?.map(loc => loc.address),
                              capitalizeFirst: true
                            }
                          }
                        )
                      }
                      {/* {getInputFormGroup('address_line_2')}
                      {getInputFormGroup('city')}
                      // {getInputFormGroup('state')} */}
                      {getInputFormGroup('monthly_ssi_amount')}
                      {getInputFormGroup("special_equipments")}
                      {getInputFormGroup("bank_account_name")}
                      {getInputFormGroup("bank_routing_number")}
                      {getInputFormGroup("bank_account_number")}
                      {getInputFormGroup("current_month_weight")}
                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={get(FIELDS, 'funds_method', { name: '' }).name}
                        labelFor="text-input"
                        labelInfo={"(required)"}
                      >
                        <FormSelect
                            items={FUNDS_METHODS_OPTIONS}
                            filterable={false}
                            itemRenderer={formSelectItemRenderer}
                            noResults={<MenuItem disabled={true} text="No results." />}
                            onItemSelect={onFormSelectChange('funds_method')}
                        >
                            <Button text={values.funds_method} rightIcon="double-caret-vertical" />
                        </FormSelect>
                      </FormGroup>
                      {getInputFormGroup('zip_code')}
                      {getInputFormGroup('phone')}
                      {getInputFormGroup('mobile')}
                      {getNumericInputFormGroup('ssn', { childProps: { max: 999999999 } })}
                      
                      {getTextAreaInputFormGroup('behaviours')}

                      <FormGroup
                        intent={Intent.PRIMARY} 
                        label={get(FIELDS, 'active', { name: '' }).name}
                        labelFor="text-input"
                        labelInfo={"(required)"}
                      >
                        <Switch
                          id="switch-input"
                          large
                          checked={values.active}
                          onChange={handleChange('active')}
                        />
                      </FormGroup>
                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Signature"}
                      >
                        <div style={{ maxWidth: 200 }}>
                          {(signatureDataURL || props.client?.signature?.publicUrl) &&
                            <img
                              style={{ width: '100%', marginBottom: 10 }}
                              alt='client signature'
                              src={signatureDataURL || props.client?.signature?.publicUrl}
                            />
                          }
                          <Button intent={Intent.PRIMARY} onClick={onAddSignature}>
                            <b>Add Signature</b>
                          </Button>
                        </div>
                      </FormGroup>
                    
                    </Col>
  
                    {/* ---------------------------COL 2------------------------------- */}
                    <Col>
                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={'Florida ID'}
                      >
                        <FileDropzone
                          setFiles={onDocumentChange(setFloridaFile)}
                          accept='image/*,.pdf'
                          files={floridaFile ? [floridaFile] : []}
                          imagesUrls={floridaFileUrl ? [floridaFileUrl] : []}
                        />
                      </FormGroup>
                      {getNumericInputFormGroup('medicaid')}
                      {getNumericInputFormGroup('medicare')}
                      {getNumericInputFormGroup('medicaid_waiver')}

                      {getInputFormGroup('height')}
                      {getInputFormGroup('eye_color')}
                      {getInputFormGroup('hair_color')}
                      {getDateInputFormGroup('client_support_plan_starting_month')}
                      {getInputFormGroup('religion')}
                      {getInputFormGroup('mobility')}
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

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Staff to be used as Witnesses"}
                        labelFor="text-input"
                      >
                        <Button intent={Intent.PRIMARY} onClick={onWitnessesForm}>
                          <b>Add Witnessess ({witnesses.length})</b>
                        </Button>
                      </FormGroup>
                      {/* <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Services provided by Group home Connect"}
                        labelFor="text-input"
                      >
                        <Button intent={Intent.PRIMARY} onClick={onServicesForm}>
                          <b>Services</b>
                        </Button>
                      </FormGroup> */}

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Client Witness"}
                        labelFor="text-input"
                      >
                        <Button intent={Intent.PRIMARY} onClick={onClientWitnessForm}>
                          <b>Client Witness</b>
                        </Button>
                      </FormGroup>

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Staff Witness"}
                        labelFor="text-input"
                      >
                        <Button intent={Intent.PRIMARY} 
                        onClick={onStaffWitnessForm}
                        >
                          <b>Staff Witness ({witnesses.length})</b>
                        </Button>
                      </FormGroup>
                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Staff that can be called Trainers"}
                      >
                        <Button intent={Intent.PRIMARY} 
                        onClick={onTrainersForm}>
                          <b>Add Trainers ({trainers.length})</b>
                        </Button>
                      </FormGroup>
                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Behaviour"}
                      >
                        <Button intent={Intent.PRIMARY} 
                        onClick={onBehaviourForm}>
                          <b>behaviour ({trainers.length})</b>
                        </Button>
                      </FormGroup>
                    </Col>
  
                    {/* ---------------------------COL 3------------------------------- */}
                    <Col>
                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={'Health Insurance'}
                      >
                        <FileDropzone
                          setFiles={onDocumentChange(setInsuranceFile)}
                          accept='image/*,.pdf'
                          files={insuranceFile ? [insuranceFile] : []}
                          imagesUrls={healthInsuranceFileUrl ? [healthInsuranceFileUrl] : []}
                        />
                      </FormGroup>
                      
                      {getDateInputFormGroup('effective_date')}
 
                      {getInputFormGroup('special_equipments')}
                      {getInputFormGroup('race')}
                      
                      {getDateInputFormGroup('home_entry_date')}
                      {getDateInputFormGroup('home_discharge_date')}

                      {getInputFormGroup('secondary_diagnosis')}
                      {getInputFormGroup('allergies')}
                      {getInputFormGroup('vision')}
                      {getInputFormGroup('hearing')}
                      {getTextAreaInputFormGroup('likes')}
                      {getTextAreaInputFormGroup('definition_of_abuse')}
                      
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
                        label={"Level of Service Required by staff"}
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

                  <Services handleServicesChange={setServices} services={services} isOpen={servicesDialogOpen} handleClose={handleDialogClose} />

                  <Signature isOpen={signatureOpen} onClose={onCloseSignature} onSave={setSignatureDataURL} />

                  <Witnesses handleWitnessesChange={handleWitnessesChange} witnesses={witnesses} isOpen={witnessesDialogOpen} handleClose={handleDialogClose} />
                  
                  <Trainers handleTrainerChange={handleTrainersChange} trainers={trainers} isOpen={trainersDialogOpen} handleClose={handleDialogClose} />

                  <ClientWitnessDialog isOpen={clientWitnessesDialogOpen} handleClose={handleDialogClose} />

                  <StaffWitnessDialog isOpen={staffWitnessesDialogOpen} handleClose={handleDialogClose} />

                  <BehaviourDialog isOpen={behaviourDialogOpen} handleClose={handleDialogClose} />
                </form>
              )
            }, FIELDS)}
          </Formik>
        </div>
      </div>
    </LoadingView>
  );
}

export default AddClient;