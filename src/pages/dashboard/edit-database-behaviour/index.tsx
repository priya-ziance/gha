import { useContext, useEffect, useState } from 'react';

import { Spinner } from '@blueprintjs/core';

import AddDatabaseGoal from '../add-database-behaviour';

import api from '../../../api';

import ClientContext from '../../../contexts/client';

import IBehaviourModel from '../../../models/behaviour';

import withPathId from '../../../hoc/withPathId';


interface GoalPathType {
  behaviourId: string
}

const GoalInfo = (props: GoalPathType) => {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<IBehaviourModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { behaviourId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);
      
      try {
        const fetchedGoal = await api.behaviours.getBehaviour(behaviourId, { params: { clientId } });

        setClient(fetchedGoal);
      } catch(e) {}

      setLoading(false);
    })()
  }, [clientId, behaviourId]);

  if (loading) {
    return ( <Spinner /> )
  }

  return (
    <AddDatabaseGoal behaviour={client} update />
  );
};

export default withPathId({ pathSlugs:['behaviourId'] })(GoalInfo);