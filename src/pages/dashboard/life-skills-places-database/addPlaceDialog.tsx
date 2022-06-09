import { useContext } from 'react';
import { Classes, Intent} from '@blueprintjs/core';
import { Formik } from 'formik';
import get from 'lodash/get';
import pick from 'lodash/pick';

import {  IPlaceDatabaseModel } from '../../../types';

import api from '../../../api';

import { Button, Dialog, H4 } from '../../../components';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import formikWrapper from '../../../wrappers/formik';

import * as helpers from './helpers';

import { FIELDS } from './constants';

import './index.scss';


interface AddPlaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  place?: IPlaceDatabaseModel;
  type: string;
}

const AddPlaceDialog = (props: AddPlaceDialogProps) => {
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  const { place } = props;

  let initialValues;
  const update = !!place
  
  const { isOpen, onClose, type } = props;

   /**
   * This assigns the instruction's info as the initial values if a instruction
   * is passed in
   */
    if (props.place) {
      initialValues = Object.assign(
        {},
        helpers.initialValues,
        pick(props.place.placeDatabase, Object.keys(helpers.initialValues))
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
              'Update Place'
              :
              'Add Place'
            }
          </H4>
        </div>
        <div className={`database-task__instructions__add-instruction ${Classes.DIALOG_BODY}`}>
          <Formik
              initialValues={initialValues}
              validationSchema={helpers.validationSchema}
              onSubmit={async (values, { resetForm, setSubmitting }) => {
                setSubmitting(true);

                try {
                  if (update) {
                    await api.places.updatePlace(place?.id, values, { clientId, type });

                    addToast({
                      message: 'Place Updated',
                      intent: 'primary'
                    })
                  } else {
                    await api.places.createPlace(values, { clientId, type });

                    addToast({
                      message: 'Place Created',
                      intent: 'primary'
                    })
                  }

                  // Reset the form
                  resetForm();
                  onClose()
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
                  getTextAreaInputFormGroup,
                  getSwitchInputFormGroup,
                },
                formikProps: {
                  handleSubmit,
                  isSubmitting
                }
              }) => {

                return (
                  <form onSubmit={handleSubmit}>

                    {getTextAreaInputFormGroup('description')}
                    {getSwitchInputFormGroup('active')}

                    <div className='database-instruction__submit-container'>
                      <Button type="submit" disabled={isSubmitting} loading={isSubmitting} intent={Intent.PRIMARY} large>
                        <b>
                          { update ? 'Update' : 'Submit' }
                        </b>
                      </Button>
                    </div>
                  </form>
                )
              }, FIELDS)}
          </Formik>
        </div>
      </div>
    </Dialog>
  )
}

export default AddPlaceDialog;