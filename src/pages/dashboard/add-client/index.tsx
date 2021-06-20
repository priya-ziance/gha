import { useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import api from '../../../api';

import { AnchorButton, Button, LoadingView, ModuleCard, PageHeading, Row } from '../../../components';

import ClientsImage from '../../../assets/svg/man-woman.svg';

import './index.scss';
import Client from '../../../models/client';


const BREADCRUMBS: BreadcrumbProps[] = [
  { href: '/dashboard', icon: "document", text: 'Dashboard'},
  { href: '/dashboard/clients', icon: 'document', text: "Clients" },
  { text: 'Client' }
];

const AddClient = () => {
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
  }, []);

  return (
    <LoadingView loading={loading}>
      <div className='client'>
        <PageHeading
          title='Client Detail'
          breadCrumbs={BREADCRUMBS}
        />
        <div className='client__container'>
          
        </div>
      </div>
    </LoadingView>
  );
}

export default AddClient;