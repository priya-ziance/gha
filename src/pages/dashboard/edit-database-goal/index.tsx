import { useContext, useEffect, useState } from 'react';

import { Spinner } from '@blueprintjs/core';

import AddDatabaseGoal from '../add-database-goal';

import api from '../../../api';

import ClientContext from '../../../contexts/client';

import IGoalModel from '../../../models/goal';

import withPathId from '../../../hoc/withPathId';


interface GoalPathType {
  goalId: string
}

const GoalInfo = (props: GoalPathType) => {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<IGoalModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { goalId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);
      
      try {
        const fetchedGoal = await api.goals.getGoal(goalId, { params: { clientId } });
        setClient(fetchedGoal);
      } catch(e: any) {}

      setLoading(false);
    })()
  }, [clientId, goalId]);

  if (loading) {
    return ( <Spinner /> )
  }

  return (
    <AddDatabaseGoal goal={client} update />
  );
};

export default withPathId({ pathSlugs:['goalId'] })(GoalInfo);