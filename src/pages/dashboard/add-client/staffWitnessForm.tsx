import { Classes } from "@blueprintjs/core";
import { IDialog } from "./types";
import { IUserModel, IStaffWithnessModel } from "../../../types";
import { Dialog } from "../../../components";
import { useContext, useEffect, useRef, useState } from "react";
import MultiSelectComponent, {
  ISelectedOptionProps,
} from "../add-adp/multiSelectComponent";
import api from "../../../api";
import ClientContext from "../../../contexts/client";
import { Spinner } from "reactstrap";

interface StaffWintessProps {
  staffWitness: IStaffWithnessModel[];
  handleStaffWitnessChange: (values: { [key: string]: IUserModel }) => void;
  getSelectedStaff?: (data: ISelectedOptionProps) => void;
}

const PAGE_SIZE = 10;

const StaffWitnessForm = (props: IDialog & StaffWintessProps) => {
  const { isOpen, handleClose, staffWitness, getSelectedStaff } = props;
  const [staffwitness, setStaffWitness] = useState<IStaffWithnessModel[] | []>(
    staffWitness || []
  );

  const [page] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const staffRef = useRef(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const results = await api.staffWitness.getStaffWitness(clientId, {
          page,
          pageSize: PAGE_SIZE,
        });
        setStaffWitness(results);
      } catch (e: any) {}

      setTimeout(() => {
        setLoading(false);
      }, 200);
    })();
  }, [clientId, page]);

  const optionArr: any =
    staffwitness.length > 0
      ? staffwitness.map((d) => {
          return {
            id: d.id,
            name: `${d.firstName} ${d.lastName}`,
          };
        })
      : [];

  if (loading) return <Spinner />;

  return (
    <Dialog
      icon="info-sign"
      onClose={handleClose}
      title="Staff Witness"
      isOpen={isOpen}
    >
      <div className={`${Classes.DIALOG_BODY} add-client__levelsOfService`}>
        <MultiSelectComponent
          options={optionArr}
          selectRef={staffRef}
          getSeletcedData={(data: any) => getSelectedStaff?.(data) || []}
        />
      </div>
    </Dialog>
  );
};

export default StaffWitnessForm;
