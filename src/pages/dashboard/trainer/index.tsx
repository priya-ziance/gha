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
import { IAddTrainerModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import ToastsContext from "../../../contexts/toasts";

const PAGE_SIZE = 10;

const Trainer = () => {
  const [trainer, setTrainer] = useState<IAddTrainerModel[] | []>(
    []
  );
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  const hasNextPage = trainer.length >= PAGE_SIZE;
  const hasPrevPage = page > 0;

  const fetchData = async () => {
    setLoading(true);
    try {
      setTrainer(
        await api.Trainers.getTrainer(clientId, {
          page,
          pageSize: PAGE_SIZE,
        })
      );
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
    { text: URLS.getPagePathName("trainer") },
  ];


  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD,
        }}
        linkProps={{
          to: URLS.getPagePath("add-trainer", { clientId }),
        }}
      >
        {URLS.getPagePathName("add-trainer")}
      </AnchorButton>
    );
  };
  const deleteTrainer = async (data: IAddTrainerModel) => {
    setLoading(true)

    try {
      await api.Trainers.deleteTrainer(data.trainer?._id || "")

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
              title="Trainer"
              breadCrumbs={BREADCRUMBS}
              renderRight={getAddButton}
            />
            <div className="trainer__container">
              <Col>
                <Table
                  loading={loading}
                  numRows={trainer.length}
                  getCellClipboardData={(row: any, col: any) => {
                    return trainer[row];
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
                          viewLink: URLS.getPagePath("edit-trainer", {
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
                  data={trainer}
                  enableRowHeader={true}
                  hasNextPage={hasNextPage}
                  hasPrevPage={hasPrevPage}
                  onNextPage={onNextPage}
                  onPrevPage={onPrevPage}
                  page={page}
                  emptyTableMessage="No trainer Found"
                />
              </Col>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainer;
