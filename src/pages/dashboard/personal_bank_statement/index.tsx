// @ts-nocheck
import { useContext, useEffect, useState } from "react";
import { BreadcrumbProps, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AnchorButton, Col, PageHeading, Table } from "../../../components";
import URLS from "../../../utils/urls";
import api from "../../../api";
import * as helpers from "../../../utils/helpers";
import {
  actionColumn,
  activeColumn,
  clientNameColumn,
  dateColumn,
  documentColumn,
  statementDescriptionColumn,
  statementNameColumn,
} from "./helpers";
import "./index.scss";
import { IPersonalBankStatementModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import ToastsContext from "../../../contexts/toasts";

const PAGE_SIZE = 10;

const PersonalBankStatement = () => {
  const [PersonalBankStatement, setPersonalBankStatement] = useState<
    IPersonalBankStatementModel[] | []
  >([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  const hasNextPage = PersonalBankStatement.length >= PAGE_SIZE;
  const hasPrevPage = page > 0;

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await api.personalBankStatement.getPersonalBankStatement(
        clientId,
        {
          page,
          pageSize: PAGE_SIZE,
        }
      );
      const totalClients = await api.clients.getClients();
      const newData = data?.map((item) => {
        const cloneItem = item;
        const clientData = totalClients?.find((clientDetails) => clientDetails?.id === item?.client);
        cloneItem["clientName"] = clientData && `${clientData?.firstName} ${clientData?.lastName}` || "";
        return cloneItem;
      });

      setPersonalBankStatement(newData);
    } catch (e: any) {}
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };
  useEffect(() => {
    fetchData();
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
      href: URLS.getPagePath("clients"),
      icon: "document",
      text: URLS.getPagePathName("clients"),
    },
    {
      href: URLS.getPagePath("client-links", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("client-links"),
    },
    { text: URLS.getPagePathName("personal_bank_statement") },
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD,
        }}
        linkProps={{
          to: URLS.getPagePath("add-personal_bank_statement", { clientId }),
        }}
      >
        {URLS.getPagePathName("add-personal_bank_statement")}
      </AnchorButton>
    );
  };
  const deleteTrainer = async (data: IPersonalBankStatementModel) => {
    setLoading(true);

    try {
      await api.personalBankStatement.deletePersonalBankStatement(
        data.PersonalBankStatement?._id || ""
      );

      await fetchData();
      addToast({
        message: "Deleted...",
        intent: "success",
      });
    } catch (e: any) {
      addToast({
        message: "Something went wrong",
        intent: "danger",
      });
    }

    setLoading(false);
  };
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div>
          <div className="PersonalBankStatement">
            <PageHeading
              title="Personal Bank Statement"
              breadCrumbs={BREADCRUMBS}
              renderRight={getAddButton}
            />
            <div className="PersonalBankStatement__container">
              <Col>
                <Table
                  loading={loading}
                  numRows={PersonalBankStatement.length}
                  getCellClipboardData={(row: any, col: any) => {
                    return PersonalBankStatement[row];
                  }}
                  columns={[
                    {
                      title: "Client Name",
                      cellRenderer: clientNameColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Statement Name",
                      cellRenderer: statementNameColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Statement Description",
                      cellRenderer: statementDescriptionColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "From Date",
                      cellRenderer: dateColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "To Date",
                      cellRenderer: dateColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Document",
                      cellRenderer: documentColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Active",
                      cellRenderer: activeColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Actions",
                      cellRenderer: (data: any) => {
                        return actionColumn(data, {
                          viewLink: URLS.getPagePath(
                            "edit-personal_bank_statement",
                            {
                              clientId,
                              clientContactId: data.id,
                            }
                          ),
                          onDelete() {
                            deleteTrainer(data);
                          },
                        });
                      },
                      width: helpers.getTableWith(0.1),
                    },
                  ]}
                  data={PersonalBankStatement}
                  enableRowHeader={true}
                  hasNextPage={hasNextPage}
                  hasPrevPage={hasPrevPage}
                  onNextPage={onNextPage}
                  onPrevPage={onPrevPage}
                  page={page}
                  emptyTableMessage="No Personal Bank Statement Found"
                />
              </Col>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalBankStatement;
