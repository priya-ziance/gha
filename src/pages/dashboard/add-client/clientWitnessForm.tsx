import { Classes } from "@blueprintjs/core";
import { Dialog , Table } from "../../../components";
import { IDialog } from "./types";
import { useContext, useEffect, useState } from "react";
import ClientContext from "../../../contexts/client";
import { IClientWithnessModel } from "../../../types";
import api from "../../../api";
import { actionColumn, contactTypeColumn, emailColumn, mobileColumn, nameColumn } from "../client-witness/helpers";
import * as helpers from "../../../utils/helpers";
import URLS from "../../../utils/urls";

const PAGE_SIZE = 10;

const ClientWitnessForm = (props: IDialog) => {
  const { isOpen, handleClose } = props;
  const [clientWitness, setClientWitness] = useState<
    IClientWithnessModel[] | []
  >([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const hasNextPage = clientWitness.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setClientWitness(
          await api.clientWitness.getClientWitness(clientId, {
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
      title="Client Witness"
      isOpen={isOpen}
    >
      <>
        <div className={`${Classes.DIALOG_BODY} add-client__levelsOfService`}>
          <Table
            loading={loading}
            numRows={clientWitness.length}
            getCellClipboardData={(row: any, col: any) => {
              return clientWitness[row];
            }}
            columns={[
              {
                title: "Name",
                cellRenderer: nameColumn,
                width: helpers.getTableWith(0.25),
              },
              {
                title: "Email",
                cellRenderer: emailColumn,
                width: helpers.getTableWith(0.25),
              },
              {
                title: "Contact Type",
                cellRenderer: contactTypeColumn,
                width: helpers.getTableWith(0.2),
              },
              {
                title: "Mobile",
                cellRenderer: mobileColumn,
                width: helpers.getTableWith(0.2),
              },
              {
                title: "Actions",
                cellRenderer: (data: any) => {
                  return actionColumn(data, {
                    viewLink: URLS.getPagePath("edit-client-witness", {
                      clientId,
                      clientContactId: data.id,
                    }),
                  });
                },
                width: helpers.getTableWith(0.1),
              },
            ]}
            data={clientWitness}
            enableRowHeader={false}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onNextPage={onNextPage}
            onPrevPage={onPrevPage}
            page={page}
            emptyTableMessage="No Client Witness Found"
          />
        </div>
      </>
    </Dialog>
  );
};

export default ClientWitnessForm;
