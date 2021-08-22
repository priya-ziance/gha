import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import api from '../../../api';

import Client from '../../../models/client';

import LocationContext from '../../../contexts/location';

import { AnchorButton, LoadingView, ModuleCard, PageHeading, Row } from '../../../components';

import ClientsImage from '../../../assets/svg/man-woman.svg';

import './index.scss';


const BREADCRUMBS: BreadcrumbProps[] = [
  { href: '/dashboard', icon: "document", text: 'Dashboard'},
  { text: "Clients" },
];

const Content = () => {
  const [clients, setClients] = useState<Client[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: selectedLocationId } = useContext(LocationContext)


  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setClients(
          await api.clients.getClients()
        )
      } catch(e){}

      setTimeout(() => {
        setLoading(false);
      }, 200)
    })()
  }, [selectedLocationId])

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD
        }}
        linkProps={{
          to: '/dashboard/clients/add'
        }}
      >
        Add client
      </AnchorButton>
    );
  }

  return (
    <LoadingView loading={loading}>
      <div className='clients'>
        <PageHeading
          title='Clients'
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <div className='clients__container'>
          <Row>
            {clients.map(client => {
              return (
                <ModuleCard
                  key={client.id}
                  title={client.name}
                  interactive
                  link={`/dashboard/clients/${client.id}/links`}
                  imageFile={client.profilePicture}
                  image={ClientsImage}
                />
              );
            })}
          </Row>
        </div>
      </div>
    </LoadingView>
  );
}

export default Content;