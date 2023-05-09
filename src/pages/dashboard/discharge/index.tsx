// @ts-nocheck
import { useContext, useEffect, useState } from "react";
import { Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AnchorButton, Col, PageHeading, Table } from "../../../components";
import URLS from "../../../utils/urls";
import api from "../../../api";
import * as helpers from "../../../utils/helpers";
import {
  actionColumn,
  ClientColumn,
  dischargeDateColumn,
  orgLocationColumn,
  orgMainContactColumn,
  orgNameColumn,
  orgPhoneColumn,
} from "./helpers";
import "./index.scss";
import { IDischargeModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import ToastsContext from "../../../contexts/toasts";

const PAGE_SIZE = 10;

const Discharge = () => {
  const [discharge, setDischarge] = useState<IDischargeModel[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  const hasNextPage = discharge.length >= PAGE_SIZE;
  const hasPrevPage = page > 0;

  const fetchData = async () => {
    setLoading(true);
    try {
      const dischargeData = await api.Discharge.getDischarges(clientId, {
        page,
        pageSize: PAGE_SIZE,
      });
      const totalClients = await api.clients.getClients();
      const newData = dischargeData?.map((item) => {
        const cloneItem = item;
        const clientData = totalClients?.find((clientDetails) => clientDetails?.id === item?.client);
        cloneItem["clientName"] = clientData && `${clientData?.firstName} ${clientData?.lastName}` || "";
        return cloneItem;
      });

      setDischarge(newData);
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
    { text: URLS.getPagePathName("discharge") },
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD,
        }}
        linkProps={{
          to: URLS.getPagePath("add-discharge", { clientId }),
        }}
      >
        {URLS.getPagePathName("add-discharge")}
      </AnchorButton>
    );
  };
  const deleteDischarge = async (data: IDischargeModel) => {

    setLoading(true);

    try {
      console.log("data id ",data.id);
      
      await api.Discharge.deleteDischarge(data?.id || "");

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
          <div className="discharge">
            <PageHeading
              title="Discharge"
              breadCrumbs={BREADCRUMBS}
              renderRight={getAddButton}
            />
            <div className="discharge__container">
              <Col>
                <Table
                  loading={loading}
                  numRows={discharge.length}
                  getCellClipboardData={(row: any, col: any) => {
                    return discharge[row];
                  }}
                  columns={[
                    {
                      title: "Client",
                      cellRenderer: ClientColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Organization Name",
                      cellRenderer: orgNameColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Organization Location",
                      cellRenderer: orgLocationColumn,
                      width: helpers.getTableWith(0.2),
                    },
                    {
                      title: "Organization Phone",
                      cellRenderer: orgPhoneColumn,
                      width: helpers.getTableWith(0.2),
                    },
                    {
                      title: "Organization Main Contact",
                      cellRenderer: orgMainContactColumn,
                      width: helpers.getTableWith(0.2),
                    },
                    {
                      title: "Home Discharge Date",
                      cellRenderer: dischargeDateColumn,
                      width: helpers.getTableWith(0.2),
                    },
                    {
                      title: "Actions",
                      cellRenderer: (data: any) => {
                        return actionColumn(data, {
                          viewLink: URLS.getPagePath("edit-discharge", {
                            clientId,
                            clientContactId: data.id,
                          }),
                          onDelete() {
                            deleteDischarge(data);
                          },
                        });
                      },
                      width: helpers.getTableWith(0.1),
                    },
                  ]}
                  data={discharge}
                  enableRowHeader={true}
                  hasNextPage={hasNextPage}
                  hasPrevPage={hasPrevPage}
                  onNextPage={onNextPage}
                  onPrevPage={onPrevPage}
                  page={page}
                  emptyTableMessage="No discharge Found"
                />
              </Col>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discharge;
