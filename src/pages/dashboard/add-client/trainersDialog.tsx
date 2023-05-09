import { Classes, Icon, Intent } from "@blueprintjs/core";
import { IDialog } from "./types";
import { IAddTrainerModel, IUserModel } from "../../../types";
import { Col, Dialog, FormMultiItemSelect, Table } from "../../../components";
import TrainersUsersInput from "../../../controlled-components/TrainerUserinput";
import { Formik } from "formik";
import api from "../../../api";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import ClientContext from "../../../contexts/client";
import formikWrapper from "../../../wrappers/formik";
import { Row, Spinner } from "reactstrap";
import * as helpers from "../../../utils/helpers";
import { FIELDS } from "./constants";
import { nameColumn } from "../trainer/helpers";
import { debounce } from "lodash";
import MultiSelectComponent, {
  ISelectedOptionProps,
} from "../add-adp/multiSelectComponent";

interface TrainerProps {
  trainers: IUserModel[];
  handleTrainerChange: (values: { [key: string]: IUserModel }) => void;
  getSelectedTrainer?: (data: ISelectedOptionProps) => void;
}
const PAGE_SIZE = 10;
const Trainers = (props: IDialog & TrainerProps) => {
  const { isOpen, handleClose, getSelectedTrainer } = props;
  const trainerRef = useRef(null);
  const [trainer, setTrainer] = useState<IAddTrainerModel[] | []>([]);
  const [page] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const results = await api.Trainers.getTrainer(clientId, {
          page,
          pageSize: PAGE_SIZE,
        });
        setTrainer(results);
      } catch (e: any) {}

      setTimeout(() => {
        setLoading(false);
      }, 200);
    })();
  }, [clientId, page]);

  const optionArr: any =
    trainer.length > 0
      ? trainer.map((d) => {
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
      title="Add Trainer"
      isOpen={isOpen}
    >
      <div className={`${Classes.DIALOG_BODY} add-client__levelsOfService`}>
        <MultiSelectComponent
          selectRef={trainerRef}
          options={optionArr}
          getSeletcedData={(data: any) => getSelectedTrainer?.(data) || []}
        />
      </div>
    </Dialog>
  );
};

export default Trainers;
