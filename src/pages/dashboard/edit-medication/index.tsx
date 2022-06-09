import { useContext, useEffect, useState } from 'react';

import { Spinner } from '@blueprintjs/core';

import AddMedication from '../add-medication';

import api from '../../../api';

import ClientContext from '../../../contexts/client';

import IMedicationModel from '../../../models/medication';

import withPathId from '../../../hoc/withPathId';


interface MedicationPathType {
  medicationId: string
}

const MedicationInfo = (props: MedicationPathType) => {
  const [loading, setLoading] = useState(true);
  const [medication, setMedication] = useState<IMedicationModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { medicationId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);
      
      try {
        const fetchedMedication = await api.medications.getMedication(medicationId, clientId );

        setMedication(fetchedMedication);
      } catch(e: any) {
        console.log(e)
      }

      setLoading(false);
    })()
  }, [clientId, medicationId]);

  if (loading) {
    return ( <Spinner /> )
  }

  return (
    <AddMedication medication={medication} update />
  );
};

export default withPathId({ pathSlugs:['medicationId'] })(MedicationInfo);