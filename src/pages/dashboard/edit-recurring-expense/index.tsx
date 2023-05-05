import { useContext, useEffect, useState } from 'react';

import { Spinner } from '@blueprintjs/core';

import AddExpensesList from '../add-expenses-list';

import api from '../../../api';

import ClientContext from '../../../contexts/client';
import ToastContext from '../../../contexts/toasts';

import IExpensesListModel from '../../../models/expenseList';
import AddRecurringExpense from '../add-recurring-expense'
import withPathId from '../../../hoc/withPathId';
import { IRecurringExpenseModel } from '../../../types';


interface ExpensesListPathType {
  expenseListId: string
}

const EditRecurringExpensePage = (props: ExpensesListPathType) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [recurringExpense, setRecurringExpense] = useState<IRecurringExpenseModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastContext);

  const { expenseListId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);
      
      try {
        const fetchedExpensesList = await api.recurringExpense.getRecurringtExpenseById(expenseListId, { params: { clientId } });

        setRecurringExpense(fetchedExpensesList);
      } catch(e: any) {
        setError(e)
      }

      setLoading(false);
    })()
  }, [clientId, expenseListId]);

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
    <AddRecurringExpense recurringExpense={recurringExpense} update />
  );
};

export default withPathId({ pathSlugs:['expenseListId'] })(EditRecurringExpensePage);