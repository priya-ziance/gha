import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent , MenuItem } from '@blueprintjs/core';
import { Formik } from 'formik';
import { Select, IItemRendererProps } from "@blueprintjs/select";
import get from 'lodash/get';
import pick from 'lodash/pick';

import ToastsContext from '../../../contexts/toasts';

import LevelsOfServiceDialog from './levelsOfService';
import ClientCustomDialog from './clientCustomForm';
import Signature from './signature';
import Services from './servicesDialog';
import Witnesses from './witnessesDialog';
import Trainers from './trainersDialog';

import IClientModel from '../../../models/client';

import api from '../../../api';

import URLS from '../../../utils/urls'; 
import { dataURItoBlob } from '../../../utils/helpers';

import formikWrapper from '../../../wrappers/formik';

import {
  Button,
  Col,
  DateInput,
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
  SEX_OPTIONS
} from './constants';

import * as helpers from './helpers';

import './index.scss';
import { IUserModel } from '../../../types';


const FormSelect = Select.ofType<string>();

interface AddClientProps {
  client?: IClientModel | undefined;
  update?: boolean;
}


const AddClient = (props: AddClientProps) => {
  const [loading, setLoading] = useState(false);
  const [signatureOpen, setSignatureOpen] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [currentDialog, setCurrentDialog] = useState('');
  const [signatureDataURL, setSignatureDataURL] = useState('');
  const [services, setServices] = useState<any>({})
  const [witnesses, setWitnesses] = useState<IUserModel[] | []>([])
  const [trainers, setTrainers] = useState<IUserModel[] | []>([])
  const { addToast } = useContext(ToastsContext);
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
      setServices(props.client.services)
    }
  }, [props.client])

  const handleDialogClose = () => setCurrentDialog('');

  const onLevelOfService = () => setCurrentDialog(DIALOG_NAMES.levelsOfService);
  const onClientCustomForm = () => setCurrentDialog(DIALOG_NAMES.clientCustomForm);
  const onServicesForm = () => setCurrentDialog(DIALOG_NAMES.services);
  const onWitnessesForm = () => setCurrentDialog(DIALOG_NAMES.witnesses);
  const onTrainersForm = () => setCurrentDialog(DIALOG_NAMES.trainers);


  const uploadProfilePicture = async () => {
    if (profilePictureFile) {
      return api.files.uploadFile(get(props, 'client.id'), 'image', profilePictureFile);
    }
  }

  const uploadSignature = async () => {
    if (signatureDataURL) {
      return api.files.uploadFile(get(props, 'client.id'), 'image', dataURItoBlob(signatureDataURL));
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
                let file = await uploadProfilePicture();
                values.profile_picture = file?.id;
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
                } catch(e) {}
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
                getNumericInputFormGroup
              },
              formikProps: {
                values,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue
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

              const profilePictureUrl = get(props, 'client.profilePicture.publicUrl', '')

              return (
                <form onSubmit={handleSubmit}>
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
                      {getNumericInputFormGroup('ssn', { childProps: { max: 999999999 } })}
                      
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
                        <div style={{ maxWidth: 200 }}>
                          <img
                            style={{ width: '100%', marginBottom: 10 }}
                            alt='client signature'
                            src={signatureDataURL || props.client?.signature?.publicUrl}
                          />
                          <Button intent={Intent.PRIMARY} onClick={onAddSignature}>
                            <b>Add Signature</b>
                          </Button>
                        </div>
                      </FormGroup>
                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Staff that can be called Trainers"}
                      >
                        <Button intent={Intent.PRIMARY} onClick={onTrainersForm}>
                          <b>Add Trainers ({trainers.length})</b>
                        </Button>
                      </FormGroup>
                    </Col>
  
                    {/* ---------------------------COL 2------------------------------- */}
                    <Col>
                      {getInputFormGroup('florida_id')}
                      {getInputFormGroup('medicaid')}
                      {getInputFormGroup('medicare')}
                      {getInputFormGroup('medicaid_waiver')}

                      {getInputFormGroup('height')}
                      {getInputFormGroup('eye_color')}
                      {getInputFormGroup('hair_color')}

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
                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={"Services provided by Group home Connect"}
                        labelFor="text-input"
                      >
                        <Button intent={Intent.PRIMARY} onClick={onServicesForm}>
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

                      {getInputFormGroup('special_equipments')}
                      {getInputFormGroup('race')}
                      
                      {getDateInputFormGroup('home_entry_date')}
                      {getDateInputFormGroup('home_discharge_date')}

                      {getInputFormGroup('secondary_diagnosis')}
                      {getInputFormGroup('allergies')}
                      
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
                  
                  <Trainers handleTrainersChange={handleTrainersChange} trainers={trainers} isOpen={trainersDialogOpen} handleClose={handleDialogClose} />
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