import { useContext } from 'react';
import { Classes, Intent} from '@blueprintjs/core';
import { Formik } from 'formik';
import get from 'lodash/get';
import pick from 'lodash/pick';

import { INSTRUCTION_FIELDS_TYPE, IInstructionModel, ITaskModel } from '../../../types';

import api from '../../../api';

import { Button, Dialog, FormGroup, H4, Switch, TextArea } from '../../../components';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import * as helpers from './helpers';

import { FIELDS } from './constants';

import './index.scss';


interface AddInstructionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  instruction?: IInstructionModel;
  taskId: string;
  update?: boolean;
}

const AddInstructionsDialog = (props: AddInstructionsDialogProps) => {
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  const { instruction, update } = props;
  let initialValues;
  
  const { isOpen, onClose, taskId } = props;

   /**
   * This assigns the instruction's info as the initial values if a instruction
   * is passed in
   */
    if (props.instruction) {
      initialValues = Object.assign(
        {},
        helpers.initialValues,
        pick(props.instruction.instruction, Object.keys(helpers.initialValues))
      );
    } else {
      initialValues = helpers.initialValues;
    }
     

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div>
        <div className={Classes.DIALOG_HEADER}>
          <H4>
            {update ?
              'Update Instruction'
              :
              'Add Instruction'
            }
          </H4>
        </div>
        <div className={`database-task__instructions__add-instruction ${Classes.DIALOG_BODY}`}>
          <Formik
              initialValues={initialValues}
              validationSchema={helpers.validationSchema}
              onSubmit={async (values, { resetForm, setSubmitting }) => {
                setSubmitting(true);

                values.task = taskId;

                try {
                  if (update) {
                    await api.instructions.updateInstruction(instruction?.id, values, { clientId });

                    addToast({
                      message: 'Instruction Updated',
                      intent: 'primary'
                    })
                  } else {
                    await api.instructions.createInstruction(values, { clientId });

                    addToast({
                      message: 'Instruction Created',
                      intent: 'primary'
                    })
                  }

                  // Reset the form
                  resetForm();
                } catch(e) {
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
                const getTextAreaFormGroup = (key: INSTRUCTION_FIELDS_TYPE) => (
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

                    {getTextAreaFormGroup('description')}

                    <Switch
                      label='Active'
                      checked={get(values, 'active')}
                      onChange={e => {
                        setFieldValue('active', get(e, 'target.checked'))
                      }}
                    />

                    <div className='database-instruction__submit-container'>
                      <Button type="submit" disabled={isSubmitting} loading={isSubmitting} intent={Intent.PRIMARY} large>
                        <b>
                          { update ? 'Update' : 'Submit' }
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

export default AddInstructionsDialog;