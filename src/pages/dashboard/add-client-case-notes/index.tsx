import { useContext, useState } from 'react';
import { BreadcrumbProps, Intent, Checkbox } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Formik } from 'formik';
import get from 'lodash/get';
import pick from 'lodash/pick';
import moment from 'moment';

import { CASE_NOTE_FIELDS_TYPE, ICaseNoteModel } from '../../../types';

import api from '../../../api';

import URLS from '../../../utils/urls';

import { Button, DateInput, FormGroup, InputGroup, PageHeading, Switch, TextArea } from '../../../components';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import formikWrapper from '../../../wrappers/formik';

import * as helpers from './helpers';

import { FIELDS } from './constants';

import './index.scss';


interface CaseNoteProps {
  caseNote?: ICaseNoteModel;
  update?: boolean;
}

const CaseNote = (props: CaseNoteProps) => {
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  let initialValues;

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links') },
    { href: URLS.getPagePath('client-case-notes', { clientId }), icon: 'document', text:  URLS.getPagePathName('client-case-notes')},
  ];

  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName('edit-case-note') })
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName('add-client-case-notes') })
  }

  /**
   * This assigns the client's info as the initial values if a client
   * is passed in
   */
  if (props.caseNote) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.caseNote.caseNote, Object.keys(helpers.initialValues))
    );
  } else {
    initialValues = helpers.initialValues;
  }
  

  return (
    <div className='add-case-note'>
      <PageHeading
        title='Add Case Note Detail'
        breadCrumbs={BREADCRUMBS}
      />
      <div className='add-case-note__container'>
        <Formik
            initialValues={initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              setSubmitting(true);
              const caseNoteId = get(props, 'caseNote.id', '')

              values.client = clientId;

              try {
                if (props.update) {
                  await api.caseNotes.updateCaseNote(caseNoteId, values, { clientId });

                  addToast({
                    message: 'Case Note Updated',
                    intent: 'primary'
                  })
                } else {
                  await api.caseNotes.createCaseNote(values);

                  addToast({
                    message: 'Case Note Created',
                    intent: 'primary'
                  })

                  // Reset the form
                  resetForm();
                }
              } catch(e: any) {
                addToast({
                  message: 'Something went wrong',
                  intent: 'danger'
                })
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

                  {getInputFormGroup('title')}
                  {getDateInputFormGroup('date')}
                  {getTextAreaInputFormGroup('significant_event_notes')}
                  {getTextAreaInputFormGroup('notes')}
                  {getSwitchInputFormGroup('significant_event')}
                  {getSwitchInputFormGroup('active')}

                  <div className='add-client-case-note__submit-container'>
                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting} intent={Intent.PRIMARY} large>
                      <b>
                        {props.update ? 'Update' : 'Submit'}
                      </b>
                    </Button>
                  </div>
                </form>
              )
            }, FIELDS)}
        </Formik>
      </div>
    </div>
  );
}

export default CaseNote;