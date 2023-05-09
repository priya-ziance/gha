import { Classes } from "@blueprintjs/core";
import { IDialog } from "./types";
import { IBehaviourModel } from "../../../types";
import { Dialog } from "../../../components";
import MultiSelectComponent, {
  ISelectedOptionProps,
} from "../add-adp/multiSelectComponent";
import { useContext, useEffect, useRef, useState } from "react";
import ClientContext from "../../../contexts/client";
import api from "../../../api";
import { Spinner } from "reactstrap";

interface BehaviourProps {
  behaviour: IBehaviourModel[];
  getSelectedBehaviour?: (data: ISelectedOptionProps) => void;
}

const PAGE_SIZE = 10;

const BehaviourDialog = (props: IDialog & BehaviourProps) => {
  const { isOpen, handleClose, behaviour, getSelectedBehaviour } = props;
  const [behaviours, setBehaviours] = useState<IBehaviourModel[] | []>(
    behaviour || []
  );
  const [page] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const behaviourRef = useRef(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const results = await api.behaviours.getBehaviours(clientId, {
          page,
          pageSize: PAGE_SIZE,
        });
        setBehaviours(results);
      } catch (e: any) {}

      setTimeout(() => {
        setLoading(false);
      }, 200);
    })();
  }, [clientId, page]);

  const optionArr: any =
    behaviours.length > 0
      ? behaviours.map((d) => {
          return {
            id: d.id,
            name: `${d.behaviourType}`,
          };
        })
      : [];

  if (loading) return <Spinner />;

  return (
    <Dialog
      icon="info-sign"
      onClose={handleClose}
      title="Behaviour"
      isOpen={isOpen}
    >
      <div className={`${Classes.DIALOG_BODY} add-client__levelsOfService`}>
        <MultiSelectComponent
          options={optionArr}
          selectRef={behaviourRef}
          getSeletcedData={(data: any) => getSelectedBehaviour?.(data) || []}
        />
      </div>
    </Dialog>
  );
};

export default BehaviourDialog;
