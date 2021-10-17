import { useEffect, useState } from 'react';

import { Spinner } from '@blueprintjs/core';

import AddDatabaseSubGoal from '../add-database-subgoal';

import api from '../../../api';

import ISubGoalModel from '../../../models/subGoal';

import withPathId from '../../../hoc/withPathId';


interface GoalPathType {
  subGoalId: string
}

const GoalInfo = (props: GoalPathType) => {
  const [loading, setLoading] = useState(true);
  const [subGoal, setSubGoal] = useState<ISubGoalModel | undefined>(undefined);

  const { subGoalId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);
      
      try {
        const fetchedSubGoal = await api.subgoals.getSubGoal(subGoalId);

        setSubGoal(fetchedSubGoal);
      } catch(e) {}

      setLoading(false);
    })()
  }, [subGoalId]);

  if (loading) {
    return ( <Spinner /> )
  }

  return (
    <AddDatabaseSubGoal subGoal={subGoal} update />
  );
};

export default withPathId({ pathSlugs:['subGoalId'] })(GoalInfo);