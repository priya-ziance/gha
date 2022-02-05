import { Classes } from "@blueprintjs/core";

import {
  Dialog,
} from "../../../components";

import UsersInput from '../../../controlled-components/UsersInput'

import { IUserModel } from "../../../types";

import { IDialog } from './types';


interface TrainersProps {
  trainers: IUserModel[];
  handleTrainersChange: (values: { [key: string]: IUserModel }) => void
}

const Trainers = (props: IDialog & TrainersProps) => {
  const { isOpen, handleClose, trainers, handleTrainersChange } = props;

  return (
    <Dialog
      icon='info-sign'
      onClose={handleClose}
      title='Trainers'
      isOpen={isOpen}
    >
      <>
        <div className={`${Classes.DIALOG_BODY}`}>
          <UsersInput users={trainers} onNewUsers={handleTrainersChange} />
        </div>
      </>
    </Dialog>
  );
};

export default Trainers;
