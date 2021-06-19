import { useEffect, useState } from 'react';
import { BreadcrumbProps, Icon } from '@blueprintjs/core';

import api from '../../../api';

import { LoadingView, ModuleCard, PageHeading, Row } from '../../../components';

import ClientsImage from '../../../assets/svg/man-woman.svg';

import './index.scss';
import Client from '../../../models/client';


const BREADCRUMBS: BreadcrumbProps[] = [
  { href: '/dashboard', icon: "document", text: 'Dashboard'},
  { text: "Clients" },
];

const Content = () => {
  const [clients, setClients] = useState<Client[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

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
  }, [])

  return (
    <LoadingView loading={loading}>
      <div className='clients'>
        <PageHeading
          title='Clients'
          breadCrumbs={BREADCRUMBS}
        />
        <div className='clients__container'>
          <Row>
            {clients.map(client => {
              return (
                <ModuleCard
                  key={client.id}
                  title={client.name}
                  interactive
                  link='/dashboard/clients'
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