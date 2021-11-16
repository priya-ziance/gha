import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import get from 'lodash/get';

import { AnchorButton, Col, FormItemSelect, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';
import LocationContext from '../../../contexts/location';

import URLS from '../../../utils/urls';

import api from '../../../api';

import Expense from '../../../models/expense';

import * as helpers from '../../../utils/helpers';

import { BANK_STATEMENT_TYPES } from './constants';

import {
  actionColumn,
  activeColumn,
  dateColumn,
  descriptionColumn,
} from './helpers';

import './index.scss';

const PAGE_SIZE = 10;

const BankStatement = () => {
  const [expenses, setExpenses] = useState<Expense[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState(Object.keys(BANK_STATEMENT_TYPES)[0])
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
    { text: URLS.getPagePathName('bank-statement') }
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD
        }}
        linkProps={{
          to: URLS.getPagePath('add-bank-statement', { clientId })
        }}
      >
        Add Main Account Expense
      </AnchorButton>
    );
  }

  return (
    <div>
      <div className='bank-statement'>
        <PageHeading
          title='Bank Statements'
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <div className='bank-statement__container'>
          <Col>
            <FormItemSelect
              buttonText={get(BANK_STATEMENT_TYPES, accountType, '')}
              items={Object.keys(BANK_STATEMENT_TYPES)}
              label={'Bank Statement Type'}
              menuRenderer={item => get(BANK_STATEMENT_TYPES, item, '')}
              onFormSelectChange={setAccountType}
            />

            <Table
              loading={loading}
              numRows={expenses.length}
              columns={[
                {
                  title: 'ID',
                  cellRenderer: (data) => (<p>{data.id}</p>),
                  width: helpers.getTableWith(0.1)
                },
                {
                  title: 'Description',
                  cellRenderer: descriptionColumn,
                  width: helpers.getTableWith(0.6)
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

export default BankStatement;