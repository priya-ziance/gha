import { useContext, useEffect, useState } from "react";
import { BreadcrumbProps, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AnchorButton, Col, PageHeading, Table } from "../../../components";
import URLS from "../../../utils/urls";
import api from "../../../api";
import * as helpers from "../../../utils/helpers";
import LogEntry from "../_component-pages/log-entry";
import {
  actionColumn,
  addressColumn,
  emailColumn,
  mobileColumn,
  nameColumn,
} from "./helpers";
import "./index.scss";
import { ISeizureLogsModel } from "../../../types";
import ClientContext from "../../../contexts/client";

const PAGE_SIZE = 10;

const SeizureLogs = () => {
  const [seizureLog, setSeizureLog] = useState<ISeizureLogsModel [] | []>(
    []
  );
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);

  const hasNextPage = seizureLog.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  // useEffect(() => {
  //   (async () => {
  //     setLoading(true);

  //     try {
  //       setSeizureLog(
  //         await api.seizureLogs.getSeizureLogs(clientId, {
  //           page,
  //           pageSize: PAGE_SIZE,
  //         })
  //       );
  //     } catch (e: any) {}

  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 200);
  //   })();
  // }, [clientId, page]);

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

  const BREADCRUMBS: BreadcrumbProps[] = [
    {
      href: URLS.getPagePath("dashboard"),
      icon: "document",
      text: URLS.getPagePathName("dashboard"),
    },
    {
      href: URLS.getPagePath("logs"),
      icon: "document",
      text: URLS.getPagePathName("logs"),
    },

    { text: URLS.getPagePathName("seizure-logs") },
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD,
        }}
        linkProps={{
          to: URLS.getPagePath("add-seizure-logs", { clientId }),
        }}
      >
        {URLS.getPagePathName("add-seizure-logs")}
      </AnchorButton>
    );
  };

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div>
          <div className="seizure-log">
            <PageHeading
              title="Seizure Logs"
              breadCrumbs={BREADCRUMBS}
              renderRight={getAddButton}
            />
            <div className="seizure-log__container">
              <Col>
                <Table
                  loading={loading}
                  numRows={seizureLog.length}
                  getCellClipboardData={(row: any, col: any) => {
                    return seizureLog[row];
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
                      title: "Mobile",
                      cellRenderer: mobileColumn,
                      width: helpers.getTableWith(0.2),
                    },
                    {
                      title: "Address",
                      cellRenderer: addressColumn,
                      width: helpers.getTableWith(0.2),
                    },
                    {
                      title: "Actions",
                      cellRenderer: (data: any) => {
                        return actionColumn(data, {
                          viewLink: URLS.getPagePath("edit-seizure-logs", {
                            clientId,
                            clientContactId: data.id,
                          }),
                        });
                      },
                      width: helpers.getTableWith(0.1),
                    },
                  ]}
                  data={seizureLog}
                  enableRowHeader={false}
                  hasNextPage={hasNextPage}
                  hasPrevPage={hasPrevPage}
                  onNextPage={onNextPage}
                  onPrevPage={onPrevPage}
                  page={page}
                  emptyTableMessage="No logs Found"
                />
              </Col>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeizureLogs;

