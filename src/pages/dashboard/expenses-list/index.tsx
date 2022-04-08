import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import get from 'lodash/get';

import { AnchorButton, Col, FormItemSelect, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';
import LocationContext from '../../../contexts/location';

import URLS from '../../../utils/urls';

import api from '../../../api';

import ExpenseList from '../../../models/expenseList';

import * as helpers from '../../../utils/helpers';

import { EXPENSE_ACCOUNT_TYPES } from './constants';

import {
  actionColumn,
  activeColumn,
  dateColumn,
  descriptionColumn,
  expenseColumn,
  expenseListColumn,
  expenseTypeColumn
} from './helpers';

import './index.scss';

const PAGE_SIZE = 10;

const ExpensesAccount = () => {
  const [expensesLists, setExpensesLists] = useState<ExpenseList[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState(Object.keys(EXPENSE_ACCOUNT_TYPES)[0])
  const { id: clientId } = useContext(ClientContext);
  const { id: selectedLocationId } = useContext(LocationContext)

  const hasNextPage = expensesLists.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setExpensesLists(
          await api.expensesList.getExpenseLists(clientId, { page, pageSize: PAGE_SIZE, params: { type: accountType } })
        )
      } catch(e){}

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
    { text: URLS.getPagePathName('expenses-list') }
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD
        }}
        linkProps={{
          to: URLS.getPagePath('add-expenses-list', { clientId })
        }}
      >
        Add Expense List
      </AnchorButton>
    );
  }

  return (
    <div>
      <div className='expenses-list'>
        <PageHeading
          title='Expenses List'
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <div className='expenses-list__container'>
          <Col>
            <FormItemSelect
              buttonText={get(EXPENSE_ACCOUNT_TYPES, accountType, '')}
              items={Object.keys(EXPENSE_ACCOUNT_TYPES)}
              label={'Expense Type'}
              menuRenderer={item => get(EXPENSE_ACCOUNT_TYPES, item, '')}
              onFormSelectChange={setAccountType}
            />

            <Table
              loading={loading}
              numRows={expensesLists.length}
              columns={[
                {
                  title: 'Description',
                  cellRenderer: descriptionColumn,
                  width: helpers.getTableWith(0.4)
                },
                {
                  title: 'Type',
                  cellRenderer: expenseTypeColumn,
                  width: helpers.getTableWith(0.1)
                },
                {
                  title: 'Expense',
                  cellRenderer: expenseColumn,
                  width: helpers.getTableWith(0.1)
                },
                {
                  title: 'Expense List',
                  cellRenderer: expenseListColumn,
                  width: helpers.getTableWith(0.1)
                },
                {
                  title: 'Active',
                  cellRenderer: activeColumn,
                  width: helpers.getTableWith(0.07)
                },
                {
                  title: 'Created At',
                  cellRenderer: dateColumn,
                  width: helpers.getTableWith(0.13)
                },
                {
                  title: 'Actions',
                  cellRenderer: (data) => {
                    return actionColumn(
                      data,
                      {
                        viewLink: URLS.getPagePath(
                          'edit-expenses-list',
                          { clientId, expensesListId: data.id })
                      }
                    )
                  },
                  width: helpers.getTableWith(0.1)
                }
              ]}
              data={expensesLists}
              enableRowHeader={false}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No Expense Lists Found"
            />
          </Col>
        </div>
      </div>
    </div>
  );
}

export default ExpensesAccount;