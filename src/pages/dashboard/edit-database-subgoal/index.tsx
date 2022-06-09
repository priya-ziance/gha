import { useContext, useEffect, useState } from 'react';

import { Spinner } from '@blueprintjs/core';

import AddDatabaseSubGoal from '../add-database-subgoal';

import api from '../../../api';

import ClientContext from '../../../contexts/client';

import ISubGoalModel from '../../../models/subGoal';

import withPathId from '../../../hoc/withPathId';


interface GoalPathType {
  subGoalId: string
}

const GoalInfo = (props: GoalPathType) => {
  const [loading, setLoading] = useState(true);
  const [subGoal, setSubGoal] = useState<ISubGoalModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { subGoalId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);
      
      try {
        const fetchedSubGoal = await api.subgoals.getSubGoal(subGoalId, { params: { clientId } });

        setSubGoal(fetchedSubGoal);
      } catch(e: any) {}

      setLoading(false);
    })()
  }, [clientId, subGoalId]);

  if (loading) {
    return ( <Spinner /> )
  }

  return (
    <AddDatabaseSubGoal subGoal={subGoal} update />
  );
};

export default withPathId({ pathSlugs:['subGoalId'] })(GoalInfo);