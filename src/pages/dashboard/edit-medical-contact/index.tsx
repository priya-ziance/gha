import { useEffect, useState } from 'react';
import { Spinner } from '@blueprintjs/core';

import AddMedicalContact from '../add-medical-contact';
import api from '../../../api';
import { IClientContactModel } from '../../../types';
import withPathId from '../../../hoc/withPathId';


interface ClientContactPathType {
  medicalContactId: string
}

const ClientContactInfo = (props: ClientContactPathType) => {
  const [loading, setLoading] = useState(true);
  const [medicalContact, setMedicalContact] = useState<IClientContactModel | undefined>(undefined);

  const { medicalContactId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);
      
      try {
        const fetchedClientContact = await api.clientContacts.getMedicalContact(medicalContactId);

        setMedicalContact(fetchedClientContact);
      } catch(e: any) {
        console.log(e)
      }

      setLoading(false);
    })()
  }, [medicalContactId]);

  if (loading) {
    return ( <Spinner /> )
  }

  return (
    <AddMedicalContact medicalContact={medicalContact} update />
  );
};

export default withPathId({ pathSlugs:['medicalContactId'] })(ClientContactInfo);