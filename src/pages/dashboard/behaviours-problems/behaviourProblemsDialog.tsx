import { useContext, useState } from 'react';
import { Classes, Intent} from '@blueprintjs/core';
import { Formik } from 'formik';
import get from 'lodash/get';

import { BEHAVIOUR_PROBLEMS_FIELDS_TYPE, IClientBehaviourModel, IClientModel } from '../../../types';

import api from '../../../api';

import { Button, Dialog, FormGroup, FormItemSelect, H4, InputGroup, NumericInput, TextArea } from '../../../components';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import ClientsInputSelect from '../../../controlled-components/ClientsInput';

import * as helpers from './helpers';

import { FIELDS, URI_OPTIONS } from './constants';

import './index.scss';


interface UpdateBehaviourProblemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  clientBehaviour: IClientBehaviourModel;
}

const UpdateBehaviourProblemDialog = (props: UpdateBehaviourProblemDialogProps) => {
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  const { clientBehaviour, isOpen, onClose } = props;
  let initialValues = {
    frequency: clientBehaviour.frequency,
    uri: clientBehaviour.uri,
    notes: clientBehaviour.notes
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div>
        <div className={Classes.DIALOG_HEADER}>
          <H4>
            Update Client Behaviour
          </H4>
        </div>
        <div className={`behaviours__behaviours-problems ${Classes.DIALOG_BODY}`}>
          <Formik
              initialValues={initialValues}
              validationSchema={helpers.validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);

                try {
                  await api.clientBehaviours.updateClientBehaviour(clientBehaviour?.id, values, { clientId });

                  addToast({
                    message: 'Client Behaviour Updated',
                    intent: 'primary'
                  })
                  // Reset the form
                  onClose();
                } catch(e: any) {
                  addToast({
                    message: 'Something went wrong',
                    intent: 'danger'
                  })
                }

                setSubmitting(false);
              }}
              >

              {({
                values,
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue
              }) => {
                const handleNewClients = (clients: {any: IClientModel}) => {
                  setFieldValue("clients_involved", Object.keys(clients))
                }

                const getNumericInput = (key: BEHAVIOUR_PROBLEMS_FIELDS_TYPE) => (
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
                    />
                  </FormGroup>
                )

                const getTextAreaFormGroup = (key: BEHAVIOUR_PROBLEMS_FIELDS_TYPE) => (
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
                      value={get(values, key)}
                    />
                  </FormGroup>
                )

                return (
                  <form onSubmit={handleSubmit}>

                    <FormGroup
                      label='Behaviour Type'
                    >
                      <InputGroup
                        disabled
                        value={get(clientBehaviour, 'behaviour.behaviourType')}
                      />
                    </FormGroup>

                    {getNumericInput('frequency')}
                    
                    {getTextAreaFormGroup('notes')}

                    <FormItemSelect
                      buttonText={values.uri}
                      intent={Intent.PRIMARY}
                      items={URI_OPTIONS}
                      label={'URI'}
                      menuRenderer={item => item}
                      onFormSelectChange={(handleChange('uri'))}
                    />

                    <ClientsInputSelect
                      onNewClients={handleNewClients}
                      clients={clientBehaviour.clientsInvolved}
                    />

                    <div className='behaviours__behaviours-problems__submit-container'>
                      <Button type="submit" disabled={isSubmitting} loading={isSubmitting} intent={Intent.PRIMARY} large>
                        <b>
                          Update
                        </b>
                      </Button>
                    </div>
                  </form>
                )
              }}
          </Formik>
        </div>
      </div>
    </Dialog>
  )
}

export default UpdateBehaviourProblemDialog;