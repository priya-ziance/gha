import { useContext, useEffect, useState } from 'react';

import { Spinner } from '@blueprintjs/core';

import AddExpensesAccount from '../add-expenses-account';

import api from '../../../api';

import ClientContext from '../../../contexts/client';
import ToastContext from '../../../contexts/toasts';

import IExpenseModel from '../../../models/expense';

import withPathId from '../../../hoc/withPathId';


interface ExpensePathType {
  expenseId: string
}

const ExpenseInfo = (props: ExpensePathType) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [expense, setExpense] = useState<IExpenseModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastContext);

  const { expenseId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);
      
      try {
        const fetchedExpense = await api.expenses.getExpense(expenseId, { params: { clientId } });

        if (fetchedExpense.document) {
          await fetchedExpense.document.loadFile();
        }

        setExpense(fetchedExpense);
      } catch(e) {
        setError(e)
      }

      setLoading(false);
    })()
  }, [clientId, expenseId]);

  if (loading) {
    return ( <Spinner /> )
  }

  if (error) {
    addToast({
      message: error.message,
      intent: 'danger'
    })
  }

  return (
    <AddExpensesAccount expense={expense} update />
  );
};

export default withPathId({ pathSlugs:['expenseId'] })(ExpenseInfo);