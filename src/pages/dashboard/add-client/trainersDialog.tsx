// import { Classes } from "@blueprintjs/core";

// import {
//   Dialog,
// } from "../../../components";

// import UsersInput from '../../../controlled-components/UsersInput'

// import { IUserModel } from "../../../types";

// import { IDialog } from './types';


// interface TrainersProps {
//   trainers: IUserModel[];
//   handleTrainersChange: (values: { [key: string]: IUserModel }) => void
// }

// const Trainers = (props: IDialog & TrainersProps) => {
//   const { isOpen, handleClose, trainers, handleTrainersChange } = props;

//   console.log("traines",trainers);
  
//   return (
//     <Dialog
//       icon='info-sign'
//       onClose={handleClose}
//       title='Trainers'
//       isOpen={isOpen}
//     >
//       <>
//         <div className={`${Classes.DIALOG_BODY}`}>
//           <UsersInput users={trainers} onNewUsers={handleTrainersChange} />
//         </div>
//       </>
//     </Dialog>
//   );
// };

// export default Trainers;

import { Classes } from "@blueprintjs/core";
import { Col, Dialog, Table } from "../../../components";
import { IDialog } from "./types";
import { useContext, useEffect, useState } from "react";
import { IAddTrainerModel} from "../../../types";
import ClientContext from "../../../contexts/client";
import api from "../../../api";
import * as helpers from "../../../utils/helpers";
import { nameColumn } from "../trainer/helpers";
import { Formik } from "formik";
import formikWrapper from "../../../wrappers/formik";
import { Row } from "reactstrap";
import { FIELDS } from "./constants";

const PAGE_SIZE = 10;

const Trainers = (props: IDialog) => {
  const { isOpen, handleClose } = props;
  const [Trainer, setTrainer] = useState<IAddTrainerModel[] | []>(
    []
  );
  const [trainerActual, setTrainerActual] = useState<
    IAddTrainerModel[] | []
  >([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);

  const hasNextPage = Trainer.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  
  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const results = await api.Trainers.getTrainer(clientId, {
          page,
          pageSize: PAGE_SIZE,
        });
        setTrainer(results);
        setTrainerActual(results);
      } catch (e: any) {}

      setTimeout(() => {
        setLoading(false);
      }, 200);
    })();
  }, [clientId, page]);

  const onNextPage = () => {
    if (hasNextPage) {
      setPage((page) => page + 1);
    }
  };

  const onPrevPage = () => {
    if (hasPrevPage) {
      setPage((page) => page - 1);
    }
  };

  const initialValues = {
    search: "",
  };

  return (
    <Dialog
      icon="info-sign"
      onClose={handleClose}
      title="Trainers"
      isOpen={isOpen}
    >
      <>
        <div className={`${Classes.DIALOG_BODY} add-client__levelsOfService`}>
          <div className="gha__users-input">
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, { setSubmitting }) => {
                if (values.search) {
                  const filteredtrainer = [...trainerActual].filter(
                    (item) => {
                      return (
                        item?.firstName
                          ?.toLowerCase()
                          .includes(values.search.toLowerCase()) ||
                        item?.lastName
                          ?.toLowerCase()
                          .includes(values.search.toLowerCase())
                      );
                    }
                  );
                  setTrainer(filteredtrainer);
                } else {
                  setTrainer(trainerActual);
                }
              }}
            >
              {formikWrapper(
                ({
                  wrapperProps: { getInputFormGroup },
                  formikProps: { handleSubmit },
                }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("search")}
                        </Col>
                      </Row>
                    </form>
                  );
                },
                FIELDS
              )}
            </Formik>
          </div>

          <Table
            loading={loading}
            numRows={Trainer.length}
            getCellClipboardData={(row: any, col: any) => {
              return Trainer[row];
            }}
            columns={[
              {
                title: "Name",
                cellRenderer: nameColumn,
                width: helpers.getTableWith(0.5),
              },
            ]}
            data={Trainer}
            enableRowHeader={false}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onNextPage={onNextPage}
            onPrevPage={onPrevPage}
            page={page}
            emptyTableMessage="No Trainer Found"
          />
        </div>
      </>
    </Dialog>
  );
};

export default Trainers;

