import { Classes, Icon, Intent } from "@blueprintjs/core";
import { IDialog } from "./types";
import { IAddTrainerModel, IUserModel } from "../../../types";
import { Col, Dialog, FormMultiItemSelect, Table } from "../../../components";
import UsersInput from "../../../controlled-components/UsersInput";
import { Formik } from "formik";
import api from "../../../api";
import { useContext, useEffect, useState } from "react";
import ClientContext from "../../../contexts/client";
import formikWrapper from "../../../wrappers/formik";
import { Row } from "reactstrap";
import * as helpers from "../../../utils/helpers";
import { FIELDS } from "./constants";
import { nameColumn } from "../trainer/helpers";

interface TrainerProps {
  trainers: IUserModel[];
  handleTrainerChange: (values: { [key: string]: IUserModel }) => void
}
const PAGE_SIZE = 10;
const Trainers = (props: IDialog & TrainerProps) => {
  const { isOpen, handleClose, trainers, handleTrainerChange } = props;
  // const { isOpen, handleClose } = props;
  const [trainer, setTrainer] = useState<IAddTrainerModel[] | []>(
    []
  );
  const [trainerActual, setTrainerActual] = useState<
    IAddTrainerModel[] | []
  >([]);
  const [selectedUsers, setSelectedUsers] = useState<any>({})
  const [userResults, setUserResults] = useState<IUserModel[] | []>([])
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);

  const hasNextPage = trainer.length === PAGE_SIZE;
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
      } catch (e: any) { }

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

  const menuRenderer = (item: IUserModel) => {
    if (selectedUsers[item.id]) {
      return (
        <span>
          <Icon icon={'tick'} />
          {' '}
          {item.name}
        </span>
      )
    }

    return item.name
  }

  const tagRenderer = (item: any) => {
    if (item && trainer[item]) {
      return trainer[item].firstName
    }

    return ''
  }
  return (
    <Dialog
      icon='info-sign'
      onClose={handleClose}
      title='Add Trainer'
      isOpen={isOpen}
    >

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
                  <form onChange={handleSubmit}>
                    <Row>
                      <Col xs={12} md={6}>
                        {getInputFormGroup("search")}
                        <FormMultiItemSelect
                          intent={Intent.PRIMARY}
                          label={'Select Users'}
                          menuRenderer={menuRenderer}
                          formSelectProps={{
                            tagRenderer,
                            items: trainer,
                            onItemSelect: handleTrainerChange,
                            selectedItems: Object.keys(userResults),
                          }}
                          />
                          {/* <UsersInput users={trainers} onNewUsers={handleTrainerChange} /> */}
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
          numRows={trainer.length}
          getCellClipboardData={(row: any, col: any) => {
            console.log("click");

            return trainer[row];
          }}
          columns={[
            {
              title: "Name",
              cellRenderer: nameColumn,
              width: helpers.getTableWith(0.5),
            },
          ]}
          data={trainer}
          enableRowHeader={false}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
          page={page}
          emptyTableMessage="No Staff Witness Found"
        />
      </div>
    </Dialog>
  );
};

export default Trainers;

