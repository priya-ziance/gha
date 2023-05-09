import { Classes } from "@blueprintjs/core";
import { Dialog } from "../../../components";
import { IDialog } from "./types";
import { useContext, useEffect, useRef, useState } from "react";
import ClientContext from "../../../contexts/client";
import { IClientWithnessModel } from "../../../types";
import api from "../../../api";
import MultiSelectComponent, {
  ISelectedOptionProps,
} from "../add-adp/multiSelectComponent";
import { Spinner } from "reactstrap";

const PAGE_SIZE = 10;

type IClientWitnessProps = {
  getSelectedClientWitness?: (data: ISelectedOptionProps) => void;
} & IDialog;

const ClientWitnessForm = (props: IClientWitnessProps) => {
  const { isOpen, handleClose, getSelectedClientWitness } = props;
  const [clientWitness, setClientWitness] = useState<
    IClientWithnessModel[] | []
  >([]);
  const [page] = useState(0);
  const [loading, setLoading] = useState(false);
  const clientWitnessRef = useRef(null);
  const { id: clientId } = useContext(ClientContext);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const results = await api.clientWitness.getClientWitness(clientId, {
          page,
          pageSize: PAGE_SIZE,
        });
        setClientWitness(results);
      } catch (e: any) {}

      setTimeout(() => {
        setLoading(false);
      }, 200);
    })();
  }, [clientId, page]);

  const optionArr: any =
    clientWitness.length > 0
      ? clientWitness.map((cl) => {
          return {
            id: cl.id,
            name: `${cl.firstName} ${cl.lastName}`,
          };
        })
      : [];

  if (loading) return <Spinner />;

  return (
    <Dialog
      icon="info-sign"
      onClose={handleClose}
      title="Client Witness"
      isOpen={isOpen}
      style={{height:"fit-content"}}
    >
      <div className={`${Classes.DIALOG_BODY} add-client__levelsOfService`}>
        <MultiSelectComponent
          selectRef={clientWitnessRef}
          options={optionArr}
          getSeletcedData={(data: any) =>
            getSelectedClientWitness?.(data) || []
          }
        />
      </div>
    </Dialog>
  );
};

export default ClientWitnessForm;
