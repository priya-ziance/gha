import { useContext, useEffect, useMemo, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import groupBy from 'lodash/groupBy';

import { AnchorButton, Col, FormItemSelect, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';
import LocationContext from '../../../contexts/location';

import URLS from '../../../utils/urls';

import api from '../../../api';

import Goal from '../../../models/goal';
import SubGoal from '../../../models/subGoal';

import * as helpers from '../../../utils/helpers';

import {
  actionColumn,
  activeColumn,
  dateColumn,
  descriptionColumn,
} from './helpers';

import './index.scss';

const PAGE_SIZE = 10;

const DatabaseSubGoals = () => {
  const [goals, setGoals] = useState<Goal[] | []>([]);
  const [subGoals, setSubGoals] = useState<SubGoal[] | []>([]);
  const [selectedGoal, setSelectedGoal] = useState<string>('')
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { id: selectedLocationId } = useContext(LocationContext)
  
  const goalsObject: any = useMemo(() => groupBy(goals, g => g.id), [goals]);

  const hasNextPage = subGoals.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  useEffect(() => {
    (async () => {
      try {
        setGoals(await api.goals.getGoals(clientId))
      } catch(e) {
        // TODO: Show error message
      }
    })()
  }, [clientId]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setSubGoals(
          await api.subgoals.getSubGoals(
            clientId,
            {
              page,
              pageSize: PAGE_SIZE,
              params: {
                goalId: selectedGoal
              }
            }
          )
        )
      } catch(e){}

      setTimeout(() => {
        setLoading(false);
      }, 200)
    })()
  }, [clientId, page, selectedLocationId, selectedGoal]);

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
    { href: URLS.getPagePath('goals', { clientId }), icon: 'document', text: URLS.getPagePathName('goals') },
    { href: URLS.getPagePath('goals-database', { clientId }), icon: 'document', text: URLS.getPagePathName('goals-database') },
    { text: URLS.getPagePathName('goals-database-subgoals') }
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD
        }}
        linkProps={{
          to: URLS.getPagePath('add-database-subgoal', { clientId })
        }}
      >
        Add subGoal
      </AnchorButton>
    );
  }

  return (
    <div>
      <div className='goals-database-subGoals'>
        <PageHeading
          title='Database SubGoals'
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <div className='goals-database-subGoals__container'>
          <Col>
            <FormItemSelect
              buttonText={goalsObject[selectedGoal] ? goalsObject[selectedGoal][0].description : ''}
              intent={Intent.PRIMARY}
              items={goals}
              label={'Goal'}
              menuRenderer={item => item.description}
              onFormSelectChange={(item => setSelectedGoal(item.id))}
            />
            <Table
              loading={loading}
              numRows={subGoals.length}
              getCellClipboardData={(row, col) => {

                return subGoals[row]
              }}
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
                          'edit-database-subgoal',
                          { clientId, subGoalId: data.id })
                      }
                    )
                  },
                  width: helpers.getTableWith(0.1)
                }
              ]}
              data={subGoals}
              enableRowHeader={false}
              onSelection={(focusedCell) => {
                console.log(focusedCell)
              }}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No SubGoals Found"
            />
          </Col>
        </div>
      </div>
    </div>
  );
}

export default DatabaseSubGoals;