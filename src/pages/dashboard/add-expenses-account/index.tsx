import { useContext, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import moment from 'moment';
import get from 'lodash/get';
import pick from 'lodash/pick';

import ToastsContext from '../../../contexts/toasts';
import ClientContext from '../../../contexts/client';

import formikWrapper from '../../../wrappers/formik';

import IExpenseModel from '../../../models/expense';

import api from '../../../api';

import URLS from '../../../utils/urls'; 

import {
  Button,
  Col,
  FormGroup,
  FormItemSelect,
  FileDropzone,  
  LoadingView,

  PageHeading,
  Row
} from '../../../components';

import {
  FIELDS,
  EXPENSE_TYPES,
  EXPENSE_ACCOUNT_TYPES
} from './constants';

import * as helpers from './helpers';

import './index.scss';

interface ExpensesAccountProps {
  expense?: IExpenseModel | undefined;
  update?: boolean;
}


const ExpensesAccount = (props: ExpensesAccountProps) => {
  const [loading, setLoading] = useState(false);
  const [document, setDocumentFile] = useState<File | null>(null); 
  
  const { addToast } = useContext(ToastsContext);
  const { id: clientId } = useContext(ClientContext);

  let initialValues;

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links') },
    { href: URLS.getPagePath('expenses', { clientId }), icon: 'document', text: URLS.getPagePathName('expenses') },
    { href: URLS.getPagePath('expenses-account', { clientId }), icon: 'document', text: URLS.getPagePathName('expenses-account') }
  ];

  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName('edit-expense-account') })
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
      <div className='add-expenses-account'>
        <PageHeading
          title={
            props.update ?
            'Update Expense' :
            'Add Expense'
          }
          breadCrumbs={BREADCRUMBS}
        />
        <div className='add-expenses-account__container'>
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
                } catch(e: any) {}
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
                getSwitchInputFormGroup,
                getNumericInputFormGroup,
                getInputFormGroup
              },
              formikProps: {
                handleSubmit,
                isSubmitting,
                values,
                handleChange
              }
            }) => {
              const profilePictureUrl = get(props, 'client.profilePicture.publicUrl', '')

              return (
                <form onSubmit={handleSubmit}>
                  <FormGroup
                    intent={Intent.PRIMARY}
                    label={'Document'}
                  >
                    <FileDropzone
                      files={document ? [document]: []}
                      setFiles={setDocument}
                      imagesUrls={profilePictureUrl ? [profilePictureUrl] : []}
                      accept="image/*,.pdf"
                    />
                  </FormGroup>
                  <Row>
                    <Col>
                      {getInputFormGroup('location')}

                      {getDateInputFormGroup('expense_date')}
                      
                      {getTextAreaInputFormGroup('expense_description')}

                      {getNumericInputFormGroup('expense', { childProps:  { leftIcon: 'dollar' } })}

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

                      {getSwitchInputFormGroup('active')}
                      {getSwitchInputFormGroup('inventory_save')}
                      {getSwitchInputFormGroup('community_activity_save')}
                    </Col>
  
                  </Row>
                  <Button type="submit" disabled={isSubmitting} loading={isSubmitting} large intent={Intent.PRIMARY}>
                    {props.update ? 'Update' : 'Submit'}
                  </Button>
                </form>
              )
            }, FIELDS)}
          </Formik>
        </div>
      </div>
    </LoadingView>
  );
}

export default ExpensesAccount;