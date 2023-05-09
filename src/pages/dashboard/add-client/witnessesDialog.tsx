import { Classes } from "@blueprintjs/core";
import { useContext, useEffect, useRef, useState } from "react";
import { Spinner } from "reactstrap";
import api from "../../../api";

import { Dialog } from "../../../components";
import ClientContext from "../../../contexts/client";
import { IClientWithnessModel } from "../../../types";
import MultiSelectComponent, {
  ISelectedOptionProps,
} from "../add-adp/multiSelectComponent";

import { IDialog } from "./types";

interface WitnessesProps {
  witnesses: IClientWithnessModel[];
  getSelectedWitnesses?: (data: ISelectedOptionProps) => void;
}

const PAGE_SIZE = 10;

const Witnesses = (props: IDialog & WitnessesProps) => {
  const { isOpen, handleClose, witnesses, getSelectedWitnesses } = props;
  const [witness, setWitness] = useState<IClientWithnessModel[] | []>(
    witnesses || []
  );
  const [page] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const witnessessRef = useRef(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const results = await api.clientWitness.getClientWitness(clientId, {
          page,
          pageSize: PAGE_SIZE,
        });
        setWitness(results);
      } catch (e: any) {}
      setTimeout(() => {
        setLoading(false);
      }, 200);
    })();
  }, [clientId, page]);

  const optionArr: any =
    witness.length > 0
      ? witness.map((d) => {
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
      title="Witnesses"
      isOpen={isOpen}
    >
      <>
        <div className={`${Classes.DIALOG_BODY}`}>
          <MultiSelectComponent
            options={optionArr}
            selectRef={witnessessRef}
            getSeletcedData={(data: any) => getSelectedWitnesses?.(data) || []}
          />
        </div>
      </>
    </Dialog>
  );
};

export default Witnesses;
