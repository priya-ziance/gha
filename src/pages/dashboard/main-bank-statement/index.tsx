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
  clientColumn,
  DocuementColumn,
  FromDateColumn,
  StatementDescColumn,
  StatementNameColumn,
  ToDateColumn,
} from "./helpers";
import "./index.scss";
import { IMainBankStatementModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import ToastsContext from "../../../contexts/toasts";

const PAGE_SIZE = 10;

const MainBankAccountStatement = () => {
  const [mainAccountData, setMainAccountData] = useState<IMainBankStatementModel[] | []>(
    []
  );
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  const hasNextPage = mainAccountData.length >= PAGE_SIZE;
  const hasPrevPage = page > 0;

  const fetchData = async () => {
    setLoading(true);
    try {
      setMainAccountData(
        await api.mainAccount.getMainAccount(clientId, {
          page,
          pageSize: PAGE_SIZE,
        })
      );
      console.log("mAIN ACC ",mainAccountData);
      
    } catch (e: any) { }
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };
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
      href: URLS.getPagePath("clients"),
      icon: "document",
      text: URLS.getPagePathName("clients"),
    },
    {
      href: URLS.getPagePath("client-links", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("client-links"),
    },
    { text: URLS.getPagePathName("main-bank-statement") },
  ];


  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD,
        }}
        linkProps={{
          to: URLS.getPagePath("add-main-bank-statement", { clientId }),
        }}
      >
        {URLS.getPagePathName("add-main-bank-statement")}
      </AnchorButton>
    );
  };
  const deleteTrainer = async (data: IMainBankStatementModel) => {
    setLoading(true)

    try {
      await api.mainAccount.deleteMainAccount(data.MainBankStatement?._id || "")

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
          <div className="mainAccountData">
            <PageHeading
              title="Main Account Bank Statement"
              breadCrumbs={BREADCRUMBS}
              renderRight={getAddButton}
            />
            <div className="mainBankStatement__container">
              <Col>
                <Table
                  loading={loading}
                  numRows={mainAccountData.length}
                  getCellClipboardData={(row: any, col: any) => {
                    return mainAccountData[row];
                  }}
                  columns={[
                    {
                      title: "Client",
                      cellRenderer: clientColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Statement Name",
                      cellRenderer: StatementNameColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Statement Description",
                      cellRenderer: StatementDescColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "From Date",
                      cellRenderer: FromDateColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "To Date",
                      cellRenderer: ToDateColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Document",
                      cellRenderer: DocuementColumn,
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
                          viewLink: URLS.getPagePath("edit-main-bank-statement", {
                            clientId,
                            clientContactId: data.id,
                          }),
                          onDelete() {
                            deleteTrainer(data)
                          }
                        });
                      },
                      width: helpers.getTableWith(0.1),
                    },
                  ]}
                  data={mainAccountData}
                  enableRowHeader={true}
                  hasNextPage={hasNextPage}
                  hasPrevPage={hasPrevPage}
                  onNextPage={onNextPage}
                  onPrevPage={onPrevPage}
                  page={page}
                  emptyTableMessage="No record found"
                />
              </Col>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBankAccountStatement;
