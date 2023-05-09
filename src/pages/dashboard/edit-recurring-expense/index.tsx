import { useContext, useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../../api";
import ClientContext from "../../../contexts/client";
import ToastContext from "../../../contexts/toasts";
import AddRecurringExpense from "../add-recurring-expense";
import withPathId from "../../../hoc/withPathId";
import { IRecurringExpenseModel } from "../../../types";

interface IRecurringExpenseProps {
  recurringExpenseId: string;
}

const EditRecurringExpensePage = (props: IRecurringExpenseProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [recurringExpense, setRecurringExpense] = useState<
    IRecurringExpenseModel | undefined
  >(undefined);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastContext);

  const { recurringExpenseId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const fetchedExpensesList =
          await api.recurringExpense.getRecurringtExpenseById(recurringExpenseId, {
            params: { clientId },
          });

        setRecurringExpense(fetchedExpensesList);
      } catch (e: any) {
        setError(e);
      }

      setLoading(false);
    })();
  }, [clientId, recurringExpenseId]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    addToast({
      message: error.message,
      intent: "danger",
    });
  }
  return <AddRecurringExpense recurringExpense={recurringExpense} update />;
};

export default withPathId({ pathSlugs: ["recurringExpenseId"] })(
  EditRecurringExpensePage
);
