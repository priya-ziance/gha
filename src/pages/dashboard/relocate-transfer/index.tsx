import { useContext, useEffect, useState } from "react";
import { BreadcrumbProps, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AnchorButton, Col, PageHeading, Table } from "../../../components";
import URLS from "../../../utils/urls";
import api from "../../../api";
import * as helpers from "../../../utils/helpers";
import {
  actionColumn,
  clientColumn,
  contactTypeColumn,
  homeNameColumn,
  phoneColumn,
  transferDateColumn,
} from "./helpers";
import "./index.scss";
import { IRelocateModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import ToastsContext from "../../../contexts/toasts";

const PAGE_SIZE = 10;

const Relocate = () => {
  const [relocate, setRelocate] = useState<IRelocateModel[] | []>(
    []
  );
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  const hasNextPage = relocate.length >= PAGE_SIZE;
  const hasPrevPage = page > 0;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.Relocate.getRelocate(clientId, {
        page,
        pageSize: PAGE_SIZE,
      });
      console.log("RESPONSE DATA", response);
      setRelocate(response);
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
    { text: URLS.getPagePathName("relocate") },
  ];


  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD,
        }}
        linkProps={{
          to: URLS.getPagePath("add-relocate", { clientId }),
        }}
      >
        {URLS.getPagePathName("add-relocate")}
      </AnchorButton>
    );
  };
  const deleteRelocate = async (data: IRelocateModel) => {
    setLoading(true)

    try {
      await api.Relocate.deleteRelocate(data.relocate?._id || "")

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
          <div className="trainer">
            <PageHeading
              title="Relocate / Transfer"
              breadCrumbs={BREADCRUMBS}
              renderRight={getAddButton}
            />
            <div className="trainer__container">
              <Col>
                <Table
                  loading={loading}
                  numRows={relocate.length}
                  getCellClipboardData={(row: any, col: any) => {
                    return relocate[row];
                  }}
                  columns={[
                    {
                      title: "Contact Type",
                      cellRenderer: contactTypeColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "client",
                      cellRenderer: clientColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Group Home Name",
                      cellRenderer: homeNameColumn,
                      width: helpers.getTableWith(0.2),
                    },
                    {
                      title: "Phone",
                      cellRenderer: phoneColumn,
                      width: helpers.getTableWith(0.2),
                    },
                    {
                      title: "Home Transfer Date",
                      cellRenderer: transferDateColumn,
                      width: helpers.getTableWith(0.2),
                    },
                    {
                      title: "Actions",
                      cellRenderer: (data: any) => {
                        console.log("data actions",data.id);
                        
                        return actionColumn(data, {
                          viewLink: URLS.getPagePath("edit-relocate", {
                            clientId,
                            clientContactId: data.id,
                          }),
                          onDelete() {
                            deleteRelocate(data)
                          }
                        });
                      },
                      width: helpers.getTableWith(0.1),
                    },
                  ]}
                  data={relocate}
                  enableRowHeader={true}
                  hasNextPage={hasNextPage}
                  hasPrevPage={hasPrevPage}
                  onNextPage={onNextPage}
                  onPrevPage={onPrevPage}
                  page={page}
                  emptyTableMessage="No Relocate Found"
                />
              </Col>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relocate;
