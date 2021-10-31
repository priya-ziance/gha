import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Checkbox, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import get from 'lodash/get';

import { AnchorButton, Button, PageHeading, Row } from '../../../components';

import LoadingWrapper from '../../../wrappers/loading';

import ClientContext from '../../../contexts/client';
import LocationContext from '../../../contexts/location';
import ToastsContext from '../../../contexts/toasts';

import URLS from '../../../utils/urls';

import api from '../../../api';

import Behaviour from '../../../models/behaviour';

import './index.scss';

const PAGE_SIZE = 10;

const BehavioursAssign = () => {
  const [behaviours, setBehaviours] = useState<Behaviour[] | []>([]);
  const [selectedBehaviours, setSelectedBehaviours] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { id: selectedLocationId } = useContext(LocationContext);
  const { addToast } = useContext(ToastsContext)

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setBehaviours(
          await api.behaviours.getBehaviours(clientId, { pageSize: PAGE_SIZE })
        )
      } catch(e){}

      setTimeout(() => {
        setLoading(false);
      }, 200)
    })()
  }, [clientId, selectedLocationId]);

  useEffect(() => {
    (async () => {
      try {
        const clientBehaviours = await api.clientBehaviours.getClientBehaviours(clientId, { pageSize: PAGE_SIZE })
        setSelectedBehaviours(
          clientBehaviours.map(clientBehaviour => get(clientBehaviour, 'behaviour.id', ''))
        )
      } catch(e){}
    })()
  }, []);

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

  const onSubmit = async () => {
    setSubmitting(true);
    
    try {
      await api.clientBehaviours.assignBehaviours(selectedBehaviours, { clientId })

      addToast({
        message: 'Successfully assigned behaviours',
        intent: 'primary'
      })
    } catch(e) {
      addToast({
        message: 'Something went wrong',
        intent: 'danger'
      })
    }

    setSubmitting(false);
  }

  return (
    <div>
      <div className='behaviours-assign'>
        <PageHeading
          title='Assign Behaviours'
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <LoadingWrapper loading={loading}>
          <div className='behaviours-assign__container'>
            <Row>
              {behaviours.map(behaviour => {
                const isSelected = selectedBehaviours.includes(behaviour.id);

                const handleChange = () => {
                  if (isSelected) {
                    setSelectedBehaviours(behaviours => {
                      return [
                        ...behaviours.filter(b => b !== behaviour.id)
                      ]
                    })
                  } else {
                    setSelectedBehaviours(behaviours => {
                      return [...behaviours, behaviour.id];
                    })
                  }
                }
                
                return (
                  <Checkbox label={behaviour.behaviourType} onChange={handleChange} checked={isSelected} />
                )
              })}
            </Row>

            <Button intent={Intent.PRIMARY} large onClick={onSubmit} disabled={submitting} loading={submitting}>
              Submit
            </Button>
          </div>
        </LoadingWrapper>
      </div>
    </div>
  );
}

export default BehavioursAssign;