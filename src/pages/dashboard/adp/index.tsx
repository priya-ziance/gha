// @ts-nocheck
import { useCallback, useContext, useEffect, useState } from "react";
import { BreadcrumbProps, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AnchorButton, Col, PageHeading, Table } from "../../../components";
import URLS from "../../../utils/urls";
import api from "../../../api";
import * as helpers from "../../../utils/helpers";
import {
  actionColumn,
  addressColumn,
  clientInvolvedColumn,
  clientNameColumn,
  clientsInvolvedColumn,
  countryNameColumn,
  criticalIncidentColumn,
  criticalIncidentTypeColumn,
  emailColumn,
  employeeInvolvedColumn,
  employeesInvolvedColumn,
  eventDescColumn,
  facilityColumn,
  incidentDateColumn,
  incidentTimeColumn,
  mobileColumn,
  nameColumn,
  notifiedColumn,
  PersonReportColumn,
  ReportableIncidentColumn,
  ReportableIncidentTypeColumn,
  reportedDateColumn,
  ReportedPersonPhoneColumn,
  ReviewSupervisor,
  reviewSupervisorPhoneColumn,
  telephoneColumn,
  WaiverSupportCordinatorColumn,
  WaiverSupportCordinatorPhoneColumn,
} from "./helpers";
import "./index.scss";
import { IAddAdpModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import ToastsContext from "../../../contexts/toasts";

const PAGE_SIZE = 10;

const ADP = () => {
  const [adp, setadp] = useState<IAddAdpModel[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  const hasNextPage = adp.length >= PAGE_SIZE;
  const hasPrevPage = page > 0;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const adpData = await api.ADP.getAdp(clientId, {
        page,
        pageSize: PAGE_SIZE,
      });

      const totalClients = await api.clients.getClients();

      const newADPData = adpData?.map((item) => {
        const cloneItem = item;
        const clientData = totalClients?.find((clientDetails) => clientDetails?.id === item?.client);
        const clientInvolvedNameList = totalClients?.filter((clientDetails) => item?.clientsInvolved?.includes(clientDetails?.id))?.map((item)=> `${item?.firstName} ${item?.lastName}` ?? '') || []
        const employeeInvolvedNameList = totalClients?.filter((clientDetails) => item?.employeeInvolved?.includes(clientDetails?.id))?.map((item)=> `${item?.firstName} ${item?.lastName}` ?? '') || []        
        cloneItem["clientName"] = clientData && `${clientData?.firstName} ${clientData?.lastName}` || "";
        cloneItem["clientInvolvedNameList"] = clientInvolvedNameList;
        cloneItem["employeeInvolvedNameList"] = employeeInvolvedNameList;
        return cloneItem;
      });
      setadp(newADPData);
    } catch (e: any) {
      console.log("Error in fetching adp data..", e?.message);
    }
    setLoading(false);
  }, []);

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
    { text: URLS.getPagePathName("adp") },
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD,
        }}
        linkProps={{
          to: URLS.getPagePath("add-adp", { clientId }),
        }}
      >
        {URLS.getPagePathName("add-adp")}
      </AnchorButton>
    );
  };
  const deleteadp = async (data: IAddAdpModel) => {
    setLoading(true);

    try {
      await api.ADP.deleteAdp(data.adp?._id || "");

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
          <div className="adp">
            <PageHeading
              title="ADP"
              breadCrumbs={BREADCRUMBS}
              renderRight={getAddButton}
            />
            <div className="Adp__container">
              <Col>
                <Table
                  loading={loading}
                  numRows={adp.length}
                  getCellClipboardData={(row: any, col: any) => {
                    return adp[row];
                  }}
                  columns={[
                    {
                      title: "Name",
                      cellRenderer: nameColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Client",
                      cellRenderer: clientNameColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Clients Involved",
                      cellRenderer: clientsInvolvedColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Employees Involved",
                      cellRenderer: employeesInvolvedColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Address",
                      cellRenderer: addressColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Country",
                      cellRenderer: countryNameColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Telephone",
                      cellRenderer: telephoneColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Notified",
                      cellRenderer: notifiedColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Critical Incident",
                      cellRenderer: criticalIncidentColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Critical Incident Type",
                      cellRenderer: criticalIncidentTypeColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Name of Facility",
                      cellRenderer: facilityColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Incient Date",
                      cellRenderer: incidentDateColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    // {
                    //   title: "Incient Time",
                    //   cellRenderer: incidentTimeColumn,
                    //   width: helpers.getTableWith(0.25),
                    // },
                    {
                      title: "Reported Date",
                      cellRenderer: reportedDateColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Reportable Incident",
                      cellRenderer: ReportableIncidentColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Reportable Incident Type",
                      cellRenderer: ReportableIncidentTypeColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Event Description",
                      cellRenderer: eventDescColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Person Report",
                      cellRenderer: PersonReportColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Reported Person Phone",
                      cellRenderer: ReportedPersonPhoneColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Review Supervisor",
                      cellRenderer: ReviewSupervisor,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Review Supervisor Phone",
                      cellRenderer: reviewSupervisorPhoneColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Waiver Support Cordinator",
                      cellRenderer: WaiverSupportCordinatorColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Waiver Support Cordinator Phone",
                      cellRenderer: WaiverSupportCordinatorPhoneColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Actions",
                      cellRenderer: (data: any) => {
                        return actionColumn(data, {
                          viewLink: URLS.getPagePath("edit-adp", {
                            clientId,
                            clientContactId: data.id,
                          }),
                          onDelete() {
                            deleteadp(data);
                          },
                        });
                      },
                      width: helpers.getTableWith(0.1),
                    },
                  ]}
                  data={adp}
                  enableRowHeader={true}
                  hasNextPage={hasNextPage}
                  hasPrevPage={hasPrevPage}
                  onNextPage={onNextPage}
                  onPrevPage={onPrevPage}
                  page={page}
                  emptyTableMessage="No adp Found"
                />
              </Col>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADP;
