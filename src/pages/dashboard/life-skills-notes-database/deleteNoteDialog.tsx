import { useContext, useState } from 'react';
import { Classes, Intent} from '@blueprintjs/core';

import {  INotesDatabaseModel } from '../../../types';

import api from '../../../api';

import { Button, Dialog, H4 } from '../../../components';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import './index.scss';


interface DeletenoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  note: INotesDatabaseModel;
}

const DeletenoteDialog = (props: DeletenoteDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  const { note } = props;
  
  const { isOpen, onClose } = props;

  const onDelete = async() => {
    setLoading(true)
    
    try {
      await api.notes.deleteNote(note.id, { clientId });

      addToast({
        message: 'note Deleted',
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
            Delete note
          </H4>
        </div>
        <div className={`${Classes.DIALOG_BODY}`}>
          <b>Are you sure you want to delete this note?</b>
          <br />
          <br />
          "{note.description}"
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

export default DeletenoteDialog;