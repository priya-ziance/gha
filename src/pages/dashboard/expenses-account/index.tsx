import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import get from 'lodash/get';

import { AnchorButton, Col, FormItemSelect, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';
import LocationContext from '../../../contexts/location';

import URLS from '../../../utils/urls';
import * as helpers from '../../../utils/helpers';
import { formatCurrency } from '../../../utils/formatters';

import api from '../../../api';

import Expense from '../../../models/expense';

import { EXPENSE_ACCOUNT_TYPES } from './constants';

import {
  actionColumn,
  activeColumn,
  expenseColumn,
  expenseTypeColumn,
  locationColumn,
  dateColumn,
  descriptionColumn,
} from './helpers';

import './index.scss';

const PAGE_SIZE = 10;

const ExpensesAccount = () => {
  const [expenses, setExpenses] = useState<Expense[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState(Object.keys(EXPENSE_ACCOUNT_TYPES)[0])
  const [expenseBalance, setExpenseBalance] = useState(0)
  const { id: clientId } = useContext(ClientContext);
  const { id: selectedLocationId } = useContext(LocationContext)

  const hasNextPage = expenses.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setExpenses(
          await api.expenses.getExpenses(clientId, { page, pageSize: PAGE_SIZE, params: { type: accountType } })
        )
      } catch(e: any){}

      setLoading(false);
    })()
  }, [clientId, page, selectedLocationId, accountType]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const result = await api.expenses.getBalance(accountType, clientId)
        setExpenseBalance(get(result, 'data.balance', 0) * 100)
      } catch(e: any){}

      setLoading(false);
    })()
  }, [clientId, page, selectedLocationId, accountType]);

  const onNextPage = () => {
    if (hasNextPage) {
      setPage(page => page + 1)
    }
  }

  const onPrevPage = () => {
    if (hasPrevPage) {
      setPage(page => page - 1)
    }
  }

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links')},
    { href: URLS.getPagePath('expenses', { clientId }), icon: 'document', text: URLS.getPagePathName('expenses') },
    { text: URLS.getPagePathName('expenses-account') }
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD
        }}
        linkProps={{
          to: URLS.getPagePath('add-expenses-account', { clientId })
        }}
      >
        Add Main Account Expense
      </AnchorButton>
    );
  }

  return (
    <div>
      <div className='expenses-account'>
        <PageHeading
          title='Main Account Expenses'
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <div className='expenses-account__container'>
          <Col>
            <div className='expenses-account__container__action-bar'>
              <FormItemSelect
                buttonText={get(EXPENSE_ACCOUNT_TYPES, accountType, '')}
                items={Object.keys(EXPENSE_ACCOUNT_TYPES)}
                label={'Expense Type'}
                menuRenderer={item => get(EXPENSE_ACCOUNT_TYPES, item, '')}
                onFormSelectChange={setAccountType}
              />
              <div>
                <span>Balance: <b>{formatCurrency(expenseBalance)}</b></span>
              </div>
            </div>

            <Table
              loading={loading}
              numRows={expenses.length}
              columns={[
                {
                  title: 'Expense Date',
                  cellRenderer: dateColumn,
                  width: helpers.getTableWith(0.15)
                },
                {
                  title: 'Description',
                  cellRenderer: descriptionColumn,
                  width: helpers.getTableWith(0.3)
                },
                {
                  title: 'Expense Type',
                  cellRenderer: expenseTypeColumn,
                  width: helpers.getTableWith(0.1)
                },
                {
                  title: 'Expense',
                  cellRenderer: expenseColumn,
                  width: helpers.getTableWith(0.1)
                },
                {
                  title: 'Location',
                  cellRenderer: locationColumn,
                  width: helpers.getTableWith(0.18)
                },
                {
                  title: 'Active',
                  cellRenderer: activeColumn,
                  width: helpers.getTableWith(0.07)
                },
                {
                  title: 'Actions',
                  cellRenderer: (data) => {
                    return actionColumn(
                      data,
                      {
                        viewLink: URLS.getPagePath(
                          'edit-expense-account',
                          { clientId, expenseId: data.id })
                      }
                    )
                  },
                  width: helpers.getTableWith(0.1)
                }
              ]}
              data={expenses}
              enableRowHeader={false}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No Expenses Found"
            />
          </Col>
        </div>
      </div>
    </div>
  );
}

export default ExpensesAccount;