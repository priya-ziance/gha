import { useContext, useState } from 'react';
import moment from 'moment';
import { BreadcrumbProps, Intent, Checkbox, MenuItem } from '@blueprintjs/core';
import { TimePrecision } from '@blueprintjs/datetime';
import { IconNames } from '@blueprintjs/icons';
import { Select, IItemRendererProps } from "@blueprintjs/select";
import { Formik } from 'formik';
import get from 'lodash/get';

import { FIELDS_TYPE, JOINED_FIELDS_TYPE } from '../../../types';

import api from '../../../api';

import URLS from '../../../utils/urls';

import {
  Button,
  Col,
  DateInput,
  FormGroup,
  H3,
  ImageDropzone,
  InputGroup,
  PageHeading,
  Row,
  TextArea
} from '../../../components';

import ClientContext from '../../../contexts/client';

import Client from '../../../models/client';

import * as helpers from './helpers';

import {
  CRITICAL_INCIDENTS_OPTIONS,
  FIELDS,
  REPORTABLE_INCIDENTS_OPTIONS
} from './constants';

import './index.scss';

const FormSelect = Select.ofType<string>();


const SectionWrapper = (props: any) => (
  <div>
    {props.children}

    <br />
  </div>
)


const Content = () => {
  const [clients, setClients] = useState<Client[] | []>([]);
  const [loading, setLoading] = useState(false);

  const { id: clientId } = useContext(ClientContext);

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links') },
    { href: URLS.getPagePath('apd', { clientId }), icon: 'document', text: URLS.getPagePathName('apd') },
    { text: URLS.getPagePathName('add-apd') }
  ];

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
    <div className='add-apd'>
      <PageHeading
        title='Add APD'
        breadCrumbs={BREADCRUMBS}
      />
      <div className='add-apd__container'>
        <Formik
            initialValues={helpers.initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);

              try {
                await api.clients.createClient(values);
              } catch(e: any) {}

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
              const onFormDateChange = (field: string) => (date: Date) => {
                setFieldValue(field, moment(date).toISOString());
              }

              const onFormSelectChange = (field: string) => (value: string) => {
                setFieldValue(field, value);
              }

              const getInputFormGroup = (key: JOINED_FIELDS_TYPE) => (
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

              const getTextAreaFormGroup = (key: JOINED_FIELDS_TYPE) => (
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
                  />
                </FormGroup>
              )
              
              const getDateInputFormGroup = (key: JOINED_FIELDS_TYPE) => (
                <FormGroup
                  intent={helpers.getFormIntent(errors[key])}
                  label={get(FIELDS, key, { name: '' }).name}
                  helperText={errors[key]}
                >
                  <DateInput
                    style={{
                      width: '100%'
                    }}
                    value={values[key] ? moment(values[key]).toDate() : null}
                    onChange={onFormDateChange(key)}
                    timePrecision={TimePrecision.MINUTE}
                    timePickerProps={{
                      useAmPm: true
                    }} 
                    {...helpers.getMomentFormatter('MMMM Do YYYY, h:mm:ss a')}
                  />
                </FormGroup>
              );

              return (
                <form onSubmit={handleSubmit}>
                  <SectionWrapper>
                    <Row>
                      <Col>
                        {getDateInputFormGroup('incident_date_time')}
                      </Col>
                      <Col>
                        {getInputFormGroup('county')}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Checkbox label='Hotline Called' />
                      </Col>
                      <Col>
                        <Checkbox label='Law Enforcement Involved' />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Checkbox label='SDCF Notified (if in DCF custody)' />
                      </Col>
                      <Col>
                        <Checkbox label='ROM/ Designee Notified' />
                      </Col>
                    </Row>
                  </SectionWrapper>

                  <hr />

                  <SectionWrapper>
                    <H3> Critical Incident - Must be reported immediately </H3>

                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={get(FIELDS, 'critical_incident', { name: '' }).name}
                      labelFor="text-input"
                    >
                      <FormSelect
                          items={CRITICAL_INCIDENTS_OPTIONS}
                          filterable={false}
                          itemRenderer={formSelectItemRenderer}
                          noResults={<MenuItem disabled={true} text="No results." />}
                          onItemSelect={onFormSelectChange('sex')}
                      >
                          {/* children become the popover target; render value here */}
                          <Button text={values.sex} rightIcon="double-caret-vertical" />
                      </FormSelect>
                    </FormGroup>

                    <Row>
                      <Col>
                        <Checkbox label='Unexpected Client Death' />
                      </Col>
                      <Col>
                        <Checkbox label='Media Involvement' />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Checkbox label='Sexual Misconduct' />
                      </Col>
                      <Col>
                        <Checkbox label='Life Threatening Injury' />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Checkbox label='Missing Child / Incompetent Adult' />
                      </Col>
                    </Row>
                  </SectionWrapper>

                  <hr />

                  <SectionWrapper>
                    <H3> Reportable Incident - Must be reported by next business day </H3>

                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={get(FIELDS, 'reportable_incident', { name: '' }).name}
                      labelFor="text-input"
                    >
                      <FormSelect
                          items={REPORTABLE_INCIDENTS_OPTIONS}
                          filterable={false}
                          itemRenderer={formSelectItemRenderer}
                          noResults={<MenuItem disabled={true} text="No results." />}
                          onItemSelect={onFormSelectChange('sex')}
                      >
                          {/* children become the popover target; render value here */}
                          <Button text={values.sex} rightIcon="double-caret-vertical" />
                      </FormSelect>
                    </FormGroup>

                    <Row>
                      <Col>
                        <Checkbox label='Unexpected Client Death' />
                      </Col>
                      <Col>
                        <Checkbox label='Media Involvement' />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Checkbox label='Sexual Misconduct' />
                      </Col>
                      <Col>
                        <Checkbox label='Life Threatening Injury' />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Checkbox label='Missing Child / Incompetent Adult' />
                      </Col>
                    </Row>
                  </SectionWrapper>

                  <hr />

                  <SectionWrapper>
                    <H3> Incident Location </H3>

                    <Row>
                      <Col>
                        <Checkbox label='Licensed Home' />
                      </Col>
                      <Col>
                        <Checkbox label='Community Based Service' />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Checkbox label='Supported Living' />
                      </Col>
                      <Col>
                        <Checkbox label='DDDP' />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Checkbox label='School' />
                      </Col>
                      <Col>
                        <Checkbox label='Other' />
                      </Col>
                    </Row>
                  </SectionWrapper>

                  <hr />
                  
                  <SectionWrapper>
                    <H3> Provider Information <br />  Complete information with no abbreviations </H3>

                    <Row>
                      <Col>
                        <FormGroup
                          intent={Intent.PRIMARY}
                          label={get(FIELDS, 'reportable_incident', { name: '' }).name}
                          labelFor="text-input"
                        >
                          <FormSelect
                              items={REPORTABLE_INCIDENTS_OPTIONS}
                              filterable={false}
                              itemRenderer={formSelectItemRenderer}
                              noResults={<MenuItem disabled={true} text="No results." />}
                              onItemSelect={onFormSelectChange('sex')}
                          >
                              {/* children become the popover target; render value here */}
                              <Button text={values.sex} rightIcon="double-caret-vertical" />
                          </FormSelect>
                        </FormGroup>
                      </Col>
                      <Col>
                        {getInputFormGroup('county')}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {getInputFormGroup('county')}
                      </Col>
                      <Col>
                        {getDateInputFormGroup('incident_date_time')}
                      </Col>
                    </Row>
                  </SectionWrapper>

                  <hr />

                  <SectionWrapper>
                    <H3> Description of event </H3>

                    {getTextAreaFormGroup('last_name')}
                  </SectionWrapper>

                  <Checkbox label='Active' />

                  <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                    Submit
                  </Button>
                </form>
              )
            }}
        </Formik>
      </div>
    </div>
  );
}

export default Content;