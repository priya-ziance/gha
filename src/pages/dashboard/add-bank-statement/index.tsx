import { useContext, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import moment from 'moment';
import get from 'lodash/get';
import pick from 'lodash/pick';

import ToastsContext from '../../../contexts/toasts';
import ClientContext from '../../../contexts/client';

import IBankStatementModel from '../../../models/bankStatement';

import formikWrapper from '../../../wrappers/formik';

import api from '../../../api';

import URLS from '../../../utils/urls'; 

import {
  Button,
  Col,
  FileInput,
  FormGroup,
  FormItemSelect,
  LoadingView,
  PageHeading,
  Row,
  Switch
} from '../../../components';

import {
  FIELDS,
  BANK_STATEMENT_ACCOUNT_TYPES
} from './constants';

import * as helpers from './helpers';

import './index.scss';

interface BankStatementsMainAccountProps {
  bankStatement?: IBankStatementModel | undefined;
  update?: boolean;
}


const BankStatementsMainAccount = (props: BankStatementsMainAccountProps) => {
  const [loading, setLoading] = useState(false);
  const [documentFile, setDocumentFile] = useState<File | null>(null); 
  
  const { addToast } = useContext(ToastsContext);
  const { id: clientId } = useContext(ClientContext);

  let initialValues;

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links'), icon: 'document', text: URLS.getPagePathName('client-links') },
    { href: URLS.getPagePath('expenses'), icon: 'document', text: URLS.getPagePathName('expenses') },
    { href: URLS.getPagePath('bank-statement'), icon: 'document', text: URLS.getPagePathName('bank-statement') }
  ];

  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName('edit-bank-statement') })
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName('add-bank-statement') })
  }


  const uploadDocument = async () => {
    if (documentFile) {
      console.log("doc file",documentFile);
      
      return api.files.uploadFile(clientId, 'image', documentFile);
    }
  }

  const getErrorToast = (message: string) => {
    return (
      <CreateBankStatementErrorToast message={message} />
    )
  }

  const CreateBankStatementSuccessToast = (
    <>
      <strong>Success</strong>
      <div>
        {props.update ?
          'Bank Statement updated successfully'
          :
          'Bank Statement created successfully'
        }
      </div>
    </>
  );

  const CreateBankStatementErrorToast = (props: any) => (
    <>
      <strong>Error</strong>
      <div> {props.message} </div>
    </>
  );

  const onDocumentChange = (e: any) => {
    setDocumentFile(get(e, 'target.files', [])[0])
    console.log("doce name",documentFile);
    
  }

  const getDocumentText = () => {
    if (documentFile) {
      return get(documentFile, 'name')
    } else {
      return get(props, 'bankStatement.document.key')
    }
  }

  if (props.bankStatement) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.bankStatement.bankStatement, Object.keys(helpers.initialValues))
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
            'Update Bank Statement' :
            'Add Bank Statement'
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
              // values.employee = 'Employee'

              if (documentFile) {
                try {
                  let file = await uploadDocument();
                  values.document = file?.id;
                } catch(e: any) {}
              }

              try {
                if (props.update) {
                  await api.bankStatements.updateBankStatement(clientId, values);
                } else {
                  await api.bankStatements.createBankStatement(values, { clientId });
                }

                addToast(
                  {
                    message: CreateBankStatementSuccessToast,
                    timeout: 5000,
                    intent:  Intent.SUCCESS
                  }
                );

                resetForm()
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
                getInputFormGroup
              },
              formikProps: {
                handleSubmit,
                isSubmitting,
                values,
                handleChange
              }
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <FormGroup
                    intent={Intent.PRIMARY}
                    label={'Document'}
                  >
                    <FileInput text={getDocumentText()} onChange={onDocumentChange} />
                  </FormGroup>
                  <Row>
                    <Col>
                      {getInputFormGroup('statement_name')}

                      {getDateInputFormGroup('from_date')}

                      {getDateInputFormGroup('to_date')}
                      
                      {getTextAreaInputFormGroup('statement_description')}

                      <FormItemSelect
                        buttonText={get(BANK_STATEMENT_ACCOUNT_TYPES, values.type, '')}
                        items={Object.keys(BANK_STATEMENT_ACCOUNT_TYPES)}
                        label={get(FIELDS, 'type', { name: '' }).name}
                        menuRenderer={item => get(BANK_STATEMENT_ACCOUNT_TYPES, item, '')}
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

export default BankStatementsMainAccount;