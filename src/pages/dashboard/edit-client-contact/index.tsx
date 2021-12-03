import { useContext, useEffect, useState } from 'react';

import { Spinner } from '@blueprintjs/core';

import AddClientContact from '../add-client-contact';

import api from '../../../api';

import ClientContext from '../../../contexts/client';

import { IClientContactModel } from '../../../types';

import withPathId from '../../../hoc/withPathId';


interface ClientContactPathType {
  clientContactId: string
}

const ClientContactInfo = (props: ClientContactPathType) => {
  const [loading, setLoading] = useState(true);
  const [clientContact, setClientContact] = useState<IClientContactModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { clientContactId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);
      
      try {
        const fetchedClientContact = await api.clientContacts.getClientContact(clientContactId, { params: { clientId } } );

        setClientContact(fetchedClientContact);
      } catch(e) {
        console.log(e)
      }

      setLoading(false);
    })()
  }, [clientId, clientContactId]);

  if (loading) {
    return ( <Spinner /> )
  }

  return (
    <AddClientContact clientContact={clientContact} update />
  );
};

export default withPathId({ pathSlugs:['clientContactId'] })(ClientContactInfo);