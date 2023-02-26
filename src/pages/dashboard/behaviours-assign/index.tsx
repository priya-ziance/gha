import { useContext, useEffect, useMemo, useState } from 'react';
import { BreadcrumbProps, Checkbox, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import get from 'lodash/get';
import useSWR from 'swr';

import { AnchorButton, Button, PageHeading, Row } from '../../../components';

import LoadingWrapper from '../../../wrappers/loading';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import URLS from '../../../utils/urls';

import api from '../../../api';

import './index.scss';

const PAGE_SIZE = 10;

const BehavioursAssign = () => {
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(0);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext)

  const { data: behaviours, isValidating: behavioursLoading } = useSWR(
    `/api/behaviours?page=${page}&clientId=${clientId}`,
    () => api.behaviours.getBehaviours(clientId, { pageSize: PAGE_SIZE })
  );

  const { data: assignedBehaviours, isValidating: assignedBehavioursLoading, mutate: mutateAssignments } = useSWR(
    `/api/assigned_behaviours?page=${page}&clientId=${clientId}`,
    () => api.behaviourAssignment.getAssignments(clientId)
  );

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links')},
    { href: URLS.getPagePath('behaviours', { clientId }), icon: 'document', text: URLS.getPagePathName('behaviours') },
    { text: URLS.getPagePathName('behaviours-assign') },
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD
        }}
        linkProps={{
          to: URLS.getPagePath('add-database-behaviour', { clientId })
        }}
      >
        Add behaviour
      </AnchorButton>
    );
  }

  const assignBehaviours = async (selectedBehaviours: string[]) => {
    setSubmitting(true);
    
    try {
      await api.clientBehaviours.assignBehaviours(selectedBehaviours, { clientId })

      addToast({
        message: 'Successfully assigned behaviours',
        intent: 'primary'
      })
    } catch(e: any) {
      console.log(e);
      addToast({
        message: 'Something went wrong',
        intent: 'danger'
      })
    }

    setSubmitting(false);
  }

  const selectedIds = useMemo(() => {
    return assignedBehaviours?.behaviours.map(b => b.id) || [];
  }, [assignedBehaviours])

  return (
    <div>
      <div className='behaviours-assign'>
        <PageHeading
          title='Assign Behaviours'
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <LoadingWrapper loading={behavioursLoading || assignedBehavioursLoading}>
          <div className='behaviours-assign__container'>
            <Row>
              {behaviours?.map(behaviour => {
                const isSelected = selectedIds.includes(behaviour.id);

                const handleChange = async () => {
                  try {
                    if (isSelected) {
                      await assignBehaviours(selectedIds.filter(b => b !== behaviour.id))
                    } else {
                      await assignBehaviours([...selectedIds, behaviour.id])
                    }  
                  } finally {
                    mutateAssignments()
                  }
                }
                
                return (
                  <Checkbox key={behaviour.id} label={behaviour.behaviourType} onChange={handleChange} checked={isSelected} />
                )
              })}
            </Row>
          </div>
        </LoadingWrapper>
      </div>
    </div>
  );
}

export default BehavioursAssign;