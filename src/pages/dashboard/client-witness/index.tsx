import { useContext, useEffect, useState } from "react";
import { BreadcrumbProps, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AnchorButton, Col, PageHeading, Table } from "../../../components";
import URLS from "../../../utils/urls";
import api from "../../../api";
import * as helpers from "../../../utils/helpers";
import {
  actionColumn,
  contactTypeColumn,
  emailColumn,
  mobileColumn,
  nameColumn,
} from "./helpers";
import "./index.scss";
import { IClientWithnessModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import ToastsContext from "../../../contexts/toasts";

const PAGE_SIZE = 10;

const ClientWitness = () => {
  const [clientWitness, setClientWitness] = useState<
    IClientWithnessModel[] | []
  >([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  const hasNextPage = clientWitness.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  const fetchData = async () => {
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
      href: URLS.getPagePath("clients"),
      icon: "document",
      text: URLS.getPagePathName("clients"),
    },
    {
      href: URLS.getPagePath("client-links", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("client-links"),
    },
    { text: URLS.getPagePathName("client-witness") },
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD,
        }}
        linkProps={{
          to: URLS.getPagePath("add-client-witness", { clientId }),
        }}
      >
        {URLS.getPagePathName("add-client-witness")}
      </AnchorButton>
    );
  };
  const deleteStaffWitness = async (data: IClientWithnessModel) => {
    setLoading(true)
    try {
      await api.clientWitness.deleteClientWitness(data.clientWitness._id|| "")
      await fetchData()
      addToast({
        message: 'Client Witness Deleted...',
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
          <div className="client-witness">
            <PageHeading
              title="Client Witness"
              breadCrumbs={BREADCRUMBS}
              renderRight={getAddButton}
            />
            <div className="client-witness__container">
              <Col>
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
                          onDelete() {
                            deleteStaffWitness(data)
                          }
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
              </Col>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientWitness;
