import { Classes } from "@blueprintjs/core";
import { Dialog, Table } from "../../../components";
import { IDialog } from "./types";
import { useContext, useEffect, useState } from "react";
import { IStaffWithnessModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import api from "../../../api";
import * as helpers from "../../../utils/helpers";
import { nameColumn } from "../staff-witness/helpers";

const PAGE_SIZE = 10;

const StaffWitnessForm = (props: IDialog) => {
  const { isOpen, handleClose } = props;
  const [staffWitness, setStaffWitness] = useState<IStaffWithnessModel[] | []>(
    []
  );
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);

  const hasNextPage = staffWitness.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setStaffWitness(
          await api.staffWitness.getStaffWitness(clientId, {
            page,
            pageSize: PAGE_SIZE,
          })
        );
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

  return (
    <Dialog
      icon="info-sign"
      onClose={handleClose}
      title="Staff Witness"
      isOpen={isOpen}
    >
      <>
        <div
          className={`${Classes.DIALOG_BODY} add-client__levelsOfService`}
        >
          <Table
                  loading={loading}
                  numRows={staffWitness.length}
                  getCellClipboardData={(row: any, col: any) => {
                    return staffWitness[row];
                  }}
                  columns={[
                    {
                      title: "Name",
                      cellRenderer: nameColumn,
                      width: helpers.getTableWith(1),
                    }
                  ]}
                  data={staffWitness}
                  enableRowHeader={false}
                  hasNextPage={hasNextPage}
                  hasPrevPage={hasPrevPage}
                  onNextPage={onNextPage}
                  onPrevPage={onPrevPage}
                  page={page}
                  emptyTableMessage="No Staff Witness Found"
                />
        </div>
      </>
    </Dialog>
  );
};

export default StaffWitnessForm;
