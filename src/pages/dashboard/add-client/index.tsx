import { useState } from 'react';
import { BreadcrumbProps, Classes, Intent , MenuItem, RadioGroup, Radio } from '@blueprintjs/core';
import { Formik } from 'formik';
import { Select, IItemRendererProps } from "@blueprintjs/select";
import { Tooltip2 } from "@blueprintjs/popover2";

import api from '../../../api';

import {
  AnchorButton,
  Button,
  Col,
  DateInput,
  Dialog,
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
  FIELDS,
  FUNDS_METHODS_OPTIONS,
  LEGAL_STATUS_OPTIONS,
  PRIMARY_DIAGNOSIS_OPTIONS,
  SEX_OPTIONS
} from './constants';

import * as helpers from './helpers';

import './index.scss';
import moment from 'moment';


const BREADCRUMBS: BreadcrumbProps[] = [
  { href: '/dashboard', icon: "document", text: 'Dashboard'},
  { href: '/dashboard/clients', icon: 'document', text: "Clients" },
  { text: 'Client' }
];

const FormSelect = Select.ofType<string>();

const AddClient = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [levelOfServiceOpen, setLevelOfServiceOpen] = useState(false);

  const handleLevelOfServiceClose = () => setLevelOfServiceOpen(false);

  const onLevelOfService = () => setLevelOfServiceOpen(true);

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

  return (
    <LoadingView loading={loading}>
      <div className='client'>
        <PageHeading
          title='Client Detail'
          breadCrumbs={BREADCRUMBS}
        />
        <div className='client__container'>
          <Formik
            initialValues={helpers.initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);

              try {
                await api.clients.createClient(values);
              } catch(e) {}

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

              const getInputFormGroup = (key: string) => (
                <FormGroup
                  intent={helpers.getFormIntent(errors[key])}
                  label={FIELDS[key].name}
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

              const getDateInputFormGroup = (key: string) => (
                <FormGroup
                  intent={helpers.getFormIntent(errors[key])}
                  label={FIELDS[key].name}
                  helperText={errors[key]}
                >
                  <DateInput
                    value={values[key] ? moment(values[key]).toDate() : null}
                    onChange={onFormDateChange(key)}
                    {...helpers.getMomentFormatter('LL')}
                  />
                </FormGroup>
              );

              const getTextAreaInputFormGroup = (key: string) => (
                <FormGroup
                  intent={helpers.getFormIntent(errors[key])}
                  label={FIELDS[key].name}
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
                        label={FIELDS.sex.name}
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
                        label={FIELDS.active.name}
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
                        label={FIELDS.current_month_weight.name}
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
                        label={FIELDS.legal_status.name}
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
                        label={FIELDS.primary_diagnosis.name}
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
                      
                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={FIELDS.location.name}
                        labelFor="text-input"
                        labelInfo={"(required)"}
                      >
                        <InputGroup id="text-input" />
                      </FormGroup>
                      
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
                        label={FIELDS.effective_date.name}
                        labelFor="text-input"
                        labelInfo={"(required)"}
                      >
                        <DateInput {...helpers.getMomentFormatter('LL')}/>
                      </FormGroup>

                      {getInputFormGroup('monthly_ssi_amount')}

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={FIELDS.funds_method.name}
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
                            {/* children become the popover target; render value here */}
                            <Button text={values.funds_method} rightIcon="double-caret-vertical" />
                        </FormSelect>
                      </FormGroup>
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
                        <Button intent={Intent.PRIMARY}>
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
                  <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                    Submit
                  </Button>
                </form>
              )
            }}
          </Formik>
        </div>

        <Dialog
            icon="info-sign"
            onClose={handleLevelOfServiceClose}
            title="Level of Service"
            isOpen={levelOfServiceOpen}
        >
            <div className={`${Classes.DIALOG_BODY} add-client__levelsOfService`}>
                <div>
                  <p>
                      <strong>
                          1. How many prompts and or physical assistance does a client need daily to complete self care/ daily living activities? 
                      </strong>
                  </p>
                  <RadioGroup
                    // onChange={this.handleMealChange}
                    // selectedValue={this.state.mealType}
                  >
                    <Row>
                      <Col>
                        <Radio label="Verbal Prompts Only" value="Verbal Prompts Only" />
                        <Radio label="both prompts & physical assistance" value="both prompts & physical assistance" />
                      </Col>
                      <Col>
                        <Radio label="physical assistance" value="physical assistance" />
                        <Radio label="Full care for all daily living activities" value="Full care for all daily living activities" />
                      </Col>
                    </Row>
                  </RadioGroup>
                  <Row>
                    <Col>
                      <p style={{ textAlign:'end' }}>
                        # of prompts or physical assistance a day =
                      </p>
                    </Col>
                    <Col>
                      <InputGroup />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p style={{ textAlign:'end' }}>
                        # of physical assistance daily =
                      </p>
                      <br />
                    </Col>
                    <Col>
                      <InputGroup />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p style={{ textAlign:'end' }}>
                        If full care only, how many hours a day spent completing all daily living activities?
                      </p>
                    </Col>
                    <Col>
                      <InputGroup />
                    </Col>
                  </Row>
                </div>
                <div>
                  <p>
                      <strong>
                          2. Does the client need assistance or intervention to eat safely?
                      </strong>
                  </p>
                  <RadioGroup
                    // onChange={this.handleMealChange}
                    // selectedValue={this.state.mealType}
                  >
                    <Row>
                      <Col>
                        <Radio label="Verbal assistance only" value="verbal assistance only" />
                        <Radio label="fully dependent on staff to feed" value="fully dependent on staff to feed" />
                        <Radio label="full observation to prevent choking" value="full observation to prevent choking" />
                      </Col>
                      <Col>
                        <Radio label="physical assistance" value="physical assistance" />
                        <Radio label="adaptive utensils used" value="adaptive utensils used" />
                      </Col>
                    </Row>
                  </RadioGroup>
                  <Row>
                    <Col>
                      <p style={{ textAlign:'end' }}>
                      # of intervention needed per meal =
                      </p>
                    </Col>
                    <Col>
                      <InputGroup />
                    </Col>
                  </Row>
                </div>
                <div>
                  <p>
                      <strong>
                        3. Incontinent of Bowel or Bladder.
                      </strong>
                  </p>
                  <RadioGroup
                    // onChange={this.handleMealChange}
                    // selectedValue={this.state.mealType}
                  >
                    <Row>
                      <Col>
                        <Radio label="client goes independently but requires scheduled toileting to avoid accidents" value="client goes independently but requires scheduled toileting to avoid accidents" />
                        <Radio label="requires full staff assistance to properly clean them self" value="requires full staff assistance to properly clean them self" />
                      </Col>
                      <Col>
                        <Radio label="physical assistance" value="physical assistance" />
                        <Radio label="Full care for all daily living activities" value="Full care for all daily living activities" />
                      </Col>
                    </Row>
                  </RadioGroup>
                  <Row>
                    <Col>
                      <p style={{ textAlign:'end' }}>
                        How many times a day does this area require staff assistance =
                      </p>
                    </Col>
                    <Col>
                      <InputGroup />
                    </Col>
                  </Row>
                </div>
                <div>
                  <p>
                      <strong>
                        4. Walking independently
                      </strong>
                  </p>
                  <RadioGroup
                    // onChange={this.handleMealChange}
                    // selectedValue={this.state.mealType}
                  >
                    <Row>
                      <Col>
                        <Radio label="walks fully independent" value="walks fully independent" />
                        <Radio label="requires a wheelchair at all times" value="requires a wheelchair at all times" />
                      </Col>
                      <Col>
                        <Radio label="uses a walker" value="uses a walker" />
                        <Radio label="uses a wheelchair for long distances or if standing for a certain period" value="uses a wheelchair for long distances or if standing for a certain period" />
                      </Col>
                    </Row>
                  </RadioGroup>
                </div>
                <div>
                  <p>
                      <strong>
                        5. Requires assistance to change position in bed or elsewhere. 
                      </strong>
                  </p>
                  <RadioGroup
                    // onChange={this.handleMealChange}
                    // selectedValue={this.state.mealType}
                  >
                    <Row>
                      <Col>
                        <Radio label="fully rely on staff to change position" value="fully rely on staff to change position" />
                        <Radio label="client does not sleep throughout the night and requires staff assistance to ensure health and safety" value="client does not sleep throughout the night and requires staff assistance to ensure health and safety" />
                      </Col>
                      <Col>
                        <Radio label="sleeps independently without assistance" value="sleeps independently without assistance" />
                      </Col>
                    </Row>
                  </RadioGroup>
                  <Row>
                    <Col>
                      <p style={{ textAlign:'end' }}>
                        How many times a day is assistance needed to change positions including while sleeping =
                      </p>
                    </Col>
                    <Col>
                      <InputGroup />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p style={{ textAlign:'end' }}>
                        How many hours a night does the client sleep =
                      </p>
                    </Col>
                    <Col>
                      <InputGroup />
                    </Col>
                  </Row>
                </div>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Tooltip2 content="This button is hooked up to close the dialog.">
                        <Button onClick={handleLevelOfServiceClose}>Close</Button>
                    </Tooltip2>
                    <AnchorButton
                      buttonProps={{
                        intent: Intent.PRIMARY
                      }}
                    >
                        Visit the Foundry website
                    </AnchorButton>
                </div>
            </div>
        </Dialog>
      </div>
    </LoadingView>
  );
}

export default AddClient;