import { useContext, useState } from 'react';
import { Classes, Intent} from '@blueprintjs/core';

import {  IPlaceDatabaseModel } from '../../../types';

import api from '../../../api';

import { Button, Dialog, H4 } from '../../../components';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import './index.scss';


interface DeletePlaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  place: IPlaceDatabaseModel;
}

const DeletePlaceDialog = (props: DeletePlaceDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  const { place } = props;
  
  const { isOpen, onClose } = props;

  const onDelete = async() => {
    setLoading(true)
    
    try {
      await api.places.deletePlace(place.id, { clientId });

      addToast({
        message: 'Place Deleted',
        intent: 'primary'
      })
    } catch(e: any) {
      addToast({
        message: 'Something went wrong',
        intent: 'danger'
      })
    }

    setLoading(false)
    onClose()
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div>
        <div className={Classes.DIALOG_HEADER}>
          <H4>
            Delete Place
          </H4>
        </div>
        <div className={`${Classes.DIALOG_BODY}`}>
          <b>Are you sure you want to delete this Place?</b>
          <br />
          <br />
          "{place.description}"
        </div>

        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button text='No' onClick={onClose}/>
            <Button text='Yes' loading={loading} onClick={onDelete} intent={Intent.DANGER}/>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default DeletePlaceDialog;