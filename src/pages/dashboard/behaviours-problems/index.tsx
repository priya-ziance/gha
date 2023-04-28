import { useContext, useState } from 'react';
import { BreadcrumbProps, Button } from '@blueprintjs/core';
import get from 'lodash/get';
import useSWR from 'swr'

import { Col, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';

import URLS from '../../../utils/urls';

import api from '../../../api';

import { IClientBehaviourModel } from '../../../types';

import * as helpers from '../../../utils/helpers';

import {
  actionColumn,
  uriColumn,
  behaviourTypeColumn,
  dateColumn,
  notesColumn,
} from './helpers';

import BehaviourProblemDialog from './behaviourProblemsDialog';

import './index.scss';
import ToastsContext from '../../../contexts/toasts';

const PAGE_SIZE = 10;

const DatabaseBehavioursProblems = () => {
  const [isClientProblemDialogOpen, setIsClientProblemDialogOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<IClientBehaviourModel | undefined>(undefined)
  const [page, setPage] = useState(0);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);


  const { data: clientBehaviours, isValidating } = useSWR('/api/client-behaviours', () => {
    return api.clientBehaviours.getClientBehaviours(clientId, { page, pageSize: PAGE_SIZE })
  }, { refreshInterval: 50 })

  const deleteClientBehaviour = async (data: IClientBehaviourModel) => {
    // setLoading(true)
console.log("data");

    // console.log("client id",data.clientsInvolved?.find((ele)=>ele.client));
    console.log("client id",clientId);

    console.log("behaviour id",data.clientBehaviour?._id);
    
    try {
      await api.clientBehaviours.deleteClientBehaviour(data.clientBehaviour?._id || "",clientId,data)

      // await fetchData()
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
  }
  const loading = isValidating && !clientBehaviours;

  const hasNextPage = clientBehaviours?.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

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

  const onViewClientProblem = (clientProblem: IClientBehaviourModel) => {
    setSelectedProblem(clientProblem);
    setIsClientProblemDialogOpen(true);
  }

  const onCancelClientProblemDialog = () => {
    setIsClientProblemDialogOpen(false)
    setSelectedProblem(undefined);
  };

  const getAddButton = () => {
    return (
      <Button
        intent='primary'
        icon="add"
        onClick={() => setIsClientProblemDialogOpen(true)}
      >
        Add client behaviour
      </Button>
    );
  }

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links')},
    { href: URLS.getPagePath('behaviours', { clientId }), icon: 'document', text: URLS.getPagePathName('behaviours') },
    { text: URLS.getPagePathName('behaviours-problems') },
  ];

  
  return (
    <div>
      <div className='behaviours-problems'>
        <PageHeading
          title='Client Behaviour Problems'
          breadCrumbs={BREADCRUMBS}
          renderRight={() => getAddButton()}
        />
        <div className='behaviours-problems__container'>
          <Col>
            <Table
              loading={loading}
              numRows={clientBehaviours?.length}
              columns={[
                {
                  title: 'Behaviour Type',
                  cellRenderer: behaviourTypeColumn,
                  width: helpers.getTableWith(0.2)
                },
                {
                  title: 'Frequency',
                  cellRenderer: (data) => (
                    <p style={{ textAlign: 'center' }}>
                      {get(data, 'frequency', 0)}
                    </p>
                  ),
                  width: helpers.getTableWith(0.1)
                },
                {
                  title: 'Notes',
                  cellRenderer: notesColumn,
                  width: helpers.getTableWith(0.4)
                },
                {
                  title: 'URI',
                  cellRenderer: uriColumn,
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
                        onView: onViewClientProblem,
                        onDelete() {
                          deleteClientBehaviour(data)
                        }
                      }
                    )
                  },
                  width: helpers.getTableWith(0.1)
                }
              ]}
              data={clientBehaviours || []}
              enableRowHeader={false}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No Behaviours Found"
            />
          </Col>
        </div>

        <BehaviourProblemDialog
          isOpen={isClientProblemDialogOpen}
          onClose={onCancelClientProblemDialog}
          clientBehaviour={selectedProblem}
        />
      </div>
    </div>
  );
}

export default DatabaseBehavioursProblems;