import { Classes } from "@blueprintjs/core";

import {
  Dialog,
} from "../../../components";

import UsersInput from '../../../controlled-components/UsersInput'

import { IUserModel } from "../../../types";

import { IDialog } from './types';


interface WitnessesProps {
  witnesses: IUserModel[];
  handleWitnessesChange: (values: { [key: string]: IUserModel }) => void
}

const Witnesses = (props: IDialog & WitnessesProps) => {
  const { isOpen, handleClose, witnesses, handleWitnessesChange } = props;

  return (
    <Dialog
      icon='info-sign'
      onClose={handleClose}
      title='Witnesses'
      isOpen={isOpen}
    >
      <>
        <div className={`${Classes.DIALOG_BODY}`}>
          <UsersInput users={witnesses} onNewUsers={handleWitnessesChange} />
        </div>
      </>
    </Dialog>
  );
};

export default Witnesses;
