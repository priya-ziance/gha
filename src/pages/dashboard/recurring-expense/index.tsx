import { useCallback, useContext, useEffect, useState } from "react";
import { BreadcrumbProps, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import {
  AnchorButton,
  Col,
  FormItemSelect,
  PageHeading,
  Table,
} from "../../../components";

import ClientContext from "../../../contexts/client";
import LocationContext from "../../../contexts/location";

import URLS from "../../../utils/urls";

import api from "../../../api";
import * as helpers from "../../../utils/helpers";

import { EXPENSE_ACCOUNT_TYPES } from "./constants";

import {
  actionColumn,
  activeColumn,
  descriptionColumn,
  expenseTypeColumn,
} from "./helpers";

import "./index.scss";
import { IRecurringExpenseModel } from "../../../types";
import ToastsContext from "../../../contexts/toasts";

const PAGE_SIZE = 10;

const RecurringExpensePage = () => {
  const [recurringExpense, setRecurringExpense] = useState<
    IRecurringExpenseModel[] | []
  >([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState(
    Object.keys(EXPENSE_ACCOUNT_TYPES)[0]
  );
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);

  const hasNextPage = recurringExpense.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  useEffect(() => {
    fetchData();
  }, [clientId, page]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.recurringExpense.geRecurringtExpense(clientId, {
        page,
        pageSize: PAGE_SIZE,
      });
      console.log("data",data);
      
      setRecurringExpense(data);
    } catch (e: any) {
      console.log("Error in fetching adp data..", e?.message);
    }
    setLoading(false);
  }, []);

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
    {
      href: URLS.getPagePath("expenses", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("expenses"),
    },
    { text: URLS.getPagePathName("recurring-expense") },
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD,
        }}
        linkProps={{
          to: URLS.getPagePath("add-recurring-expense", { clientId }),
        }}
      >
        Add Recurring Expense
      </AnchorButton>
    );
  };

  const deleterRecurringExpense = async (data: IRecurringExpenseModel) => {
    setLoading(true);

    try {
      await api.recurringExpense.deleteRecurringtExpense(data.recurringExpense?._id || "",clientId);

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
    <div>
      <div className="recurring-expenses-list">
        <PageHeading
          title="Recurring Expense"
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <div className="expenses-list__container">
          <Col>
            <Table
              loading={loading}
              numRows={recurringExpense.length}
              columns={[
                {
                  title: "Type",
                  cellRenderer: expenseTypeColumn,
                  width: helpers.getTableWith(0.3),
                },
                {
                  title: "Description",
                  cellRenderer: descriptionColumn,
                  width: helpers.getTableWith(0.3),
                },
                {
                  title: "Active",
                  cellRenderer: activeColumn,
                  width: helpers.getTableWith(0.3),
                },
                {
                  title: "Actions",
                  cellRenderer: (data: any) => {
                    console.log("id", data.id);
                    
                    return actionColumn(data, {
                      viewLink: URLS.getPagePath("edit-recurring-expense", {
                        clientId,
                        clientContactId: data.recurringExpense._id,
                      }),
                      onDelete() {
                        deleterRecurringExpense(data);
                      },
                    });
                  },
                  width: helpers.getTableWith(0.1),
                },
              ]}
              data={recurringExpense}
              enableRowHeader={false}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No Recurring Expense Found"
            />
          </Col>
        </div>
      </div>
    </div>
  );
};

export default RecurringExpensePage;
