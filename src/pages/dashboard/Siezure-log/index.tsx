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
  idColumn,
  dateColumn,
  timeColumn,
  InjuriesColumn,
  activeColumn
} from "./helpers";
import "./index.scss";
import { ISeizureLogsModel, IDeleteModel, ISeizurelogs } from "../../../types";
import ClientContext from "../../../contexts/client";
import ToastsContext from "../../../contexts/toasts";

const PAGE_SIZE = 10;

const SeizureLogs = () => {
  const [seizureLog, setSeizureLog] = useState<ISeizureLogsModel[] | []>(
    []
  );
  const [SeizureDelete, setSeizureDelete] = useState<IDeleteModel | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  const hasNextPage = seizureLog.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  const fetchData = async () => {
    setLoading(true);
    try {
      setSeizureLog(
        await api.seizureLogs.getSeizureLogs(clientId, {
          page,
          pageSize: PAGE_SIZE,
        })
      );
    } catch (e: any) { }

    setTimeout(() => {
      setLoading(false);
    }, 100);
  }

  useEffect(() => {
    fetchData()
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

  const deleteLog = async (data: ISeizureLogsModel) => {
    setLoading(true)

    try {
      await api.seizureLogs.deleteSeizureLogs(data?.seizurelogs?._id || "")

      await fetchData()
      addToast({
        message: 'Deleted...',
        intent: 'success'
      })
    } catch (e: any) {
      addToast({
        message: 'Something went wrong',
        intent: 'danger'
      })
    }

    setLoading(false)
  }

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
                      title: "Date",
                      cellRenderer: dateColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Time",
                      cellRenderer: timeColumn,
                      width: helpers.getTableWith(0.2),
                    },
                    {
                      title: "Injuries",
                      cellRenderer: InjuriesColumn,
                      width: helpers.getTableWith(0.2),
                    },
                    {
                      title: "Active",
                      cellRenderer: activeColumn,
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
                          onDelete() {
                            deleteLog(data)
                          }
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

