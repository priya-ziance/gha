import { useContext, useEffect, useState } from 'react';

import { Spinner } from '@blueprintjs/core';

import AddDatabaseTask from '../add-database-task';

import ClientContext from '../../../contexts/client';

import api from '../../../api';

import ITaskModel from '../../../models/task';

import withPathId from '../../../hoc/withPathId';


interface GoalPathType {
  taskId: string
}

const EditTask = (props: GoalPathType) => {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState<ITaskModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { taskId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);
      
      try {
        const fetchedTask = await api.tasks.getTask(taskId, {
          params: {
            clientId
          }
        });

        setTask(fetchedTask);
      } catch(e: any) {}

      setLoading(false);
    })()
  }, [taskId, clientId]);

  if (loading) {
    return ( <Spinner /> )
  }

  return (
    <AddDatabaseTask task={task} update goal={task?.goal} subGoal={task?.subGoal} />
  );
};

export default withPathId({ pathSlugs:['taskId'] })(EditTask);