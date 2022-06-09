import { useContext, useEffect, useState } from 'react';

import { Spinner } from '@blueprintjs/core';

import AddAppointment from '../add-appointment';

import api from '../../../api';

import ClientContext from '../../../contexts/client';

import IAppointmentModel from '../../../models/appointment';

import withPathId from '../../../hoc/withPathId';


interface AppointmentPathType {
  appointmentId: string
}

const AppointmentInfo = (props: AppointmentPathType) => {
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState<IAppointmentModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { appointmentId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);
      
      try {
        const fetchedAppointment = await api.appointments.getAppointment(appointmentId, { params: { clientId } } );

        setAppointment(fetchedAppointment);
      } catch(e: any) {
        console.log(e)
      }

      setLoading(false);
    })()
  }, [clientId, appointmentId]);

  if (loading) {
    return ( <Spinner /> )
  }

  return (
    <AddAppointment appointment={appointment} update />
  );
};

export default withPathId({ pathSlugs:['appointmentId'] })(AppointmentInfo);