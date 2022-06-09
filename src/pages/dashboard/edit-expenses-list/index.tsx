import { useContext, useEffect, useState } from 'react';

import { Spinner } from '@blueprintjs/core';

import AddExpensesList from '../add-expenses-list';

import api from '../../../api';

import ClientContext from '../../../contexts/client';
import ToastContext from '../../../contexts/toasts';

import IExpensesListModel from '../../../models/expenseList';

import withPathId from '../../../hoc/withPathId';


interface ExpensesListPathType {
  expenseListId: string
}

const ExpensesListInfo = (props: ExpensesListPathType) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [expenseList, setExpensesList] = useState<IExpensesListModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastContext);

  const { expenseListId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);
      
      try {
        const fetchedExpensesList = await api.expensesList.getExpenseList(expenseListId, { params: { clientId } });

        setExpensesList(fetchedExpensesList);
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
    <AddExpensesList expenseList={expenseList} update />
  );
};

export default withPathId({ pathSlugs:['expenseListId'] })(ExpensesListInfo);