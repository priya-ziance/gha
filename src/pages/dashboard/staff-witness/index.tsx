import { useContext, useEffect, useState } from "react";
import { BreadcrumbProps, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AnchorButton, Col, PageHeading, Table } from "../../../components";
import URLS from "../../../utils/urls";
import api from "../../../api";
import * as helpers from "../../../utils/helpers";
import {
  actionColumn,
  addressColumn,
  emailColumn,
  mobileColumn,
  nameColumn,
} from "./helpers";
import "./index.scss";
import { IStaffWithnessModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import ToastsContext from "../../../contexts/toasts";

const PAGE_SIZE = 10;

const StaffWitness = () => {
  const [staffWitness, setStaffWitness] = useState<IStaffWithnessModel[] | []>(
    []
  );
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  const hasNextPage = staffWitness.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  const fetchData = async () => {
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
      href: URLS.getPagePath("clients"),
      icon: "document",
      text: URLS.getPagePathName("clients"),
    },
    {
      href: URLS.getPagePath("client-links", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("client-links"),
    },
    { text: URLS.getPagePathName("staff-witness") },
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD,
        }}
        linkProps={{
          to: URLS.getPagePath("add-staff-witness", { clientId }),
        }}
      >
        {URLS.getPagePathName("add-staff-witness")}
      </AnchorButton>
    );
  };
  const deleteStaffWitness = async (data: IStaffWithnessModel) => {
    setLoading(true)

    try {
      await api.staffWitness.deleteStaffWitness(data?.staffWitness?._id|| "")

      await fetchData()
      addToast({
        message: 'Staff Witness Deleted...',
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
          <div className="staff-witness">
            <PageHeading
              title="Staff Witness"
              breadCrumbs={BREADCRUMBS}
              renderRight={getAddButton}
            />
            <div className="staff-witness__container">
              <Col>
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
                          viewLink: URLS.getPagePath("edit-staff-witness", {
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
                  data={staffWitness}
                  enableRowHeader={false}
                  hasNextPage={hasNextPage}
                  hasPrevPage={hasPrevPage}
                  onNextPage={onNextPage}
                  onPrevPage={onPrevPage}
                  page={page}
                  emptyTableMessage="No Staff Witness Found"
                />
              </Col>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffWitness;
