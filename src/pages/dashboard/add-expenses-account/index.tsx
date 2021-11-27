import { useContext, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import moment from 'moment';
import get from 'lodash/get';
import pick from 'lodash/pick';

import ToastsContext from '../../../contexts/toasts';
import ClientContext from '../../../contexts/client';

import IExpenseModel from '../../../models/expense';

import api from '../../../api';

import URLS from '../../../utils/urls'; 

import {
  Button,
  Col,
  DateInput,
  FormGroup,
  FormItemSelect,
  ImageDropzone,
  InputGroup,
  NumericInput,
  LoadingView,

  PageHeading,
  Row,
  Switch,
  TextArea
} from '../../../components';

import {
  FIELDS,
  EXPENSE_TYPES,
  EXPENSE_ACCOUNT_TYPES
} from './constants';

import { ACCOUNT_EXPENSE_FIELDS_TYPE } from '../../../types';

import * as helpers from './helpers';

import './index.scss';

interface ExpensesMainAccountProps {
  expense?: IExpenseModel | undefined;
  update?: boolean;
}


const ExpensesMainAccount = (props: ExpensesMainAccountProps) => {
  const [loading, setLoading] = useState(false);
  const [document, setDocumentFile] = useState<File | null>(null); 
  
  const { addToast } = useContext(ToastsContext);
  const { id: clientId } = useContext(ClientContext);

  let initialValues;

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links'), icon: 'document', text: URLS.getPagePathName('client-links') },
    { href: URLS.getPagePath('expenses'), icon: 'document', text: URLS.getPagePathName('expenses') },
    { href: URLS.getPagePath('expenses-account'), icon: 'document', text: URLS.getPagePathName('expenses-account') }
  ];

  if (props.update) {
    BREADCRUMBS.push({
      href: URLS.getPagePath('client-links',
      { clientId}),
      icon: 'document', text: URLS.getPagePathName('client-links') 
    })
    BREADCRUMBS.push({ text: URLS.getPagePathName('client-info') })
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName('add-expenses-account') })
  }


  const uploadDocument = async () => {
    if (document) {
      return api.files.uploadFile(clientId, 'image', document);
    }
  }

  const getErrorToast = (message: string) => {
    return (
      <CreateExpenseErrorToast message={message} />
    )
  }

  const CreateExpenseSuccessToast = (
    <>
      <strong>Success</strong>
      <div>
        {props.update ?
          'Expense updated successfully'
          :
          'Expense created successfully'
        }
      </div>
    </>
  );

  const CreateExpenseErrorToast = (props: any) => (
    <>
      <strong>Error</strong>
      <div> {props.message} </div>
    </>
  );

  const setDocument = (files: File[]) => {
    setDocumentFile(files[0]);
  }

  /**
   * This assigns the expense's info as the initial values if a client
   * is passed in
   */
  if (props.expense) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.expense.apiExpense, Object.keys(helpers.initialValues))
    );
  } else {
    initialValues = helpers.initialValues;
  }

  return (
    <LoadingView loading={loading}>
      <div className='client'>
        <PageHeading
          title={
            props.update ?
            'Update Expense' :
            'Add Expense'
          }
          breadCrumbs={BREADCRUMBS}
        />
        <div className='client__container'>
          <Formik
            initialValues={initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);

              values.client = clientId;

              // TODO: Change this to use a real employee
              values.employee = 'Employee'

              if (document) {
                try {
                  let file = await uploadDocument();
                  values.document = file?.id;
                } catch(e) {}
              }

              try {
                if (props.update) {
                  await api.expenses.updateExpense(clientId, values);
                } else {
                  await api.expenses.createExpense(values, { clientId });
                }

                addToast(
                  {
                    message: CreateExpenseSuccessToast,
                    timeout: 5000,
                    intent:  Intent.SUCCESS
                  }
                );

                resetForm()
                setDocumentFile(null)
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

              const getInputFormGroup = (key: ACCOUNT_EXPENSE_FIELDS_TYPE) => (
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

              const getDateInputFormGroup = (key: ACCOUNT_EXPENSE_FIELDS_TYPE) => (
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

              const getTextAreaInputFormGroup = (key: ACCOUNT_EXPENSE_FIELDS_TYPE) => (
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

              const getNumericInput = (key: ACCOUNT_EXPENSE_FIELDS_TYPE, inputOptions = {}) => (
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
                    {...inputOptions}
                  />
                </FormGroup>
              )

              const profilePictureUrl = get(props, 'client.profilePicture.publicUrl', '')

              return (
                <form onSubmit={handleSubmit}>
                  <FormGroup
                    intent={Intent.PRIMARY}
                    label={'Document'}
                  >
                    <ImageDropzone
                      files={document ? [document]: []}
                      setFiles={setDocument}
                      imagesUrls={profilePictureUrl ? [profilePictureUrl] : []}
                    />
                  </FormGroup>
                  <Row>
                    <Col>
                      {getInputFormGroup('location')}

                      {getDateInputFormGroup('expense_date')}
                      
                      {getTextAreaInputFormGroup('expense_description')}

                      {getNumericInput('expense', { leftIcon: 'dollar' })}

                      <FormItemSelect
                        buttonText={values.expense_type}
                        items={EXPENSE_TYPES}
                        label={get(FIELDS, 'expense_type', { name: '' }).name}
                        menuRenderer={item => item}
                        onFormSelectChange={(handleChange('expense_type'))}
                      />

                      <FormItemSelect
                        buttonText={get(EXPENSE_ACCOUNT_TYPES, values.type, '')}
                        items={Object.keys(EXPENSE_ACCOUNT_TYPES)}
                        label={get(FIELDS, 'type', { name: '' }).name}
                        menuRenderer={item => get(EXPENSE_ACCOUNT_TYPES, item, '')}
                        onFormSelectChange={(handleChange('type'))}
                      />

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
                        label={get(FIELDS, 'inventory_save', { name: '' }).name}
                        labelFor="text-input"
                        labelInfo={"(required)"}
                      >
                        <Switch id="switch-input" large checked={values.inventory_save} onChange={handleChange('inventory_save')}/>
                      </FormGroup>

                      <FormGroup
                        intent={Intent.PRIMARY}
                        label={get(FIELDS, 'community_activity_save', { name: '' }).name}
                        labelFor="text-input"
                        labelInfo={"(required)"}
                      >
                        <Switch id="switch-input" large checked={values.community_activity_save} onChange={handleChange('community_activity_save')}/>
                      </FormGroup>
                    </Col>
  
                  </Row>
                  <Button type="submit" disabled={isSubmitting} loading={isSubmitting} large intent={Intent.PRIMARY}>
                    {props.update ? 'Update' : 'Submit'}
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

export default ExpensesMainAccount;