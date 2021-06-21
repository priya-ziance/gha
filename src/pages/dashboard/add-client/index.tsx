import { useState } from 'react';
import { BreadcrumbProps, Intent , MenuItem} from '@blueprintjs/core';
import { Formik } from 'formik';
import moment from "moment";
import { Select, IItemRendererProps } from "@blueprintjs/select";

import api from '../../../api';

import DateInput, { DateInputProps } from '../../../components/DateInput';
import {
  Button,
  Col,
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
  FUNDS_METHODS_OPTIONS,
  LEGAL_STATUS_OPTIONS,
  PRIMARY_DIAGNOSIS_OPTIONS,
  SEX_OPTIONS
} from './constants';

import './index.scss';


const BREADCRUMBS: BreadcrumbProps[] = [
  { href: '/dashboard', icon: "document", text: 'Dashboard'},
  { href: '/dashboard/clients', icon: 'document', text: "Clients" },
  { text: 'Client' }
];

const getMomentFormatter = (format: string, placeholder = ''): DateInputProps => {
  // note that locale argument comes from locale prop and may be undefined
  return {
      formatDate: (date) => moment(date).format(format),
      parseDate: (str) => moment(str, format).toDate(),
      placeholder,
  }
};

const FormSelect = Select.ofType<string>();

const AddClient = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

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
  

  const onFormSelectItemSelect = () => {}

  return (
    <LoadingView loading={loading}>
      <div className='client'>
        <PageHeading
          title='Client Detail'
          breadCrumbs={BREADCRUMBS}
        />
        <div className='client__container'>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
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
              /* and other goodies */

            }) => (
              <form onSubmit={handleSubmit}>
                <ImageDropzone />
                <Row>
                  {/* ---------------------------COL 1------------------------------- */}
                  <Col>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"First Name"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Middle"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Last Name"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Date Of Birth"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <DateInput {...getMomentFormatter('LL')}/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Email"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Sex"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <FormSelect
                          items={SEX_OPTIONS}
                          filterable={false}
                          itemRenderer={formSelectItemRenderer}
                          noResults={<MenuItem disabled={true} text="No results." />}
                          onItemSelect={onFormSelectItemSelect}
                      >
                          {/* children become the popover target; render value here */}
                          <Button text={SEX_OPTIONS[0]} rightIcon="double-caret-vertical" />
                      </FormSelect>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Address 1"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Address 2"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"City"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"State"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Zip Code"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Phone #"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Mobile #"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"SS #"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Behaviours"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <TextArea id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Active"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <Switch id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Signature"}
                      labelFor="text-input"
                    >
                      <Button intent={Intent.PRIMARY}>
                        <b>Add Signature</b>
                      </Button>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Trainers"}
                      labelFor="text-input"
                    >
                      <Button intent={Intent.PRIMARY}>
                        <b>Add Trainers</b>
                      </Button>
                    </FormGroup>
                  </Col>

                  {/* ---------------------------COL 2------------------------------- */}
                  <Col>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Florida Id"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Medicaid #"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Medicare #"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Medicaid Waiver #"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Current Month Weight"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Height"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Eye Color"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Hair Color"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Legal Status"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <FormSelect
                          items={LEGAL_STATUS_OPTIONS}
                          filterable={false}
                          itemRenderer={formSelectItemRenderer}
                          noResults={<MenuItem disabled={true} text="No results." />}
                          onItemSelect={onFormSelectItemSelect}
                      >
                          {/* children become the popover target; render value here */}
                          <Button text={LEGAL_STATUS_OPTIONS[0]} rightIcon="double-caret-vertical" />
                      </FormSelect>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Language"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Primary Diagnosis"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <FormSelect
                          items={PRIMARY_DIAGNOSIS_OPTIONS}
                          filterable={false}
                          itemRenderer={formSelectItemRenderer}
                          noResults={<MenuItem disabled={true} text="No results." />}
                          onItemSelect={onFormSelectItemSelect}
                      >
                          {/* children become the popover target; render value here */}
                          <Button text={PRIMARY_DIAGNOSIS_OPTIONS[0]} rightIcon="double-caret-vertical" />
                      </FormSelect>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Secondary Diagnosis"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Allergies"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Location"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Likes"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <TextArea id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Definition of Abuse"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <TextArea id="text-input" />
                    </FormGroup>
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
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Health Insurance"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Effective Date"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <DateInput {...getMomentFormatter('LL')}/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Monthly SSI Amount"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Funds Methods"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <FormSelect
                          items={FUNDS_METHODS_OPTIONS}
                          filterable={false}
                          itemRenderer={formSelectItemRenderer}
                          noResults={<MenuItem disabled={true} text="No results." />}
                          onItemSelect={onFormSelectItemSelect}
                      >
                          {/* children become the popover target; render value here */}
                          <Button text={FUNDS_METHODS_OPTIONS[0]} rightIcon="double-caret-vertical" />
                      </FormSelect>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Special Equipments"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Bank Account Name"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Bank Account Number"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Race"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Home Entry Date"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <DateInput {...getMomentFormatter('LL')}/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Home Discharge Date"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <DateInput {...getMomentFormatter('LL')}/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Religion"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Vision"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Hearing"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Mobility"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"DisLikes"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <TextArea id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Notes"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <TextArea id="text-input" />
                    </FormGroup>
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
                      <Button intent={Intent.PRIMARY}>
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
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </LoadingView>
  );
}

export default AddClient;