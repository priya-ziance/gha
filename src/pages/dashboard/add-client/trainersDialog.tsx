import { Classes } from "@blueprintjs/core";
import { IDialog } from "./types";
import { IUserModel } from "../../../types";
import { Dialog } from "../../../components";
import UsersInput from "../../../controlled-components/UsersInput";

interface TrainerProps {
  trainers: IUserModel[];
  handleTrainerChange: (values: { [key: string]: IUserModel }) => void
}
const Trainers = (props: IDialog & TrainerProps) => {
  const { isOpen, handleClose, trainers, handleTrainerChange } = props;
  return (
    <Dialog
      icon='info-sign'
      onClose={handleClose}
      title='Add Trainer'
      isOpen={isOpen}
    >
      <>
        <div className={`${Classes.DIALOG_BODY}`}>
          <UsersInput users={trainers} onNewUsers={handleTrainerChange} />
        </div>
      </>
    </Dialog>
  );
};

export default Trainers;

